module.exports = {

	time : async(...args) => {
		let now = new Date();

	  	let local = new Date(now.getTime() - (now.getTimezoneOffset()*60000));

      	return local;
	},
};