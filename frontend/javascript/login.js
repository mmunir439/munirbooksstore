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
  event.preventDefault(); // Prevent default form behavior

  if (emailEl.value.trim() === "" || passwordEl.value.trim() === "") {
    alert("Please fill in all fields");
    return;
  }

  let formData = new URLSearchParams();
  formData.append("email", emailEl.value);
  formData.append("password", passwordEl.value);

  try {
    let response = await fetch(
      "http://localhost/munirbooksstore/backend/login.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    let result = await response.json(); // Convert response to JSON
    console.log("Server Response:", result); // Debugging output

    if (result.status === "success") {
      alert(result.message);
      window.location.href = "../frontend/html/index.html"; // Redirect after login
    } else {
      alert(result.message); // Show backend error response
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Network error. Please check console.");
  }
});
