<?php
session_start();
include 'connect.php'; // Make sure this connects to your DB

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Method Not Allowed.";
    exit();
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Check for empty inputs
if (empty($email) || empty($password)) {
    echo "<p style='color:red;'>Please fill in both email and password.</p>";
    exit();
}

// Query the database for user info
$sql = "SELECT user_id, name, password, profile_image FROM signup WHERE email = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Database error: " . $conn->error;
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        // Password is correct, set session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['profile_image'] = $user['profile_image']; // Add image to session

        // Redirect to homepage or dashboard
        header("Location: http://localhost/munirbooksstore/frontend/html/index.html");
        exit();
    } else {
        echo "<p style='color:red;'>Incorrect password.</p>";
    }
} else {
    echo "<p style='color:red;'>Email not found.</p>";
}

$stmt->close();
$conn->close();
?>
