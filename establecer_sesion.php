<?php
session_start();
$_SESSION['DNI'] = $_POST['DNI'];
echo $_SESSION['DNI'];

?>