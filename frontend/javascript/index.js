document.addEventListener("DOMContentLoaded", () => {
    // Handle search functionality
    const searchBox = document.getElementById("serachBox");
    const browseButton = document.getElementById("browserBooks");

    browseButton.addEventListener("click", () => {
        const query = searchBox.value.trim();
        if (query !== "") {
            alert(`Searching for: ${query}`);
            // Implement actual search functionality here (like an API request)
        } else {
            alert("Please enter a book title or keyword.");
        }
    });

    // Load more books feature
    const loadMoreButton = document.getElementById("load_more");

    loadMoreButton?.addEventListener("click", () => {
        alert("Loading more books...");
        // Expand book list dynamically
    });

    // Highlight navigation links on hover
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#ff6600";
        });
        link.addEventListener("mouseout", () => {
            link.style.color = ""; // Reset to default color
        });
    });

    // Enhance testimonial section with random quotes
    const testimonials = document.querySelectorAll(".textimonial_reviews div");
    testimonials.forEach(testimonial => {
        testimonial.addEventListener("click", () => {
            alert(`Customer says: ${testimonial.querySelector("p").textContent}`);
        });
    });

    // Simulated payment method interaction
    document.querySelector(".payment_method")?.addEventListener("click", () => {
        alert("Payment methods will be activated soon!");
    });
});