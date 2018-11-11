const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');


router.get('/', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const readFollower = 'select * from FOLLOW where to_idx = ?';
  const readProfile = 'select * from USER where user_idx = ?';
  let data = new Array();

  if (ID != -1) {
    let result = await db.execute2(readFollower, ID);

    for(i = 0; i < result.length; i++) {
      let profile = await db.execute2(readProfile, result[i].from_idx);
      let temp = {
        //following_idx: '',
        profile_img: '',
        id: '',
        name: ''
      }

      //temp.following_idx = result[i].from_idx;
      temp.profile_img = profile[0].profile_url;
      temp.id = profile[0].user_ID;
      temp.name = profile[0].name

      data.push(temp);
    }
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