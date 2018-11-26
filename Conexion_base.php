<?php
    
    $link = mysql_connect('localhost','root') or die ("DB Connection Error"); 
    mysql_select_db('practica',$link) or die ("DB Error");

    //Cambio Sergio ---- Verificacion comillas 
    foreach( $_GET as $variable => $valor ){ 
        $_GET [ $variable ] = str_replace ( "'" , "'" , $_GET [ $variable ]); 
        } 
    foreach( $_POST as $variable => $valor ){ 
        $_POST [ $variable ] = str_replace ( "'" , "'" , $_POST [ $variable ]); 
        }

        //Verificacion de entrada del usuario (archivo de carga - consulta dni)
        /*
        if ( $_POST ) { 
            $pdo = new PDO ( 'mysql:practica=test;host=localhost' , 'root' , '' ); 
            $params = []; 
            $setStr = "" ; 
               foreach ( $_POST as $key => $value ) 
               { 
                   if ( $key != "id" ) 
                   { 
            $setStr .= "` $key ` = : $key ," ; 
                   } 
            $params [ $key ] = $value ; 
           
               } 
            $setStr = rtrim ( $setStr , "," ); 
            $pdo -> prepare ( "UPDATE alumnon SET $Alumno_nombre  WHERE id = :id" )-> execute ( $params ); 
            }
            */
    //$mysqli = new mysqli('localhost','root','','datos_alumnos');
    //$mysqli->select_db("datos_alumnos");
    
?>
