const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const query = `
        SELECT * FROM "monster"
        ORDER BY RANDOM()
        LIMIT 3
    ;`;
    pool.query(query).then(result => {
        console.log(result.rows)
        res.send(result.rows)
    }).catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
});

module.exports = router;
