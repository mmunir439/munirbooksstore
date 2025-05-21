document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Handle Search Functionality
  const searchBox = document.getElementById("serachBox");
  const browseButton = document.getElementById("browserBooks");
  const books = document.querySelectorAll(".featured .card");

  browseButton.addEventListener("click", () => {
    const query = searchBox.value.trim().toLowerCase();

    if (query !== "") {
      let found = false; // Track if any book matches
      books.forEach((book) => {
        const bookTitle = book
          .querySelector("a")
          .innerText.trim()
          .toLowerCase();

        if (bookTitle.includes(query)) {
          book.style.display = "block";
          found = true;
        } else {
          book.style.display = "none";
        }
      });

      // Handle case where no book matches the search query
      if (!found) {
        alert(`No books found matching "${query}". Showing all books.`);
        books.forEach((book) => (book.style.display = "block"));
      }
    } else {
      // Restore visibility when search box is empty
      books.forEach((book) => (book.style.display = "block"));
    }
  });

  // 🔹 Handle Book Selection for Details Page
  books.forEach((book) => {
    book.addEventListener("click", (event) => {
      event.preventDefault(); // Stop default link behavior

      let bookDetails = {
        image: book.querySelector("img").src,
        title: book.querySelector("a").innerText.trim(),
        price: book.querySelector("p span:last-child").innerText.trim(),
      };

      sessionStorage.setItem("selectedBook", JSON.stringify(bookDetails));

      window.location.href = "/frontend/html/bookdetails.html"; // Redirect
    });
  });

  // 🔹 Enhance Navigation Interaction
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("mouseover", () => (link.style.color = "#ff6600"));
    link.addEventListener("mouseout", () => (link.style.color = "")); // Reset
  });

  // 🔹 Display Customer Testimonials with Click
  document
    .querySelectorAll(".textimonial_reviews div")
    .forEach((testimonial) => {
      testimonial.addEventListener("click", () => {
        alert(`Customer says: ${testimonial.querySelector("p").textContent}`);
      });
    });

  // 🔹 Payment Method Interaction Simulation
  document.querySelector(".payment_method")?.addEventListener("click", () => {
    alert("Payment methods will be activated soon!");
  });

  // 🔹 Load More Books (Expandable Feature)
  const loadMoreButton = document.getElementById("load_more");
  loadMoreButton?.addEventListener("click", () => {
    alert("Loading more books...");
  });
});
