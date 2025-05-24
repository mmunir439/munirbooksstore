var viewdetails = document.querySelector("#btn");
viewdetails.addEventListener("click", function () {
  fetch("http://localhost/online_book_storeee/backend/bookdetails.php")
    .then((response) => {
      console.log("Raw Response:", response);
      return response.json();
    })
    .then((data) => console.log("Parsed JSON:", data))
    .catch((error) => console.error("Error:", error));
});
