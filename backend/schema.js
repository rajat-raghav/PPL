var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  username: String,
  password: String,
  email: String,
  first_name: String,
  last_name: String
});

module.exports = mongoose.model("users", blogSchema);
