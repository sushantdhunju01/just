const datadetails = require("../models/models");



module.exports = (req, res) => {
  if (!req.body) {
    res.end("Data Not Found");
  } else {
    const {
      firstname,
      lastname,
      licenseNumber,
      age,
      make,
      model,
      year,
      platenumber,
    } = req.body;
    if (
      !firstname ||
      !lastname ||
      !licenseNumber ||
      !age ||
      !make ||
      !model ||
      !year ||
      !platenumber
    ) {
      return res.status(400).send("All fields are required.");
    }
    if (age < 16 || age > 60) {
      return res.status(400).send("Age must be between 16 and 60");
    }

    const newUser = new datadetails({
      firstname: firstname,
      lastname: lastname,
      age: age,
      License_No: licenseNumber,
      car_details: {
        make: make,
        model: model,
        year: year,
        paltno: platenumber,
      },
    });
    // store Model into DB
    newUser
      .save()
      .then((data) => {
        console.log("New User Information:", data);
        res.redirect("/g2");
      })
      .catch((err) => {
        res.status(401).send({ message: err.message });
      });
  }
};
