browseButton.addEventListener("click", () => {
  const query = searchBox.value.trim().toLowerCase();
  console.log(`Search Query: "${query}"`); // Debugging log

  if (query !== "") {
    let found = false;
    books.forEach((book) => {
      let bookTitleElement = book.querySelector("a");
      if (bookTitleElement) {
        const bookTitle = bookTitleElement.innerText.trim().toLowerCase();
        console.log(`Checking: '${bookTitle}' vs '${query}'`); // Debugging log

        if (bookTitle.includes(query)) {
          book.style.display = "block";
          found = true;
        } else {
          book.style.display = "none";
        }
      }
    });

    if (!found) {
      alert(`No books found matching "${query}". Showing all books.`);
      books.forEach((book) => (book.style.display = "block"));
    }
  } else {
    books.forEach((book) => (book.style.display = "block")); // Restore all books
  }
});
