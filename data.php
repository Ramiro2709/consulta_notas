<html>
<?php
/* Conectar a una base de datos de MySQL invocando al controlador */
$dsn = 'mysql:dbname=testdb;host=127.0.0.1';
$usuario = 'usuario_bd';
$contraseña = 'contraseña_bd';

try {
    $gbd = new PDO($dsn, $usuario, $contraseña);
} catch (PDOException $e) {
    echo 'Falló la conexión: ' . $e->getMessage();
}
?>
</html>
