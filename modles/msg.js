const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
  name: String,
  msg: String,
  time: String,
  role: Boolean,
});

module.exports = mongoose.model("msg", msgSchema);
