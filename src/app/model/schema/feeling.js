var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feelingSchema = new Schema({
    today_at : String,
    user_idx : Number,
    good : Number,
    bad : Number,
    comment : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('feeling', feelingSchema);