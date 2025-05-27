<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'loggedIn' => true,
        'user_name' => $_SESSION['user_name'],  // Use same key as in frontend JS
        // you can add more user info here if needed
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>
