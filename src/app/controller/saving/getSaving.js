const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
const db = require('../../module/pool.js');
let saving = require('../../model/schema/saving');
const usercheck = require('../../module/userCheck.js');


router.get('/', function (req, res) {
    const ID = jwt.verify(req.headers.authorization);
    var data = new Array();
    let now = new Date();
    var totalMoney = 0;

    const today_at = mmt().format("YYYY-MM-DD");

    if (ID != -1) {

      saving.find({
        user_idx: ID
      }, async function (err, result) {
        if (err) {
          return res.status(500).send({
            message: "get saving fail"
          });
        } else {
          for (let i = 0; i < result.length; i++) {

            let temp = {
              saving_at : "",
              saving_money : "",
              comment : ""
            }

            let local =new Date(result[i].saving_at.getTime() - (result[i].saving_at.getTimezoneOffset()*60000));

            temp.saving_at = local;
            temp.saving_money = result[i].saving_money;
            temp.comment = result[i].comment;
            totalMoney += result[i].saving_money;


            data.push(temp);
          }
          res.status(200).send({
            message: "success",
            totalMoney : totalMoney,
            data : data
          });
        }
      }).sort({ saving_at: -1 }).limit(20);
    } else {
      res.status(401).send({
        message: "access denied"
      });
    }

  });

router.get('/goal', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const profile = 'select * from USER where user_idx = ?';
  let data = new Array();

  if (ID != -1) {
    let result = await db.execute2(profile, ID);

    let temp = {
      goal: '',
      goal_money:''
    }

    temp.goal = result[0].goal;
    temp.goal_money = result[0].goal_money;
    

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