document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signupForm");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = signupForm.querySelector("#name").value.trim();
    const email = signupForm.querySelector("#email").value.trim();
    const address = signupForm.querySelector("#address").value.trim();
    const phone = signupForm.querySelector("#phone").value.trim();
    const age = signupForm.querySelector("#age").value.trim();
    const dob = signupForm.querySelector("#DOB").value.trim();
    const password = signupForm.querySelector("#password").value.trim();

    if (!name || !email || !address || !phone || !age || !dob || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData(signupForm);

    try {
      const response = await fetch("/munirbooksstore/backend/signup.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      alert(result.message);

      if (result.status === "success" && result.redirect) {
        window.location.href = result.redirect;
      }

      signupForm.reset();
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again later.");
    }
  });
});
