const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let follow = require('../../model/schema/follow');

router.post('/', async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    
    if (ID != -1) {
        await saving.create({
            saving_money: req.body.saving_money,
            comment: req.body.comment,
            user_idx: ID
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

