<?php
include '../backend/connect.php'; // Ensure correct path

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Validate POST method
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Invalid request method. Use POST."]);
    exit;
}

// Required fields
$required_fields = ["name", "email", "address", "phone", "age", "DOB", "password"];
foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
        header('Content-Type: application/json');
        echo json_encode(["status" => "error", "message" => "Missing required field: $field"]);
        exit;
    }
}

// Check DB connection
if (!$conn) {
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit;
}

// Clean and hash input
$name = trim($_POST["name"]);
$email = strtolower(trim($_POST["email"]));
$address = trim($_POST["address"]);
$phone = trim($_POST["phone"]);
$age = trim($_POST["age"]);
$dob = trim($_POST["DOB"]);
$password = password_hash(trim($_POST["password"]), PASSWORD_DEFAULT);

// Insert
$sql = "INSERT INTO signup (name, email, address, phone, age, DOB, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "SQL prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("sssssss", $name, $email, $address, $phone, $age, $dob, $password);

if ($stmt->execute()) {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "success",
        "message" => "Account created successfully!",
        "redirect" => "/munirbooksstore/frontend/login.html"
    ]);
} else {
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Signup failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
