var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: String,
  userId: String,
  username: String,
  selectedFiles: String,
  category: String,
  time: { type: Date, default: Date.now },
  likes: [],
  commentsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("posts", blogSchema);
