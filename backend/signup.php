<?php
include '../backend/connect.php'; // Include database connection

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check request method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die(json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]));
}

// Validate required fields
$required_fields = ["name", "email", "address", "phone", "age", "DOB", "password"];
foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
        die(json_encode(["status" => "error", "message" => "Missing required field: $field"]));
    }
}

// Check database connection
if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Database connection failed."]));
}

// Securely retrieve input values
$name = trim($_POST["name"]);
$email = strtolower(trim($_POST["email"])); // Ensure formatting
$address = trim($_POST["address"]);
$phone = trim($_POST["phone"]);
$age = trim($_POST["age"]);
$dob = trim($_POST["DOB"]);
$password = password_hash(trim($_POST["password"]), PASSWORD_DEFAULT); // Hash password

// Debugging: Check if email is correctly received
error_log("Received Email: " . $email);

// Prepare SQL statement to insert data securely
$sql = "INSERT INTO signup (name, email, address, phone, age, DOB, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $name, $email, $address, $phone, $age, $dob, $password);

// Execute the query safely
if ($stmt->execute()) {
    $response = [
        "status" => "success",
        "message" => "Account created successfully!",
        "redirect" => "../frontend/html/login.html"
    ];
    header('Content-Type: application/json'); // ✅ Ensure JSON response format
    echo json_encode($response);
    exit; // ✅ Stops further execution after sending JSON
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Signup failed. " . $conn->error
    ]);
}

// Close connections
$stmt->close();
$conn->close();
?>