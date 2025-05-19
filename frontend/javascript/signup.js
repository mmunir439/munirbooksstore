let nameEl = document.querySelector("#name");
let emailEl = document.querySelector("#email");
let passwordEl = document.querySelector("#password");
let phoneEl = document.querySelector("#phone");
let signupEl = document.querySelector("#signup");
let loginEl = document.querySelector("#login");
let signupSection = document.querySelector("#signupSection");
let loginSection = document.querySelector("#loginSection");
let signupswitchingtologininterface = document.querySelector("#signupswitchingtologininterface");
let loginswitchingtosignupterface = document.querySelector("#loginswitchingtosignupterface");

// Toggle between signup & login
signupswitchingtologininterface.addEventListener("click", () => {
  signupSection.style.display = "none";
  loginSection.style.display = "block";
});

loginswitchingtosignupterface.addEventListener("click", () => {
  loginSection.style.display = "none";
  signupSection.style.display = "block";
});

// Signup validation
signupEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (nameEl.value.trim() === "" || emailEl.value.trim() === "" || passwordEl.value.trim() === "" || phoneEl.value.trim() === "") {
    alert("Complete all required fields");
  } else {
    alert("Account created successfully!");
    clearInputs();
  }
});

// Login validation
loginEl.addEventListener("click", (event) => {
  event.preventDefault();
  if (emailEl.value === "example@email.com" && passwordEl.value === "Example123") {
    alert("Login successful!");
    clearInputs();
  } else {
    alert("Invalid email or password. Try again.");
  }
});

// Function to clear input fields
let clearInputs = () => {
  document.querySelectorAll("input").forEach(input => input.value = "");
};