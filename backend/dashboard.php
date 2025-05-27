<?php
session_start();
include 'connect.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: http://localhost/munirbooksstore/frontend/html/login.html");
    exit();
}

$user_name = $_SESSION['user_name'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>User Dashboard</title>
</head>
<body>
  <h1>Welcome, <?php echo htmlspecialchars($user_name); ?>!</h1>
  <p>You are logged in successfully.</p>
  <a href="http://localhost/munirbooksstore/backend/logout.php">Logout</a>
</body>
</html>
