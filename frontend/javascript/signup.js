// Selecting form fields
let nameEl = document.querySelector("#name");
let emailEl = document.querySelector("#email");
let passwordEl = document.querySelector("#password");
let phoneEl = document.querySelector("#phone");
let signupEl = document.querySelector("#signup");
let signupForm = document.querySelector("#signupForm"); // Ensure correct form reference

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

  let formData = new FormData(signupForm); // Correct form reference

  try {
    let response = await fetch("../backend/signup.php", {
      method: "POST",
      body: formData,
    });

    let result = await response.json(); // ✅ Convert response to JSON

    alert(result.message); // Show success or error message

    if (result.status === "success" && result.redirect) {
      window.location.href = result.redirect; // ✅ Redirect to login page
    }

    signupForm.reset(); // Clears the form after submission
  } catch (error) {
    alert("Signup failed. Please try again.");
  }
});
