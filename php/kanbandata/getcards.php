<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";   
$dbname = "kanbanboard";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetching specific columns from the kanbandata table
$sql = "SELECT id, title, content, date, status FROM kanbandata";
$result = $conn->query($sql);

$cards = [];

if ($result) {
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $cards[] = $row;
        }
    } else {
        echo json_encode(['message' => 'No records found']);
        $conn->close();
        exit;
    }
} else {
    echo json_encode(['error' => 'Query error: ' . $conn->error]);
    $conn->close();
    exit;
}

$conn->close();

echo json_encode($cards);
?>
