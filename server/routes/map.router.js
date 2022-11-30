const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// gets map
router.get('/:id', (req, res) => {
    const query = `
        SELECT * FROM "map"
    ;`;
    pool.query(query).then(result => {
        res.send(result.rows)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;
