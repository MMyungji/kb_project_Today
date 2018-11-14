const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let feeling = require('../../model/schema/feeling');


router.get('/:today', async (req, res) => {
  let today = req.params.today;
  const ID = jwt.verify(req.headers.authorization);
  // const readFollow = 'select * from USER u INNER JOIN FOLLOW f ON u.user_idx = f.to_idx';
  const readFollow = 'select * from FOLLOW where to_idx = ?';
  const readProfile = 'select * from USER where user_idx = ?';
  let data = new Array();

  if (ID != -1) {
    let following = await db.execute2(readFollow, ID);
    if(following.length != 0){
      for (let i = 0; i < following.length; i++) {
        let user = await db.execute2(readProfile, following[i].from_idx);
        var user_idx = user[0].user_idx;
        var profile_img = user[0].profile_url;
        var id = user[0].user_ID;
        var name = user[0].name;

        if(user.length != 0){
          await feeling.find({
            user_idx : user_idx,
            today_at : today
          }, async function (err, result) {
            if (err) {
              return res.status(500).send({
                message: "get today's feeling fail"
              });
            } else {
              console.log(00, result);
              console.log(0, result.length);

              for (let j = 0; j < result.length; j++) {

                let temp = {
                  profile_img: "",
                  id: "",
                  name: "",
                  good : "",
                  bad : "",
                  comment : ""
                }

                temp.profile_img = profile_img;
                temp.id = id;
                temp.name = name;
                temp.good = result[j].good;
                temp.bad = result[j].bad;
                temp.comment = result[j].comment;

                console.log(1, temp);

                data.push(temp);
              } //for

              console.log(11,data);
            } //async else
          });
          console.log(2,data);
        }
        else{
          return res.status(405).send({
            message: "user data failure"
          });
        }

      }
      console.log(3,data);

      res.status(200).send({
        message: "success",
        data: data
      });




    }else{
      return res.status(405).send({
        message: "user doesn't follow anyone"
      });

    }
  } else {
    res.status(401).send({
      message: "access denied"
    });
  }

});

module.exports = router;