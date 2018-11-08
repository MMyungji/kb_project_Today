const hash = require('../../module/hash.js');

module.exports = {
    new : function(body) {
        let newUser = {
            user_ID : body.id,
           // name : body.name,
            user_passwd: hash.encoding(body.passwd)
        };
        return newUser;
    }
}