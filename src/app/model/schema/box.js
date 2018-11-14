var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var boxSchema = new Schema({
    today_at : String,
    to_idx : Number,
    to_id:String,
    to_name:String,
    from_idx : Number,
    from_id:String,
    comment:String,
    profile_url:String,
    name:String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('box', boxSchema);