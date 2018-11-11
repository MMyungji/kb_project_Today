var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var followSchema = new Schema({
    user_idx : Number,
    follower_idx : Number,
    follower_idx : String,
    following : Boolean //상대방이 나를 팔로잉?
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('follow', followSchema);