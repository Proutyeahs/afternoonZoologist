const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
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

            let gold;
            let goldOdds = Math.floor(Math.random() * (9999 - 1 + 1)) + 1

            if (goldOdds === 9999) {
                gold = true
            } else {
                gold = false
            }

            let lvl = Math.floor(Math.random() * (5 - 1 + 1)) + 1
            let exp = Math.floor(Math.random() * (99 - 0 + 1)) + 0
            let hp = Math.floor(Math.random() * (25 - 10 + 1)) + 10 * lvl
            let att = Math.floor(Math.random() * (10 - 5 + 1)) + 5 * lvl
            let def = Math.floor(Math.random() * (10 - 5 + 1)) + 5 * lvl

            const monster = {
                id: stats.id,
                monster: stats.monster,
                description: stats.description,
                type_id: stats.type_id,
                type: stats.type,
                gold: gold,
                lvl: lvl,
                exp: exp,
                hp: hp,
                att: att,
                def: def
            }
            monsters.push(monster)
        }
        console.log(monsters)
        res.send(monsters)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
});

router.post('/', rejectUnauthenticated, (req, res, next) => {
    const query = `
        INSERT INTO "monster_collection" 
	    ("user_id", "monster_id", "gold", "hp", "att", "def", "lvl", "exp")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ;`;
    pool.query(query, [req.user.id, req.body.id, req.body.gold, req.body.hp, req.body.att, req.body.def, req.body.lvl, req.body.exp,]).then(() =>
        res.sendStatus(201)
    ).catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
    });
});

router.get('/collection', rejectUnauthenticated, (req, res, next) => {
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
        console.log('User registration failed: ', err);
        res.sendStatus(500);
    });
});

router.put('/squad', rejectUnauthenticated, (req, res) => {
    const query = `
        UPDATE "monster_collection"
        SET "squad" = false
        WHERE "user_id" = $1
    ;`;
    const query2 = `
        UPDATE "monster_collection"
        SET "squad" = true
        WHERE ("user_id" = $1 AND "id" = $2 OR "id" = $3 OR "id" = $4)
    ;`;
    pool.query(query, [req.user.id]).then(() => {
        pool.query(query2, [req.user.id, req.body[0].id, req.body[1].id, req.body[2].id]).then(() => {
            res.sendStatus(201)
        })
    }).catch((err) => {
        console.log('User registration failed: ', err);
        res.sendStatus(500);
    });
 });
 

module.exports = router;
