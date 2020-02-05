var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
   category: String
});

module.exports = mongoose.model('category' , blogSchema);
