<?php
include 'connect.php'; // make sure this contains $conn = new mysqli(...)

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Method Not Allowed.";
    exit();
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($message)) {
    echo "<p style='color:red;'>All fields are required.</p>";
    exit();
}

// Optional: Save the message to the database
$sql = "INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo "<p style='color:green;'>Thank you! Your message has been received.</p>";
    // Optional: Redirect to thank-you or back to contact page
    header("Location: http://localhost/munirbooksstore/frontend/html/contactus.html?success=1");
    exit();
} else {
    echo "<p style='color:red;'>Something went wrong: " . $stmt->error . "</p>";
}

$stmt->close();
$conn->close();
?>
