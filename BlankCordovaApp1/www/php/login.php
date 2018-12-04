<?php
include_once "koneksi.php";

$uname = $_POST['username'];
$password = $_POST['password'];

$query = "SELECT * FROM player WHERE username='$uname' AND password='$password'";
$login = mysqli_query($conn, $query);
$ketemu = mysqli_num_rows($login);
$r = mysqli_fetch_array($login);

if ($ketemu > 0) {
    $obj = new stdClass();  
    $obj->nama = $r['nama'];
    $obj->username = $r['username'];
    $obj->password = $r['password'];
    $obj->score = $r['total_score'];
    session_start();
    $_SESSION['p_nama'] = $r['nama'];
    $_SESSION['p_username'] = $r['username'];
    $_SESSION['p_password'] = $r['password'];
    $_SESSION['p_score'] = $r['total_score'];

    echo json_encode($obj);
} else {

    echo 'invalid';
}