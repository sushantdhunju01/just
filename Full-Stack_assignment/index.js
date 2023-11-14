const path = require("path");
const ejs = require("ejs");
const express = require("express");
const app = new express();
const data = require("./models/models");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));
app.set("view engine", "ejs");

const conString = "mongodb+srv://sushant:full123@cluster0.4amujzj.mongodb.net/";
try {
  const connection = mongoose.connect(conString);
  console.log("MongoDb Connected!!! Keep it up!!");
} catch (err) {
  console.log("MongoDb Not Connected!!! Try again!!");
}

// Routes
app.post("/storedata", async (req, res) => {
  data.g2data
    .create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error saving data to the database" });
    });
});

app.get("/getdata", (req, res) => {
  const searchNumber = req.query.licenseNo;

  data.g2data
    .find({
      licenseNo: searchNumber,
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

app.put("/updatedata", async (req, res) => {
  try {
    const itemId = req.body.itemId;

    const updatedData = await data.g2data.findByIdAndUpdate(
      { _id: itemId },
      {
        $set: {
          "car.make": req.body.make,
          "car.model": req.body.model,
          "car.year": req.body.year,
          "car.plateNo": req.body.plateno,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }
    console.log("Data Updated:", updatedData);
    res
      .status(200)
      .json({ message: "Data updated successfully", data: updatedData });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/g", (req, res) => {
  res.render("gpage");
});

app.get("/g2", (req, res) => {
  res.render("g2page");
});

app.listen(4000, () => {});
