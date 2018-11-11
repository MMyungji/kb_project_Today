const jwt = require('./jwt')
const secretKey = require('../../config/secretKey').key;
const _ = require('lodash');

module.exports = {
	userCheck : async (req, res) => {
		const { usertoken } = req.headers
		console.log(usertoken)
		try {
			req.ID = await jwt.verify(token,secretKey)
			console.log(req.ID)
			if (_.isEmpty(req.user)) {
				throw new Error('user Authentication Error')
			} 
			next()
		} catch (e) {
			res.status(401).send({
				message: "access denied"
			});
		}  
	}
};