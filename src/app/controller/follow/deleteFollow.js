const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');


router.delete('/:following', async (req, res) => {
  let following = req.params.following;
  const ID = jwt.verify(req.headers.authorization);
  const deleteFollowing = 'delete from FOLLOW where to_idx = ? and from_idx = ?';
  const readFollowing = 'select * from FOLLOW where to_idx = ? and from_idx = ?';
  const readProfile = 'select * from USER where user_ID = ?';
  let data = new Array();

  if (ID != -1) {
    let result = await db.execute2(readProfile, following);

    if(result.length != 0){     
      let followExist = await db.execute3(readFollowing, ID, result[0].user_idx);

      if(followExist.length===0)
        res.status(405).send({message: 'following does not exist'});
      else{
       let followExist = await db.execute3(deleteFollowing, ID, result[0].user_idx);
        res.status(200).send({message: 'success'});
      }
    }else{
      res.status(405).send({message: "This user doesn't exist"});
    }

  } else {
    res.status(401).send({
      message: "access denied"
    });
  }

});

module.exports = router;