<?php
session_start();
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Method Not Allowed.";
    exit();
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo "<p style='color:red;'>Please fill in both email and password.</p>";
    exit();
}

$sql = "SELECT user_id, name, password FROM signup WHERE email = ?";
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
        // Password correct, set session
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['user_name'] = $user['name'];

        // Redirect to dashboard.php (not .html)
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
