const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// posts companion
router.post('/', rejectUnauthenticated, (req, res) => {

    // picks a random type
    const type = Math.floor(Math.random() * (4 - 1 + 1)) + 1

    // inserts stats for companion
    const query = `
        INSERT INTO "monster_collection" 
	    ("user_id", "monster_id", "gold", "hp", "att", "def", "lvl", "exp", "maxhp", "spd", "res", "squad")
        VALUES ($1, null, null, 100, 50, 50, 5, 0, 100, 50, 50, true)
    ;`;

    // gets the id for the companions stats
    const query2 = `
        SELECT "id" FROM "monster_collection"
	    WHERE ("user_id" = $1 AND "monster_id" IS NULL)
    ;`;

    // inserts companion referencing its stats
    const query3 = `
        INSERT INTO "companion" 
	    ("monster", "description", "type_id", "monster_collection_id")
        VALUES ($1, $2, $3, $4)
    ;`;
    pool.query(query, [req.user.id]).then(() =>
        pool.query(query2, [req.user.id]).then(result => {
            console.log(result.rows[0].id)
            pool.query(query3, [req.body.name, req.body.description, type, result.rows[0].id]).then(() =>
                res.sendStatus(201)
            )
        })).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

// gets users companion
router.get('/collection', rejectUnauthenticated, (req, res) => {
    const query = `
        SELECT "companion".monster, "companion".description, "type".type, "monster_collection".* 
        FROM "type"
        JOIN "companion"
        ON "companion".type_id = "type".id
        JOIN "monster_collection"
        ON "monster_collection".id = "companion".monster_collection_id
        WHERE "user_id" = $1
    ;`;
    pool.query(query, [req.user.id]).then(result => {
        res.send(result.rows)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;
