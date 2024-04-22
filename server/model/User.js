const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
