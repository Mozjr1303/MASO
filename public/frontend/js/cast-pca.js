new WOW().init();

var visitorId = null;

var data = {
  provider: null,
  price: 100.0,
  phone: null,
  description: "Voting Fee",
};

document.addEventListener("DOMContentLoaded", async function () {
  const identity = document.querySelectorAll("#vid");
  const voteButtons = document.querySelectorAll(".inside-col button");

  voteButtons.forEach((button, index) => {
    // Ensure that the index does not exceed the identity array length
    if (index < identity.length) {
      button.onclick = ""; // Clear previous click handlers
      button.addEventListener("click", function () {
        identity.forEach((id, count) => {
          document.querySelectorAll(".per-category .col-lg-3")[
            count
          ].style.display = "none";
        });

        document.querySelector(".payment").style.display = "block";
        // Use a closure to capture the current index
        document
          .querySelector(".payment button")
          .addEventListener("click", () => {
            pay(identity[index].value, 'bma');
          });
      });
    }
  });

  // Initialize FingerprintJS and get the visitor ID
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  visitorId = result.visitorId;

  // Get references to form elements
  var phoneInput = document.getElementById("mobile");
  var errorSpan = document.getElementById("error");
  var hiddenProviderInput = document.getElementById("hidden_provider");
  var airtelOption = document.getElementById("airtelOption");
  var mpambaOption = document.getElementById("mpambaOption");

  data.phone = phoneInput.value;
  // Set provider function
  function selectProvider(provider) {
    data.provider = provider;
    hiddenProviderInput.value = provider;

    // Remove 'selected' class from all options
    airtelOption.classList.remove("selected");
    mpambaOption.classList.remove("selected");

    // Add 'selected' class to the selected option
    if (provider === "Airtel") {
      airtelOption.classList.add("selected");
    } else if (provider === "Tnm") {
      mpambaOption.classList.add("selected");
    }
  }

  // Add click event listeners to the provider options
  airtelOption.addEventListener("click", function () {
    selectProvider("Airtel");
  });

  mpambaOption.addEventListener("click", function () {
    selectProvider("Tnm");
  });
});

function payBlock(vid, code) {
  const identity = document.querySelectorAll("#vid");
  const voteButtons = document.querySelectorAll(".inside-col button");

  voteButtons.forEach((button, index) => {
    // Ensure that the index does not exceed the identity array length
    if (index < identity.length) {
      button.onclick = ""; // Clear previous click handlers
      button.addEventListener("click", function () {
        identity.forEach((id, count) => {
          document.querySelectorAll(".per-category .col-lg-3")[
            count
          ].style.display = "none";
        });

        document.querySelector(".payment").style.display = "block";
        // Use a closure to capture the current index
        document
          .querySelector(".payment button")
          .addEventListener("click", () => {
            pay(vid, code);
          });
      });
    }
  });
}

//Pay function
function pay(vid, code) {
  data.phone = document.getElementById("mobile").value;

  if (!data.phone) {
    swal("", "Please enter your phone number", "warning");
    return;
  }

  if (!data.provider) {
    swal("", "Please select a provider", "warning");
    return;
  }

  data.action = "pay";
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  document.getElementById("loadingMessage").style.display = "block";

  axios
    .post("../pawapay/process-pawapay.php", formData)
    .then(function (res) {
      console.log("Pay Response:", res.data.response); // Debugging
      const credit = res.data;

      if (!credit.error) {
        if (credit.response && credit.response.status === "ACCEPTED") {
          checkStatus(credit.response.depositId, vid, code);
        } else if (credit.response && credit.response.status === "REJECTED") {
          swal("", "Payment Rejected", "error");
          document.getElementById("loadingMessage").style.display = "none";
        } else {
          swal("ERROR", "Unexpected response structure", "error");
          document.getElementById("loadingMessage").style.display = "none";
        }
      } else {
        swal("ERROR", credit.error, "error");
        document.getElementById("loadingMessage").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Payment error:", error);
    });
}

//check Status Function
function checkStatus(id, vid, code) {
  data.action = "get-status";
  data.id = id;
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  axios
    .post("../pawapay/process-pawapay.php", formData)
    .then(function (res) {
      console.log("Get Response:", res.data[0]); // Debugging
      if (res.data[0].status == "COMPLETED") {
        //if payment was successful by pawapay
        fetch("../pawapay/add-transaction.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res.data[0]),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status == "success") {
              document.getElementById("loadingMessage").style.display = "none";
              vote(id, vid, code); //vote
            }
          })
          .catch((error) => console.error(error));
      } else if (res.data[0].status == "FAILED") {
        //assumming payment failed
        swal("", "Payment Failed", "error");
        document.getElementById("loadingMessage").style.display = "none";
      } else {
        setTimeout(checkStatus(id, vid, code), 1000); //recheck status
      }
    })
    .catch((error) => {
      console.error("Payment error:", error);
      setTimeout(checkStatus(id, vid, code), 1000); //recheck status
    });
}

// Vote function
function vote(id, vid, code) {
  document.querySelector("#load-" + vid).style.display = "block";
  const csrfToken = document.getElementById("csrf_token").value;
  // console.log(csrfToken);
  const voteData = {
    vid: vid,
    id: id,
    code: code,
    csrf_token: csrfToken,
  };

  //if payment was successful by pawapay
  fetch("../php/generate-token.php", { //token
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voteData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Token:" + data.token);
      if (data.status == "success") {
        fetch("../php/vote-form-pca.php", { //vote
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
          },
          body: JSON.stringify({}),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            if (data.status === "success") {
              document.querySelector("#load-" + vid).style.display = "none";
              swal("", data.message, "success");

              window.setTimeout(function () {
                const url = document.getElementById("url");
                window.location = url.value;
              }, 5000);
            } else {
              //max reached
              swal("", data.message, "error");
              document.querySelector("#load-" + vid).style.display = "none";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    })
    .catch((error) => console.error(error));
}

function lineChart(id) {

  const url = "../dashboard/graph-data.php?code=" + id;

  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      const labels = jsonData.labels;
      const data = jsonData.data;

      // Define colors for up to 8 bars
      const colors = [
        "rgba(255, 99, 132, 0.6)", // Red
        "rgba(75, 192, 192, 0.6)", // Green
        "rgba(54, 162, 235, 0.6)", // Blue
        "rgba(255, 159, 64, 0.6)", // Orange
        "rgba(153, 102, 255, 0.6)", // Purple
        "rgba(255, 206, 86, 0.6)", // Yellow
        "rgba(199, 199, 199, 0.6)", // Gray
        "rgba(83, 102, 255, 0.6)", // Indigo
      ];

      const borderColors = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(199, 199, 199, 1)",
        "rgba(83, 102, 255, 1)",
      ];

      // Get canvas context
      const ctx = document.getElementById(id).getContext("2d");

      // Create chart
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Votes",
              data: data,
              backgroundColor: colors.slice(0, labels.length), // Slice to match the number of labels
              //   borderColor: borderColors.slice(0, labels.length), // Slice to match the number of labels
              borderColor: "rgba(83, 151, 216, 0.6)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}


