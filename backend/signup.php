<?php
session_start();
include 'connect.php';

// Get form data safely
$name     = $_POST['name'] ?? '';
$email    = $_POST['email'] ?? '';
$address  = $_POST['address'] ?? '';
$phone    = $_POST['phone'] ?? '';
$age      = $_POST['age'] ?? null;
$dob      = $_POST['DOB'] ?? '';
$password = $_POST['password'] ?? '';
$profileImage = $_FILES['profile_image'];
$targetDir = "../uploads/";
$targetFile = $targetDir . basename($profileImage["name"]);
$imageType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Upload profile image
if (!move_uploaded_file($profileImage["tmp_name"], $targetFile)) {
    echo "Failed to upload profile image.";
    exit();
}

// Hash password securely
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert user into DB
$sql = "INSERT INTO signup (name, email, address, phone, age, dob, password, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssisss", $name, $email, $address, $phone, $age, $dob, $hashed_password, $targetFile);

if ($stmt->execute()) {
    // Set session variables to log user in immediately
    $_SESSION['user_id'] = $stmt->insert_id; // last inserted user id
    $_SESSION['user_name'] = $name;
    $_SESSION['profile_image'] = $targetFile;

    // Redirect to home page (html)
    header("Location: http://localhost/munirbooksstore/frontend/html/index.html");
    exit();
} else {
    echo "Signup failed: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
