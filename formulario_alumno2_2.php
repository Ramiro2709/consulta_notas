
<html>
<head>


    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-grid.css" />
    <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
    
    <?php error_reporting(0); ?>
    <link rel="stylesheet" type="text/css" href="datos.css">
    <script type="text/javascript">
        function limpiar(){
                document.getElementById("DNI").value = null;
                document.getElementById("Legajo").value = null;
                document.getElementById("Nombre").innerHTML = "";
                document.getElementById("f_nac").innerHTML = "";
                document.getElementById("sexo").innerHTML = "";
                document.getElementById("curso").innerHTML = "";
                document.getElementById("preceptor").innerHTML = "";
            }
    </script>
<script src="https://cdn.jsdelivr.net/jquery.color-animation/1/mainfile"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<script src="main.js"></script>
</head>
  
<?php
$link = mysql_connect('localhost','root');
mysql_select_db('practica',$link);
$DNI = $_POST['DNI_form_name'];
$query_datos = "SELECT * FROM valumnos WHERE documento=$DNI";
$res_datos = mysql_query($query_datos);

while ( $array_query = mysql_fetch_array($res_datos))
{
    $array_datos['nombre'] = $array_query['alumnon'];
    $array_datos['nac'] =  $array_query['fnacimient'];
    if ($array_query['sexoid'] == 1){
        $array_datos['sexo'] = "Masculino";
    } else {
        $array_datos['sexo'] = "Femeino";
    }
    $array_datos['curso'] = $array_query['curson'];
    $array_datos['pre'] = $array_query['preceptorn'];
}
//echo  $array_datos['nombre'];

?>

<body>
<img src="res/logo.png" class="indu" width="120" height="150">
<div class="container">
    <!--
    <form name="" action="index.html" method="POST" id="formulario">
        <input type="submit" class="botonVolver btn btn-outline-info material-icons flechaVolver" id="botonVolver" value="arrow_back_ios">
    </form>
-->
<form name="" action="index.html" method="POST" id="formulario">
    <button type="submit" class="botonVolver btn btn-outline-info" id="botonVolver">
        <div class="material-icons flechaVolver">arrow_back_ios</div>
    </button>
    <input type="text" hidden id="boton_volver" name="boton_volvern" value="true">
</form>  

        <table class="table table-bordered">
                    <h5>Alumno: <?php echo $array_datos['nombre'] ?></h5>
                     <thead> 
                         <tr>
                             <th>Fecha de nacimiento</th>
                             <th>Sexo</th>
                             <th>Curso</th>
                             <th>Preceptor</th>
                         </tr>
                     </thead>
                     <tbody>
                        <tr id="tabla">
                          <td scope="row" name="f_nac" id="f_nac"> <?php echo $array_datos['nac'] ?></td> 
                          <td scope="row" name="sexo" id="sexo"><?php echo $array_datos['sexo'] ?></td> 
                          <td scope="row" name="curso" id="curso"><?php echo $array_datos['curso'] ?></td>
                          <td scope="row" name="preceptor" id="preceptor"><?php echo $array_datos['pre'] ?></td>
                          </tr>
                     </tbody>
        </table><br>
</div>
</body>
</html>