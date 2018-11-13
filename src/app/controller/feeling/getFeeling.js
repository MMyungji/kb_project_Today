const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
let feeling = require('../../model/schema/feeling');

router.get('/:today', function (req, res) {

  let today = req.params.today;
  //const today = req.query.today;
  console.log(today);

  const ID = jwt.verify(req.headers.authorization);
  var data = new Array();


  if (ID != -1) {
    feeling.find({
      user_idx:ID,
      today_at:today
    }, async function (err, result) {
      console.log(result);
      if (err) {
        return res.status(500).send({
          message: "get today's feeling fail"
        });
      } else {
        for (let i = 0; i < result.length; i++) {

          let temp = {
            good : "",
            bad : "",
            comment : ""
          }

          temp.good = result[i].good;
          temp.bad = result[i].bad;
          temp.comment = result[i].comment;

          data.push(temp);
        }
        res.status(200).send({
          message: "success",
          data : data
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