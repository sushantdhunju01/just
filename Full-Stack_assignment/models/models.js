const mongoose = require("mongoose");

const db = mongoose.Schema;

const dbSchema = new db({
  firstName: String,
  lastName: String,
  licenseNo: Number,
  age: Number,
  car: {
    make: String,
    model: String,
    year: Number,
    plateNo: String,
  },
});

const g2data = mongoose.model("G2", dbSchema);
module.exports.g2data = g2data;
