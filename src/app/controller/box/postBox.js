const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let box = require('../../model/schema/box');
const pool = require('../../module/pool.js');
var mmt = require("moment")


router.post('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const profile = 'select * from USER where user_idx = ?';
    const profileID = 'select * from USER where user_ID = ?';

//to : 나, from : 내가 응원보내는 사람 
    let from = await db.execute2(profileID, req.body.from);
    let to = await db.execute2(profile, ID);

    const today_at = mmt().format("YYYY-MM-DD");

    console.log("to",to);
    console.log("from",from);
    
    if (ID != -1) {
        if(to != 0 && from != 0){
            await box.create({
                today_at: today_at.toString(),
                to_idx : ID,
                to_id : to[0].user_ID,
                to_name : to[0].name,
                from_idx : from[0].user_idx,
                from_id : from[0].user_ID,
                comment: req.body.comment,
                profile_url: from[0].profile_url,
                name: from[0].name

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
        }else{
          return res.status(405).send({
            message: "user data failure"
        });
      }
  } else {
    res.status(401).send({
        message: "access denied"
    });
}

});

module.exports = router;

