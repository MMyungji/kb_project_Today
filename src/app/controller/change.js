const express = require('express');
const router = express.Router();
const db = require('../module/pool.js');
const upload = require('../../config/multer');

var multiUpload = upload.fields([{ name: 'img' }]);

//comfort 이미지 삽입
router.post('/', multiUpload, async (req, res, next) => {
    const QUERY = 'insert into COMFORT set ?';
    let tempArray = [];
    if (req.files.img){
        for (let i = 0 ; i < req.files.img.length ; i++) {

            tempArray.push(req.files.img[i].location);
        }
        console.log(tempArray);
        let data={
            message : req.files.img[0].location
        }


        let inserted = await db.execute2(QUERY, data)
        

        if (inserted == undefined) {
            res.status(405).send({
                message: 'please image'
            });
        } else {
            res.status(201).send({
                message: "success"
            });
        }

    }else{
        res.status(405).send({
            message: "please upload image"
        });
    }


});

module.exports = router;