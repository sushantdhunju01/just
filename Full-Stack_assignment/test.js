const mongooes = require("mongoose");
const data = require("./models/models");
const dataEntered = require("./public/js/script");
const conString = "mongodb+srv://sushant:full123@cluster0.4amujzj.mongodb.net/";
try {
  const connection = mongooes.connect(conString);
  console.log("MongoDb Connected!!! Keep it up!!");
} catch (err) {
  console.log("MongoDb Not Connected!!! Try agian!!");
}

/********************** */
// Creating new Document
/********************** */

console.log("Hel", dataEntered);

data.g2data
  .create({
    firstName: dataEntered.firstName,
    lastName: dataEntered.lastName,
    licenseNo: dataEntered.License_No,
    age: dataEntered.age,
    car: {
      make: dataEntered.make,
      model: dataEntered.model,
      year: dataEntered.year,
      plateNo: dataEntered.paltno,
    },
  })
  .then((data) => {
    console.log("Record Inserted !!!");
  })
  .catch((err) => {
    console.log("Error Found :: " + err);
  });


/****************************/
// Updating a Document
/*************************** */
/*
signUp
.findByIdAndUpdate('650cd995c57318aa99a8a65a',
    {
        firstName:'Updated First Name'
    })
.then(data=>{
    console.log("Data Updated")
})
.catch(err=>{
    console.log("Error"+err)
})
*/

/****************************/
// Deleting a single Document
/*************************** */

/*
 signUp
 .findByIdAndDelete('650cd995c57318aa99a8a65a')
 .then(data=>{
     console.log("Data Deleted!!!" + data)
 })
 .catch(err=>{
     console.log("Error"+err)
 })
 */
