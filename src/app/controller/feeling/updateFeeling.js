const express = require('express');
const router = express.Router();
const jwt = require('../../module/jwt.js');
let feeling = require('../../model/schema/feeling');

router.put('/:feeling_idx', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    const feeling_idx = req.params.feeling_idx;
    comment = req.body.comment;

    if (ID != -1) {

        feeling.update({ _id: feeling_idx }, { $set: req.body}, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            if(!output.n) return res.status(404).json({ error: 'feeling not found' });
            res.json( { message: 'success' } );
        })


    } else {
        res.status(401).send({
            message: "access denied"
        });
        return;
    }

});

module.exports = router;