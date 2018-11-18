const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let saving = require('../../model/schema/saving');
const push = require('../../module/push.js');

var mmt = require("moment");
require('moment-timezone');
mmt.tz.setDefault("Asia/Seoul");

router.post('/', async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    const QUERY = 'select * from USER where user_idx = ?';
    data = await db.execute2(QUERY, ID);

    const today_at = mmt().format("YYYY-MM-DD");

    if (ID != -1) {
        await saving.create({
            saving_money: req.body.saving_money,
            comment: req.body.comment,
            user_idx: ID,
            saving_at: today_at.toString()
        }, async function (err, docs) {
            if (err) {
                res.status(405).send({
                    message: "fail"
                });
            } else {
                push.saveMoney(ID);
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

