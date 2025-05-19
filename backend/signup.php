
<?php
include '../backend/connect.php';// Include database connection
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $phone = $_POST["phone"];
    $age = $_POST["age"];
    $city = $_POST["city"];
    $dob = $_POST["dob"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hashing password

    // Handling file upload
    $photo_name = $_FILES["photo"]["name"];
    $photo_tmp_name = $_FILES["photo"]["tmp_name"];
    $photo_folder = "../uploads/" . $photo_name;

    if (move_uploaded_file($photo_tmp_name, $photo_folder)) {
        $photo_path = $photo_folder;
    } else {
        die("Failed to upload image.");
    }

    // Insert user data into database
    $sql = "INSERT INTO signup (name, email, address, phone, age, city, DOB, photo, password) 
            VALUES ('$name', '$email', '$address', '$phone', '$age', '$city', '$dob', '$photo_path', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Account created successfully!'); window.location.href='/frontend/login.html';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>