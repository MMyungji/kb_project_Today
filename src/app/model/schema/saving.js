var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var savingSchema = new Schema({
    saving_at : {type : Date, default : Date.now},
    user_idx : Number,
    saving_money : Number,
    comment : String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('saving', savingSchema);