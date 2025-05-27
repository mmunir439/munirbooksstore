<?php
session_start();
include 'connect.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: http://localhost/munirbooksstore/frontend/html/login.html");
    exit();
}

$user_name = $_SESSION['user_name'];
$profile_image = isset($_SESSION['profile_image']) && $_SESSION['profile_image']
    ? "http://localhost/munirbooksstore/uploads/" . $_SESSION['profile_image']
    : null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>User Dashboard</title>
</head>
<body>
  <h1>Welcome, <?php echo htmlspecialchars($user_name); ?>!</h1>
  <img 
    src="<?php echo htmlspecialchars($profile_image ? $profile_image : 'http://localhost/munirbooksstore/frontend/images/default-user.png'); ?>" 
    alt="User Profile Image" 
    style="width: 400px; height: 400px; border-radius: 50%; object-fit: cover;">

  <p>You are logged in successfully.</p>
  <a href="http://localhost/munirbooksstore/backend/logout.php">Logout</a>
</body>
</html>
