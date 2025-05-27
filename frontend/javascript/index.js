let viewdetailsarray = [
  document.querySelector("#view1"),
  document.querySelector("#view2"),
  document.querySelector("#view3"),
  document.querySelector("#view4"),
  document.querySelector("#view5"),
];
viewdetailsarray.forEach((button, index) => {
  button.addEventListener("click", () => {
    const bookId = index + 4;

    fetch(`http://localhost/munirbooksstore/backend/index.php?id=${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error);
        } else {
          localStorage.setItem("selectedBook", JSON.stringify(data));
          window.location.href = "../html/bookdetails.html";
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  });
});
document.getElementById("browseBooks").addEventListener("click", () => {
  const enterbooks = document.getElementById("enterbooks");
  const query = document.getElementById("searchBox").value.trim();

  if (!query) {
    enterbooks.style.display = "block";
    return;
  } else {
    enterbooks.style.display = "none";
  }

  fetch(
    `http://localhost/munirbooksstore/backend/searchbooks.php?title=${encodeURIComponent(
      query
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("searchResults");
      container.innerHTML = ""; // Clear previous results

      if (data.length === 0) {
        container.innerHTML = "<p>No books found.</p>";
        return;
      }

      data.forEach((book, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${book.image_url}" alt="${book.title}" />
          <h2>${book.title}</h2>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Price:</strong> Rs.${book.price}</p>
          <p>${book.description}</p>
          <button onclick="viewDetails(${book.id})">View Details</button>
        `;

        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Search error:", err));
});

// For "View Details" inside search result
function viewDetails(bookId) {
  fetch(`http://localhost/munirbooksstore/backend/index.php?id=${bookId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert("Book not found");
      } else {
        localStorage.setItem("selectedBook", JSON.stringify(data));
        window.location.href = "../html/bookdetails.html";
      }
    })
    .catch((err) => console.error("Detail fetch error:", err));
}
//fetching data from database to show profile icon
async function fetchAndShowUser() {
  try {
    const res = await fetch(
      "http://localhost/munirbooksstore/backend/check_session.php",
      {
        credentials: "include",
      }
    );
    const data = await res.json();

    const userMenuContainer = document.getElementById("userMenuContainer");

    if (data.loggedIn) {
      // Replace Register link with user name and photo (use placeholder photo if none)
      userMenuContainer.innerHTML = `
        <a href="#" id="userMenuTrigger" style="cursor:pointer; display:flex; align-items:center; gap:8px;">
          <img src="${
            data.profile_image ||
            "http://localhost/munirbooksstore/frontend/images/default-user.png"
          }" 
            alt="User Photo" 
            style="width:30px; height:30px; border-radius:50%; object-fit:cover;"/>
            </a>
            `;
      // <span>${data.user_name}</span>

      // When user clicks the name/photo, show popup with details
      document
        .getElementById("userMenuTrigger")
        .addEventListener("click", (e) => {
          e.preventDefault();
          showUserPopup(data);
        });
    } else {
      // Not logged in - show Register link
      userMenuContainer.innerHTML = `<a href="http://localhost/munirbooksstore/frontend/html/signup.html" id="registerLink">Register</a>`;
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
  }
}

function showUserPopup(userData) {
  document.getElementById("popupUserPhoto").src =
    userData.profile_image ||
    "http://localhost/munirbooksstore/frontend/images/default-user.png";
  document.getElementById("popupUserName").textContent =
    userData.user_name || "No Name";
  document.getElementById("popupUserAge").textContent = userData.age
    ? `Age: ${userData.age}`
    : "";
  document.getElementById("popupUserEmail").textContent = userData.email || "";

  const popup = document.getElementById("userPopup");
  popup.style.display = "block";

  // Close button
  document.getElementById("closeUserPopup").onclick = () => {
    popup.style.display = "none";
  };
}

document.addEventListener("DOMContentLoaded", fetchAndShowUser);
