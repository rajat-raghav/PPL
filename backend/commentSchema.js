var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
   cid:String,
   comment: String,
   username: String,
   time: {type:Date , default:Date.now},

});

module.exports = mongoose.model('comments' , commentSchema);
