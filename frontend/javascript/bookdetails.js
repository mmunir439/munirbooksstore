document.addEventListener("DOMContentLoaded", () => {
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  if (!book) return;

  document.getElementById("bookImage").src = book.image_url;
  document.getElementById("bookTitle").textContent = book.title;
  document.getElementById("bookAuthor").textContent = "Author: " + book.author;
  document.getElementById("bookPrice").textContent = "Price: Rs." + book.price;
  document.getElementById("bookDescription").textContent = book.description;

  const addToCartBtn = document.getElementById("addToCartBtn");
  const paymentSelect = document.getElementById("paymentSelect");
  const quantityInput = document.getElementById("quantityInput");
  const paymentNumber = document.getElementById("paymentNumber");
  const paymentError = document.getElementById("paymentError");
  const successMessage = document.getElementById("successMessage");

  const paymentNumbers = {
    easypaisa: "0300-1234567",
    jazzcash: "0311-7654321",
    hbl: "0321-1122334",
    hblkonnect: "0333-5566778",
  };

  paymentSelect.addEventListener("change", () => {
    const selected = paymentSelect.value;
    paymentNumber.textContent = paymentNumbers[selected] || "";
    paymentError.style.display = "none";
  });

  addToCartBtn.addEventListener("click", () => {
    const selectedPayment = paymentSelect.value;
    const quantity = parseInt(quantityInput.value, 10);

    if (!selectedPayment) {
      paymentError.textContent = "Please select a payment method.";
      paymentError.style.display = "block";
      return;
    }

    if (isNaN(quantity) || quantity < 1) {
      paymentError.textContent = "Please enter a valid quantity (1 or more).";
      paymentError.style.display = "block";
      return;
    }

    paymentError.style.display = "none";

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.some((order) => order.id === book.id)) {
      paymentError.textContent = "This book is already in your orders.";
      paymentError.style.display = "block";
      return;
    }

    orders.push({
      ...book,
      status: "Pending",
      paymentMethod: selectedPayment,
      quantity: quantity,
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    successMessage.textContent = `You have successfully ordered ${quantity} book(s) with payment method: ${selectedPayment}. Please send payment to: ${paymentNumbers[selectedPayment]}`;
    successMessage.style.display = "block";

    setTimeout(() => {
      successMessage.style.display = "none";
    }, 6000);
  });
});
