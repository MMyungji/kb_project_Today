const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
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

module.exports = router;