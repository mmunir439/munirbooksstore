<?php
include '../backend/connect.php'; // Database connection

// Enable error reporting (for debugging)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response type to JSON
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
    exit;
}

// Check if email and password are sent
if (empty($_POST["email"]) || empty($_POST["password"])) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit;
}

// Retrieve email and password from form
$email = strtolower(trim($_POST["email"]));
$password = trim($_POST["password"]);

// Connect check
if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}

// Prepare SQL to find user by email
$sql = "SELECT * FROM signup WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

// If user found
if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    $storedHash = $user['password'];

    // DEBUG LOGS (Optional: View in XAMPP or Apache error log)
    error_log("Entered Password: $password");
    error_log("Stored Hash: $storedHash");

    // Check password using password_verify
    if (password_verify($password, $storedHash)) {
        echo json_encode([
            "status" => "success",
            "message" => "Login successful!",
            "redirect" => "../frontend/html/index.html"
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Email not found."]);
}

// Close connections
$stmt->close();
$conn->close();
?>
