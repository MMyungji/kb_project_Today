const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let saving = require('../../model/schema/saving');


router.delete('/', async(req, res) => {
    const ID = jwt.verify(req.headers.authorization);

    if(ID != -1){
        saving.remove({
            user_idx : ID
        }, function(err, savings){
            if(err) 
                return res.status(500).send({message: 'database failure'});
            
            res.status(201).send({
                message: "success"
            });
            
            return;
        });
    } else {
        res.status(401).send({
            message: "access denied"
        });
    }
});

module.exports = router;