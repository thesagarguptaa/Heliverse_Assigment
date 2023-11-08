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
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
