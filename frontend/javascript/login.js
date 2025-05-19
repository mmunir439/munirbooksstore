// Selecting input fields
let emailEl = document.querySelector("#email");
let passwordEl = document.querySelector("#password");
let loginEl = document.querySelector("#login");

// Clear input fields on page load
window.onload = () => {
  emailEl.value = "";
  passwordEl.value = "";
};

// Login event listener
loginEl.addEventListener("click", (event) => {
  event.preventDefault(); // Prevents form submission for validation

  if (emailEl.value.trim() === "" || passwordEl.value.trim() === "") {
    alert("Please fill in all fields");
  } else if (
    emailEl.value === "example@email.com" &&
    passwordEl.value === "Example123"
  ) {
    alert("Login successful!");
    clearInputs();
  } else {
    alert("Invalid email or password. Try again.");
    clearInputs();
  }
});

// Function to clear inputs after login attempt
let clearInputs = () => {
  emailEl.value = "";
  passwordEl.value = "";
};
