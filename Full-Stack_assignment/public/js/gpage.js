document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let licenseNo = document.getElementById("licenseNumber").value;
    if (!licenseNo) {
      alert("Please enter a license Number");
      return;
    }
    try {
      const url = `/getdata?licenseNo=${encodeURIComponent(licenseNo)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const container = document.getElementById("data-container");

        container.innerHTML = "";

        data.forEach((e) => {
          const div = document.createElement("div");
          div.className = "data-item";

          div.innerHTML = `
            <form id="msform" method="post">
              <fieldset>
                <label for="firstname">First Name:</label>
                <input type="text" name="firstname" id="firstname" value="${e.firstName}" disabled/>
                <label for="Last Name">Last Name:</label>
                <input type="text" name="lastname" id="lastname" value="${e.lastName}" disabled/>
                <label for="age">Age</label>
                <input type="number" name="age" id="age" value="${e.age}" disabled/>
                <label for="licenseNumber">License Number:</label>
                <input type="text" name="licenseNumber" id="licenseNumber" value="${e.licenseNo}" disabled/>
                <label for="make">Car Company:</label>
                <input type="text" name="make" id="make" value="${e.car.make}" />
                <label for="model">Car Model:</label>
                <input type="text" name="model" id="model" value="${e.car.model}" />
                <label for="year">Year:</label>
                <input type="number" name="year" id="year" value="${e.car.year}" />
                <label for="platenumber">Number Plate:</label>
                <input type="text" name="platenumber" id="platenumber" value="${e.car.plateNo}" />
                <button class="update action-button">UPDATE</button>
              </fieldset>
            </form>`;

          container.appendChild(div);

          // Add a separate click event listener for the update button inside this forEach loop
          const update = div.querySelector(".update");

          update.addEventListener("click", async () => {
            // Read the values from the form elements inside this div
            let make = div.querySelector("#make").value;
            let model = div.querySelector("#model").value;
            let year = div.querySelector("#year").value;
            let platenumber = div.querySelector("#platenumber").value;
            let itemId = e._id; // Assuming e has the _id property

            if (!make || !model || !year || !platenumber) {
              alert("Please fill in all fields");
              return;
            }

            try {
              const formData = {
                itemId,
                make,
                model,
                year,
                platenumber,
                // Include other required data here
              };

              const response = await fetch("/updatedata", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

              if (response.ok) {
                const data = await response.json();
                if (data === "Done") {
                  alert("Data updated successfully");
                  // Clear the form elements
                  div.querySelector("#make").value = "";
                  div.querySelector("#model").value = "";
                  div.querySelector("#year").value = "";
                  div.querySelector("#platenumber").value = "";
                }
              } 
            } catch (error) {
              console.error("Error updating data:", error);
            }
          });
        });
      } else {
        alert("Data Not Found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    }
  });
});
