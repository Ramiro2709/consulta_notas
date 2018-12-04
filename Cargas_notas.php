<!--
Cambios 1 Ramiro
$DNI ahora recibe un POST desde el index

Lucas
puse alumnon entre ''

Ramiro 2
Si no existe el DNI ($id_alumno_array == null) tira un alert rancio  y no se cargan las notas, falta hacer que no pueda entrar al menu

Ramiro 3
Agrege jquery que solo llama funcion de cargar el menu si encuentra un alumno

Ramrio 4
Ahora agrega los datos a varaibles de Jquery, falta hacer foreach que agrege los notas
a array del jquery
-->

<head>
    <!--
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap-grid.css" />
    <script type="text/javascript" src="jquery-3.3.1.min.js"></script>
    -->
</head>
<?php
session_start();
//// **** Conecxion con base de datos "datos_alumnos"
include "Conexion_base.php";
//// **** Toma el DNI ingresado por el POST desde el html
$DNI = $_POST['DNI'];
$Legajo = $_POST['Legajo'];

$_SESSION['DNI'] = $DNI;
$_SESSION['Legajo'] = $Legajo;

//$DNI = 42915333;
//44955487
//42915333

//// **** Consulta, obtiene id del alumno en base a DNI ingresado
$id_alumno = mysql_query("SELECT id,alumnon,curson FROM valumnos WHERE documento=$DNI AND legajo=$Legajo", $link);
//// **** Covierte el id alumno a array
$id_alumno_array = mysql_fetch_array($id_alumno);

if ($id_alumno_array == null) ///////////// Cambio Ramiro 2
{
    echo "<div id='datosPasados_estadoDatos'>false</div>";
    //header("Refresh:0; url=index.html");
    //header("Location: index.html");

} else {
    ///// Cambio Ramiro 3
    echo "<div id='datosPasados_estadoDatos'>true</div>";
    //// **** Consulta notas donde id_alumno
    $notas = mysql_query("SELECT nota1 FROM notas WHERE id_alumno=$id_alumno_array[id]", $link);
    //// **** Consulta materias donde id_alumno
    $materias = mysql_query("SELECT materia FROM notas WHERE id_alumno=$id_alumno_array[id]", $link);
    $i = 0;
    $Nombre_Alumno = $id_alumno_array['alumnon']; //// Muestra el Nombre del alumno
    $Curso_Alumno = $id_alumno_array['curson'];
    echo "
    <script>
        var Nombre_Alumno = '$Nombre_Alumno';
        var Curso_Alumno = '$Curso_Alumno';
        var array_materias = [];
        var array_notas = [];
    ";
    while ($row2 = mysql_fetch_row($notas))
    {
        $row = mysql_fetch_row($materias);
        $count = count($row); //
        $count2 = count($row2);
        $y = 0;
        while ($y < $count2) //
        {
            $array_materias = current($row); //Asigna el row actual de materia
            $array_notas = current($row2); //Asigna el row actual de notas
            echo "array_materias[$i] = '$array_materias';";
            echo "array_notas[$i] = '$array_notas';";
            //echo $array_notas . ";";
            next($row); //
            next($row2);
            $y = $y + 1;
        }
        $i = $i + 1;
    }
    echo "</script>";

    /*
     //Parte que mostraba nombre, curso, y materias
    echo "
        <div id='datosPasados_nombreAlumno'>$Nombre_Alumno</div>
        <div id='datosPasados_cursoAlumno'>$Curso_Alumno</div>
        ";
    echo "<div>";

    //// **** While que muestra en tabla las notas y materias
    while ($row2 = mysql_fetch_row($notas)) //Asigna la nota a row2
    {
        $row = mysql_fetch_row($materias); //Asigna la materia a row
        $count = count($row); //
        $count2 = count($row2);
        $y = 0;
        while ($y < $count2) //
        {
            $array_materias = current($row); //Asigna el row actual de materia
            $array_notas = current($row2); //Asigna el row actual de notas
            echo $array_materias . ",";
            echo $array_notas . ";";
            next($row); //
            next($row2);
            $y = $y + 1;
        }
        $i = $i + 1;
    }
    echo "</div>";
    */
}
?>