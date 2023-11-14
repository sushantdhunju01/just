const mongoose = require("mongoose");

const db = mongoose.Schema;

const dbSchema = new db({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  licenseNo: { type: String, required: true },
  age: { type: Number, required: true, min: 16, max: 60 },
  car_details: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    plateno: { type: String, required: true },
  },
});

const dataDetails = mongoose.model("G2", dbSchema);
module.exports = dataDetails;
