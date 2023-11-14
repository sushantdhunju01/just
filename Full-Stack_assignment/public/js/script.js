document.addEventListener("DOMContentLoaded", () => {
  const submiBtn = document.querySelector(".submit");

  submiBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let age = document.getElementById("age").value;
    let licenseNo = document.getElementById("licenseNumber").value;
    let make = document.getElementById("make").value;
    let model = document.getElementById("model").value;
    let years = document.getElementById("year").value;
    let plateNo = document.getElementById("platenumber").value;

    const firstNameRegx = /^[A-Za-z]+$/;
    const lastNameRegx = /^[A-Za-z]+$/;

    if (!firstName || !firstNameRegx.test(firstName)) {
      alert("Please enter a proper First Name");
      return;
    }
    if (!lastName || !lastNameRegx.test(lastName)) {
      alert("Please enter a proper Last Name");
      return;
    }
    if (!age) {
      alert("Please a Age");
      return;
    }
    if (!licenseNo) {
      alert("Please a license Number");
      return;
    }
    if (!make) {
      alert("Please the Company Name");
      return;
    }
    if (!model) {
      alert("Please the model name ");
      return;
    }
    if (!years) {
      alert("Please the manufacture year");
      return;
    }
    if (!plateNo) {
      alert("Please the Plate Number");
      return;
    }
    const formData = {
      firstname: firstName,
      lastname: lastName,
      age: age,
      License_No: licenseNo,
      car_details: {
        make: make,
        model: model,
        year: years,
        paltno: plateNo,
      },
    };
    try {
      const response = await fetch("/storedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("the fish", data);
      if (data === "Done") {
        alert("Thank you for you information");
        document.getElementById("firstname").value = " ";
        document.getElementById("lastname").value = " ";
        document.getElementById("age").value = " ";
        document.getElementById("licenseNumber").value = " ";
        document.getElementById("make").value = " ";
        document.getElementById("model").value = " ";
        document.getElementById("year").value = " ";
        document.getElementById("platenumber").value = " ";
      }
    } catch (error) {
      alert("Error saving data"); // Show an error message
    }
  });
});
