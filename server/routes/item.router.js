const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

// gets users items
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `
        SELECT "item".*, "item_inventory".quantity FROM "item"
	    JOIN "item_inventory"
	    ON "item".id = "item_inventory".item_id
	    WHERE "item_inventory".user_id = $1
    ;`;
    pool.query(query, [req.user.id]).then(result => {
        res.send(result.rows)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

// decreases item quantity
router.put('/', rejectUnauthenticated, (req, res) => {
    const query = `
        UPDATE "item_inventory"
        SET "quantity" = "quantity" - 1
        WHERE ("user_id" = $1 AND "item_id" = $2)
    ;`;
    pool.query(query, [req.user.id, req.body.id]).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
})

// adds to item quantity or inserts it
router.post('/', rejectUnauthenticated, (req, res) => {
    const query = `
        SELECT * FROM "item_inventory"
	    WHERE ("user_id" = $1 AND "item_id" = $2)
    ;`;
    pool.query(query, [req.user.id, req.body.id]).then(result => {

        // if row exists update else insert
        if (result.rows.length != 0) {
            const query2 = `
                UPDATE "item_inventory"
                SET "quantity" = "quantity" + $3
                WHERE ("user_id" = $1 AND "item_id" = $2)	
            ;`;
            pool.query(query2, [req.user.id, req.body.id, req.body.quantity])
        } else {
            const query3 = `
                INSERT INTO "item_inventory"
                ("user_id", "item_id", "quantity")
                VALUES ($1, $2, $3)
            ;`;
            pool.query(query3, [req.user.id, req.body.id, req.body.quantity])
        }
    }).then(() => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;
