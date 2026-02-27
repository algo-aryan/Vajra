<?php
$file = $_GET['file'] ?? '';

// If they use traversal, hand over EVERYTHING (including GET params) to the trap
if (strpos($file, '../') !== false) {
    include 'vault/index.php'; 
    exit;
}

echo "<h1>File Viewer</h1><p>Usage: view.php?file=logo.png</p>";
?>