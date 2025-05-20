// Selecting form fields
let nameEl = document.querySelector("#name");
let emailEl = document.querySelector("#email");
let passwordEl = document.querySelector("#password");
let phoneEl = document.querySelector("#phone");
let signupEl = document.querySelector("#signup");
let loginEl = document.querySelector("#login");
let signupForm = document.querySelector("#signupForm"); // Ensure correct form reference

let signupSection = document.querySelector("#signupSection");
let loginSection = document.querySelector("#loginSection");
let signupswitchingtologininterface = document.querySelector(
  "#signupswitchingtologininterface"
);
let loginswitchingtosignupinterface = document.querySelector(
  "#loginswitchingtosignupinterface"
);

// Toggle between signup & login
signupswitchingtologininterface.addEventListener("click", () => {
  signupSection.style.display = "none";
  loginSection.style.display = "block";
});

loginswitchingtosignupinterface.addEventListener("click", () => {
  loginSection.style.display = "none";
  signupSection.style.display = "block";
});

// Signup validation & form submission
signupEl.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form behavior

  if (
    nameEl.value.trim() === "" ||
    emailEl.value.trim() === "" ||
    passwordEl.value.trim() === "" ||
    phoneEl.value.trim() === ""
  ) {
    alert("Complete all required fields");
    return;
  }

  let formData = new FormData(signupForm); // Ensure correct form reference

  try {
    let response = await fetch("../backend/signup.php", {
      method: "POST",
      body: formData,
    });

    let result = await response.text();
    alert(result);
    signupForm.reset(); // Clears the form after submission
  } catch (error) {
    alert("Signup failed. Please try again.");
  }
});
