const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
let feeling = require('../../model/schema/feeling');

router.get('/', async (req, res, next) => {
  const ID = jwt.verify(req.headers.authorization);
  let data = new Array();
  
  if (ID != -1) {

    var random = Math.floor(Math.random() * 3) + 1;
    const comfort = 'select * from COMFORT where comfort_idx = ?';
    
    let result = await db.execute2(comfort, random);
    if(!result){
      res.status(500).send({
        message:"Internal Server Error"
      });
    }
    let temp1 = {
      comfort_img : result[0].message
    }
    data.push(temp1);


    feeling.find({
      user_idx: ID
    }, async function (err, result) {
      if (err) {
        return res.status(500).send({
          message: "get feeling fail"
        });
      } else {
        for (let i = 0; i < result.length; i++) {
          
          let temp = {
            feeling_at : "",
            good : "",
            comment : ""
          }
          temp.feeling_at = result[i].feeling_at;
          temp.good = result[i].good;
          temp.comment = result[i].comment;
          
          data.push(temp);

        }
        res.status(200).send({
          message: "success",
          data: data

        });
      }
    }).sort({ feeling_at: -1 }).limit(3);
  } else {
    res.status(401).send({
      message: "access denied"
    });
  }
});



module.exports = router;