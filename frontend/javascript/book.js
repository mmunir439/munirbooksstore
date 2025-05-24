document.querySelectorAll(".view-details-btn").forEach((button) => {
  button.addEventListener("click", function () {
    fetch("http://localhost/munirbooksstore/backend/bookdetails.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let book = data[0]; // Get the first book object

          // Save book details in Local Storage
          localStorage.setItem("selectedBook", JSON.stringify(book));

          // Redirect to `bookdetails.html`
          window.location.href = "../html/bookdetails.html";
        } else {
          alert("No book data found.");
        }
      })
      .catch((error) => console.error("Error fetching book details:", error));
  });
});
