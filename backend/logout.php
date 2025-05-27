<?php
session_start();
session_unset();
session_destroy();
header("Location: http://localhost/munirbooksstore/frontend/html/index.html");
exit();
