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

module.exports = router;
