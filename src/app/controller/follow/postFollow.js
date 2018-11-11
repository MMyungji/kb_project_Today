const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');

router.post('/:follower', async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    const follower = req.params.follower;

    const follow = 'select count(*) as following_count from FOLLOW where to_idx = ? and from_idx = ?';
    const readFrom_idx = 'select user_idx from USER where user_ID = ?';
    const QUERY = 'INSERT INTO FOLLOW (to_idx, from_idx, from_id, following) VALUES (?, ?, ?, ?)';
    const update = 'update FOLLOW set following = ? where to_idx = ?';


    let result = await db.execute2(readFrom_idx, follower);
    let from_idx = result[0].user_idx;
    console.log(from_idx);

    if (ID != -1) {
        let count = await db.execute3(follow, from_idx, ID);

        if(count[0].following_count === 0){
            data = await db.execute2(QUERY, [ID, from_idx, follower, 0]);
        }else{
            data = await db.execute2(QUERY, [ID, from_idx, follower, 1]);
            updateData = await db.execute3(update, 1, from_idx);

            if(!updateData && updateData == undefined){
                res.status(405).send({
                    message: "database failure"
                });
                return;
            }
        }

        console.log(data);

        if(!data && data == undefined){
            res.status(405).send({
                message: "database failure"
            });
            return;
        }
        return res.status(201).send({
            message: "success"
        });

    } else {
        res.status(401).send({
            message: "access denied"
        });
    }

});

module.exports = router;

