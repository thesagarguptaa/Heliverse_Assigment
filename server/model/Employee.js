const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  Id: {
    type: Number,
  },
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

module.exports = mongoose.model("Employee", employeeSchema);
