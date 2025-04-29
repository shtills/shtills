<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$file = 'courts.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        echo file_get_contents($file);
    } else {
        echo '[]';
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    file_put_contents($file, $json);
    echo '{"status":"saved"}';
    exit;
}
?>
