<?php
include_once 'koneksi.php';

$oldUname = $_POST['currentUsername'];
$uname = $_POST['newUsername'];
$nama = $_POST['nama'];
$password = $_POST['password'];

$query = "UPDATE player SET nama='$nama', password='$password', username='$uname' WHERE username='$oldUname'";

$msg = $query;
if (mysqli_query($conn, $query)) {
    $msg = 'success';
}

echo $msg;