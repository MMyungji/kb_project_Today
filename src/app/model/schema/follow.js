var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var followSchema = new Schema({
    user_idx : Number,
    follow_user : Number,
    following : Boolean
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('follow', followSchema);