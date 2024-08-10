<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root"; // Update with your database username
$password = "";     // Update with your database password
$dbname = "kanbanboard";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["error" => "Invalid input"]);
    exit();
}

$email = $conn->real_escape_string($data['email']);
$password = $conn->real_escape_string($data['password']); // Do not hash the password

// Insert data into the user table
$sql = "INSERT INTO user (email, password) VALUES ('$email', '$password')";

if ($conn->query($sql) === TRUE) {
    // Extract the part before the '@' symbol from the email
    $email_parts = explode('@', $email);
    $email_dbname = $email_parts[0]; // Use the part before the '@' as the database name

    // Sanitize the database name to ensure it follows MySQL naming conventions
    $email_dbname = preg_replace('/[^a-zA-Z0-9_]/', '_', $email_dbname);
    
    $create_db_sql = "CREATE DATABASE `$email_dbname`";
    
    if ($conn->query($create_db_sql) === TRUE) {
        echo json_encode(["success" => "Registration successful and database created"]);
    } else {
        echo json_encode(["error" => "Registration successful, but error creating database: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>
