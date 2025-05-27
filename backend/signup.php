<?php
include 'connect.php'; // Make sure this exists and connects correctly

// Get data from form
$name     = $_POST['name'] ?? '';
$email    = $_POST['email'] ?? '';
$address  = $_POST['address'] ?? '';
$phone    = $_POST['phone'] ?? '';
$age      = $_POST['age'] ?? '';
$dob      = $_POST['DOB'] ?? '';
$password = $_POST['password'] ?? '';

// Hash password securely
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user
$sql = "INSERT INTO signup (name, email, address, phone, age, dob, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssiss", $name, $email, $address, $phone, $age, $dob, $hashed_password);

if ($stmt->execute()) {
  header("Location: http://localhost/munirbooksstore/frontend/html/login.html");
  exit();
} else {
  echo "Signup failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
