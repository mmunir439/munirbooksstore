document.addEventListener("DOMContentLoaded", function () {
    let bookData = localStorage.getItem("selectedBook");

    if (bookData) {
        let book = JSON.parse(bookData);

        // Update HTML elements with book details
        document.querySelector("#bookTitle").textContent = `Title: ${book.title}`;
        document.querySelector("#bookAuthor").textContent = `Author: ${book.author}`;
        document.querySelector("#bookPrice").textContent = `Price: ${book.price}`;
        document.querySelector("#bookDescription").textContent = `Description: ${book.description}`;
        document.querySelector("#bookImage").src = book.image_url;
        document.querySelector("#bookImage").alt = book.title;
    } else {
        alert("No book data found.");
    }
});