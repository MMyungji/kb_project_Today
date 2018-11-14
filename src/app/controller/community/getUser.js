const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


router.get('/', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const profile = 'select * from USER where user_idx = ?';
  const countFollowing = 'select count(*) as following_count from FOLLOW where to_idx = ?';
  const countFollower = 'select count(*) as follower_count from FOLLOW where from_idx = ?';
  let data = new Array();

  if (ID != -1) {
    let result = await db.execute2(profile, ID);
    let following = await db.execute2(countFollowing, ID);
    let follower = await db.execute2(countFollower, ID);
    
    console.log(1, result[0]);
    console.log(2, follower[0]);
    console.log(3, following[0]);
    
    let temp = {
      profile_url: '',
      name: '',
      id:'',
      push_time:'',
      countFollower:'',
      countFollowing:''
    }

    temp.profile_url = result[0].profile_url,
    temp.name = result[0].name,
    temp.id = result[0].user_ID,
    temp.push_time = result[0].push_time
    temp.countFollower = follower[0].follower_count
    temp.countFollowing = following[0].following_count

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
