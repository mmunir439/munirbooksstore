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
loginEl.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevents default form behavior

  if (emailEl.value.trim() === "" || passwordEl.value.trim() === "") {
    alert("Please fill in all fields");
    return;
  }

  let formData = new URLSearchParams(); // Properly format login data
  formData.append("email", emailEl.value);
  formData.append("password", passwordEl.value);

  try {
    let response = await fetch("http://localhost/online_book_storeee/backend/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    let result = await response.text();

    console.log("Server Response:", result); // Debugging output

    alert(result); // Display exact PHP response

    // Ensure correct match with response string for redirect
    if (result.includes("Login successful!")) {
      window.location.href = "../frontend/html/index.html"; // Redirect after login
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login failed. Please try again.");
  }
});