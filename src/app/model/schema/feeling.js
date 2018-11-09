var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feelingSchema = new Schema({
    feeling_at : {type : Date, default : Date.now},
    user_idx : Number,
    good : Number,
    bad : Number,
    comment : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('feeling', feelingSchema);