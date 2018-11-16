const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');


router.get('/name', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const profile = 'select * from USER where user_idx = ?';

  if (ID != -1) {
    let result = await db.execute2(profile, ID);
    console.log(result);
    name = result[0].name;
    console.log(name);

    if (name) {
      res.status(200).send({
        message: "success",
        name : name
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
