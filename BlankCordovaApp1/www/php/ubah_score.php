<?php
include_once 'koneksi.php';

$uname = $_POST['username'];
$score = $_POST['score'];

$query = "UPDATE player SET total_score=$score WHERE username='$uname'";

$msg = $query;
if (mysqli_query($conn, $query)) {
    $msg = 'success';
}

echo $msg;