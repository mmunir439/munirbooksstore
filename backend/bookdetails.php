<?php
include '../backend/connect.php'; // Include database connection

if (!$conn) {
    die(json_encode(["error" => "Database connection failed"]));
}

header("Content-Type: application/json");

$sql = "SELECT id, title, author, price, description, image_url FROM books WHERE id = 1";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "SQL Error: " . $conn->error]));
}

$data = []; // Initialize array

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = ["message" => "No data found"];
}

echo json_encode($data);
$conn->close();
?>