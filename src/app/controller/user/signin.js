const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');

router.post('/', async(req, res, next) => {
    const user_ID = req.body.id;
    const user_passwd = req.body.passwd;

    const fcm_token = req.body.fcm_token;
    
    const QUERY = 'select * from USER where user_ID = ?';
    let data = await db.execute2(QUERY, user_ID);

    const updateFcm = 'update USER set fcm_token = ? where user_ID = ?';
    let fcm = await db.execute3(updateFcm,fcm_token,user_ID);

    //아이디가 존재하지 않을 경우
    if (data.length == 0) {
        res.status(401).send({
            message: 'wrong email'
        });
    }
    
    //비밀번호가 틀릴 경우
    else if (user_passwd != hash.decoding(data[0].user_passwd)) {
        res.status(401).send({
            message: 'wrong password'
        });
    } else {
        const token = jwt.sign(data[0].user_idx);

        res.status(200).send({
            message: 'login success',
            token: token
        });
    }
});

module.exports = router;
