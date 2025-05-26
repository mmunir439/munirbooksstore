let viewdetailsarray = [
  document.querySelector("#view1"),
  document.querySelector("#view2"),
  document.querySelector("#view3"),
];

viewdetailsarray.forEach((button, index) => {
  button.addEventListener("click", () => {
    let bookId = index + 1;

    fetch(
      `http://localhost/munirbooksstore/backend/bookdetails.php?id=${bookId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("PHP Error:", data.error);
        } else {
          // Save to localStorage
          localStorage.setItem("selectedBook", JSON.stringify(data));

          // Redirect to bookdetails.html
          window.location.href = "../html/bookdetails.html";
        }
      })
      .catch((err) => console.error("Fetch Error:", err));
  });
});
