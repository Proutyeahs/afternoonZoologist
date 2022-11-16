const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// gets new monsters from database
router.get('/get/:id', (req, res) => {

    // sets the lvl range
    let rangeTop = parseInt(req.params.id) + 5
    let rangeBottom = parseInt(req.params.id) - 5

    const query = `
        SELECT "type".type, "monster".* FROM "type"
        JOIN "monster"
        ON "monster".type_id = "type".id
        ORDER BY RANDOM()
        LIMIT 3
    ;`;
    pool.query(query).then(result => {

        let monsters = []
        for (let stats of result.rows) {

            // rolls shiny odds
            let gold;
            let goldOdds = Math.floor(Math.random() * (9999 - 1 + 1)) + 1

            // checks if shiny
            if (goldOdds === 9999) {
                gold = true
            } else {
                gold = false
            }

            // basic stats so i have something to work with
            // roll stats
            let lvl = Math.floor(Math.random() * (rangeTop - rangeBottom + 1)) + rangeBottom
            let exp = Math.floor(Math.random() * (99 - 0 + 1)) + 0

            let statRoll = (x, y) => {
                stat = 0;
                for (let i = 0; i < lvl; i++) {
                    stat += Math.floor(Math.random() * (x - y + 1)) + y
                }
                return stat
            }

            let hp = statRoll(10, 2)
            let att = statRoll(5, 1)
            let def = statRoll(5, 1)
            let spd = statRoll(5, 1)
            let res = statRoll(5, 1)

            // set stats
            const monster = {
                id: stats.id,
                monster: stats.monster,
                description: stats.description,
                type_id: stats.type_id,
                type: stats.type,
                gold: gold,
                lvl: lvl,
                exp: exp,
                maxhp: hp,
                hp: hp,
                att: att,
                def: def,
                res: res,
                spd: spd
            }
            monsters.push(monster)
        }
        res.send(monsters)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
});

// posts caught monster
router.post('/', rejectUnauthenticated, (req, res) => {
    const query = `
        INSERT INTO "monster_collection" 
	    ("user_id", "monster_id", "gold", "hp", "att", "def", "lvl", "exp", "maxhp", "spd", "res")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ;`;
    pool.query(query, [req.user.id, req.body.id, req.body.gold, req.body.hp, req.body.att, req.body.def, req.body.lvl, req.body.exp, req.body.maxhp, req.body.spd, req.body.res]).then(() =>
        res.sendStatus(201)
    ).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// gets users monster collection
router.get('/collection', rejectUnauthenticated, (req, res) => {
    const query = `
        SELECT "monster".monster, "monster".description, "type".type, "monster_collection".* 
	    FROM "type"
	    JOIN "monster"
	    ON "monster".type_id = "type".id
	    JOIN "monster_collection"
	    ON "monster_collection".monster_id = "monster".id
	    WHERE "user_id" = $1
    ;`;
    pool.query(query, [req.user.id]).then(result => {
        res.send(result.rows)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// updates squad members
router.put('/squad', rejectUnauthenticated, (req, res) => {
    const query = `
        UPDATE "monster_collection"
        SET "squad" = false
        WHERE "user_id" = $1
    ;`;
    const query2 = `
        UPDATE "monster_collection"
        SET "squad" = true
        WHERE ("user_id" = $1 AND "id" = $2)
    ;`;
    pool.query(query, [req.user.id]).then(() => {
        if (req.body[0] != null) {
            pool.query(query2, [req.user.id, req.body[0].id])
        }
        if (req.body[1] != null) {
            pool.query(query2, [req.user.id, req.body[1].id])
        }
        if (req.body[2] != null) {
            pool.query(query2, [req.user.id, req.body[2].id])
        }
    }).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// gets users squad
router.get('/squad', rejectUnauthenticated, (req, res) => {
    const query = `
        SELECT "monster".monster, "monster".description, "type".type, "monster_collection".* 
	    FROM "type"
	    JOIN "monster"
	    ON "monster".type_id = "type".id
	    JOIN "monster_collection"
	    ON "monster_collection".monster_id = "monster".id
	    WHERE ("user_id" = $1 AND "squad" = true)
        ORDER BY "monster_collection".lvl DESC
    ;`;
    pool.query(query, [req.user.id]).then(result => {
        res.send(result.rows)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// updates monsters hp to 0
router.put('/dead', rejectUnauthenticated, (req, res) => {
    const query = `
        UPDATE "monster_collection"
        SET "hp" = 0
        WHERE ("user_id" = $1 AND "id" = $2)
    ;`;
    pool.query(query, [req.user.id, req.body.id]).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// updates monsters stats
router.put('/win', rejectUnauthenticated, (req, res) => {

    // sets the difference between leader lvl and opponent lvl
    let difference = req.body.opponentLvl - req.body.lvl

    // sets exp based on lvl difference 
    if (difference === 0) {
        req.body.exp += 50 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === 1) {
        req.body.exp += 60 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === -1) {
        req.body.exp += 40 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === 2) {
        req.body.exp += 70 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === -2) {
        req.body.exp += 30 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === 3) {
        req.body.exp += 80 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === -3) {
        req.body.exp += 20 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === 4) {
        req.body.exp += 90 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference === -4) {
        req.body.exp += 10 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference > 4) {
        req.body.exp += 100 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    } else if (difference < -4) {
        req.body.exp += 5 + (Math.floor(Math.random() * (req.body.opponentExp - 1 + 1)) + 1)
    }

    // rolls stats for lvl up
    while (req.body.exp > 99) {
        req.body.lvl += 1
        req.body.exp -= 100
        req.body.maxhp += Math.floor(Math.random() * (10 - 2 + 1)) + 2
        req.body.att += Math.floor(Math.random() * (5 - 1 + 1)) + 1
        req.body.def += Math.floor(Math.random() * (5 - 1 + 1)) + 1
        req.body.spd += Math.floor(Math.random() * (5 - 1 + 1)) + 1
        req.body.res += Math.floor(Math.random() * (5 - 1 + 1)) + 1
    }

    const query = `
        UPDATE "monster_collection"
	    SET "hp" = $1,
        "maxhp" = $1,
	    "att" = $2,
	    "def" = $3,
	    "lvl" = $4,
	    "exp" = $5,
        "spd" = $8,
        "res" = $9
	    WHERE ("user_id" = $6 AND "id" = $7)
    ;`;
    pool.query(query, [req.body.maxhp, req.body.att, req.body.def, req.body.lvl, req.body.exp, req.user.id, req.body.id, req.body.spd, req.body.res]).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;
