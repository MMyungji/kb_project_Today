const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let feeling = require('../../model/schema/feeling');
const pool = require('../../module/pool.js');
var mmt = require("moment")


router.post('/', async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    const today_at = mmt().format("YYYY-MM-DD");
    console.log(today_at);

    
    if (ID != -1) {
        await feeling.create({
            good: req.body.good,
            bad: req.body.bad,
            comment: req.body.comment,
            user_idx: ID,
            today_at: today_at.toString()

        }, async function (err, docs) {
            if (err) {
                res.status(405).send({
                    message: "fail"
                });
            } else {
                res.status(201).send({
                    message: "success"
                }); 
            }
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;

