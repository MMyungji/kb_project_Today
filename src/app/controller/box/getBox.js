const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let box = require('../../model/schema/box');

router.get('/', async (req, res) => {
  let today_at = req.query.today;
  const ID = jwt.verify(req.headers.authorization);
  let data = new Array();

  if (ID != -1) {
    box.find({
      from_idx: ID,
      today_at: today_at
    }, async function (err, result) {
      if (err) {
        return res.status(500).send({
          message: "get box fail"
        });
      } else {
        console.log(result);
        for (let i = 0; i < result.length; i++) {

          let temp = {
            today_at : "",
            from_id:"",
            name:"",
            comment:"",
            profile_url:""
          }
          temp.today_at = result[i].today_at;
          temp.from_id = result[i].to_id;
          temp.name = result[i].to_name;
          temp.comment = result[i].comment;
          temp.profile_url = result[i].profile_url;
          
          data.push(temp);

        }
        res.status(200).send({
          message: "success",
          data: data
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