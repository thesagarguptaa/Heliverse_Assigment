const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  avatar: {
    type: String,
  },
  domain: {
    type: String,
  },
  available: {
    type: String,
  },
});

module.exports = mongoose.model("Team", teamSchema);
