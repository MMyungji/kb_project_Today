const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');

// 나의 마이페이지 get
router.get('/', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const profile = 'select * from USER where user_idx = ?';
  let data = new Array();

  if (ID != -1) {
    let result = await db.execute2(profile, ID);

    console.log(result);

    let temp = {
      profile_url: '',
      name: '',
      push_time:''
    }

    temp.profile_url = result[0].profile_url,
      temp.name = result[0].name,
      temp.push_time = result[0].push_time


    data.push(temp);

    if (data) {
      res.status(200).send({
        message: "success",
        data: data
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
