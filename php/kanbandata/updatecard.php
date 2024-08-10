<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";   
$dbname = "kanbanboard";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !isset($data['status'])) {
    echo json_encode(['error' => 'Invalid input']);
    $conn->close();
    exit;
}

$id = $data['id'];
$status = $data['status'];

// Validate status
$validStatuses = ['todo', 'in-progress', 'done'];
if (!in_array($status, $validStatuses)) {
    echo json_encode(['error' => 'Invalid status']);
    $conn->close();
    exit;
}

// Remove card from all tables
$tables = ['todo', 'in-progress', 'done'];
foreach ($tables as $table) {
    $sql = "DELETE FROM $table WHERE actid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $stmt->close();
}

// Insert card into the new table
$sql = "INSERT INTO $status (actid, actname, actdes, actdate) SELECT actid, actname, actdes, actdate FROM todo WHERE actid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Update failed']);
}

$stmt->close();
$conn->close();
?>
