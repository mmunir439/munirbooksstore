<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    $profile_image = null;

    if (isset($_SESSION['profile_image']) && $_SESSION['profile_image']) {
        if (strpos($_SESSION['profile_image'], 'uploads/') === 0) {
            // Already has uploads/ prefix, just prepend base URL
            $profile_image = "http://localhost/munirbooksstore/" . $_SESSION['profile_image'];
        } else {
            // Just a filename, add uploads/ folder
            $profile_image = "http://localhost/munirbooksstore/uploads/" . $_SESSION['profile_image'];
        }
    }

    echo json_encode([
        'loggedIn' => true,
        'user_name' => $_SESSION['user_name'],
        'profile_image' => $profile_image
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}

?>