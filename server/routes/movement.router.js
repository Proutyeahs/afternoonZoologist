const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// moves user
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log("location", req.body.loc)
    const query = `
        UPDATE "user"
	    SET "location" = $2
	    WHERE "user".id = $1;
    ;`;
    pool.query(query, [req.user.id, req.body.loc]).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;
