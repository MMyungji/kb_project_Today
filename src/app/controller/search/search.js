const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
let userSearchRes = require('../../model/res/userSearchRes');

//검색
//keyword=검색어
router.get('/', async (req, res, next) => {

    const keyword = '%'+req.query.id+'%';
    const search = 'SELECT * FROM USER WHERE user_ID LIKE ?';

    //const keyword = req.query.keyword;

    let result = await db.execute2(search, keyword);


    if (!result) {
        return res.status(405).send({
            message: "get user-list fail"
        });
    } else {
        return res.status(200).send({
            message: "success",
            result: userSearchRes.res(result)
        });
    }


});


router.get('/result/:id', async (req, res) => {
  const ID = jwt.verify(req.headers.authorization);
  const keyword = req.params.id;
  console.log(keyword);
  const readFollower = 'select * from FOLLOW where from_id = ? and to_idx = ?';
  const readProfile = 'select * from USER where user_idx = ?';
  const readProfileID = 'select * from USER where user_ID = ?';
  let data = new Array();

  if (ID != -1) {
    let result = await db.execute3(readFollower, keyword,ID);
    console.log(result);

    if(result.length != 0) {
      let profile = await db.execute2(readProfile, result[0].from_idx);
      let temp = {
        profile_img: '',
        id: '',
        name: '',
        following: ''
    }

    temp.profile_img = profile[0].profile_url;
    temp.id = profile[0].user_ID;
    temp.name = profile[0].name;
    temp.following = result[0].following;

    data.push(temp);
}else{
    let profile = await db.execute2(readProfileID, keyword);
    let temp = {
        profile_img: '',
        id: '',
        name: '',
        following: ''
    }

    temp.profile_img = profile[0].profile_url;
    temp.id = profile[0].user_ID;
    temp.name = profile[0].name;
    temp.following = null;

    data.push(temp);

}
console.log(data);
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