<?php
include '../backend/connect.php'; // Include database connection

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if form submission is working
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Error: Invalid request method.");
}

// Debugging: Print received data
echo "<pre>";
print_r($_POST);
echo "</pre>";

// Validate required fields
$required_fields = ["name", "email", "address", "phone", "age", "DOB", "password"];
foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty($_POST[$field])) {
        die("Error: Required fields are missing - " . $field);
    }
}

// Database connection check
if (!$conn) {
    die("Error: Database connection failed.");
}

// Secure password hashing
$name = $_POST["name"];
$email = $_POST["email"];
$address = $_POST["address"];
$phone = $_POST["phone"];
$age = $_POST["age"];
$dob = $_POST["DOB"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

// Insert user data into the database (Removing `photo` column)
$sql = "INSERT INTO signup (name, email, address, phone, age, DOB, password) 
        VALUES ('$name', '$email', '$address', '$phone', '$age', '$dob', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Account created successfully!'); window.location.href='../frontend/html/login.html';</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>