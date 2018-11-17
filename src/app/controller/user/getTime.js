const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


router.get('/time', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const profile = 'select * from USER where user_idx = ?';

  if (ID != -1) {
    let result = await db.execute2(profile, ID);
    let time = result[0].push_time.toString();
    var timeArr = time.split(':')

    if (time) {
      res.status(200).send({
        message: "success",
        hour:timeArr[0],
        minute:timeArr[1],
        second:timeArr[2]
      });

    } else {
      res.status(405).send({
        error: "Get data fail"
      });

    }


  } else {
    res.status(401).send({
      message: "access denied"
    });
  }
});

module.exports = router;
