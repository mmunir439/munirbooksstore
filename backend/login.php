<?php
session_start(); // Start session for authentication
include '../backend/connect.php'; // Include database connection

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Error: Invalid request method. Please submit the form correctly.");
}

// Retrieve user input
$email = trim($_POST["email"]);
$password = trim($_POST["password"]);

// Validate inputs
if (empty($email) || empty($password)) {
    die("Error: Please fill in all fields.");
}

// Prepare SQL query to check if the email exists
$sql = "SELECT * FROM signup WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if the user exists
if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Verify password
    if (password_verify($password, $row["password"])) {
        $_SESSION["user"] = !empty($row["name"]) ? $row["name"] : $row["email"]; // Store session
        
        echo "Login successful!";
        exit();
    } else {
        die("Error: Incorrect password. Please try again.");
    }
} else {
    die("Error: No account found with this email.");
}

// Close database connection
$stmt->close();
$conn->close();
?>