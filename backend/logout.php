<?php
session_start();
include 'connect.php';
session_start();
session_unset();
session_destroy();

header("Location: http://localhost/munirbooksstore/frontend/html/login.html");
exit();
?>
