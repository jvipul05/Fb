const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/login");

var userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  phone: Number,
  password: String,
  image: String,
  like:{
    type: Number,
    default: 0
  }
  }
)

userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);
