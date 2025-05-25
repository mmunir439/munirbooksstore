document.addEventListener("DOMContentLoaded", () => {
  const bookData = localStorage.getItem("selectedBook");

  if (!bookData) {
    console.error("No book data found in localStorage.");
    document.querySelector(".book-container").innerHTML =
      "<p>Error: No book data available.</p>";
    return;
  }

  const book = JSON.parse(bookData);

  document.getElementById("bookImage").src = book.image_url || "default.jpg";
  document.getElementById("bookTitle").textContent = `Title: ${
    book.title || "N/A"
  }`;
  document.getElementById("bookAuthor").textContent = `Author: ${
    book.author || "Unknown"
  }`;
  document.getElementById("bookPrice").textContent = `Price: ${
    book.price || "Not listed"
  }`;
  document.getElementById("bookDescription").textContent =
    book.description || "No description available.";
});
