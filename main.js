/*

Cambios 1.1 Ramiro
Menu_notas click carga "Cargas_notas.php" Que envia un POST "DNI" con el valor del input del DNI

Lucas
Actualice "#notas" a "#notas_contenido"
Movi el comando de buscar las notas al boton iniciar, asi no se cargan las notas mientras se hace
la animacion

Ramiro 3
- Comente la llamada de funcion que cargaba el menu cuando se pone buscar
- Ahora se puede pegar con ctrl + v, en la funcion "esNumero" no previene default si la
tecla ingresada es "v", igual no escribe la letra porque el input es tipo numero

Ramiro 4
- Ahora en vez de cargar el php al "elDivConTodaLaInfo", le carga un jquery con los datos del
alumno como variables
- Cuando se ingresa al menu muestra arriba el nombre del alumno

*/

var ingreso = false;
var vistaYaRegistrado = 0;

const velocidadSlide = 200;

var tiempoDeEspera = 10000;
var tiempoTranscurrido = 0;
var tiempoIteracion = 100;

$(document).ready(() => {
    actualizarVista();

    $(".alert").hide();
    $("#container_iconoCargando").hide();

    $("#inputBoton").click(() => {
        ingresar();
        
    });

    /*
    $("#menu_notas").click((e) => {
        //$("#notas_contenido").html(array_materias); ///////////////// Agregar notas y materias
        //$("#notas_contenido").append(array_notas);
        $("#notas_contenido").html("\
        <table class='table'>\
        <thead>\
            <tr>\
            <th scope='col'>Materia</th>\
            <th scope='col'>Nota</th>\
            </tr>\
        </thead>\
        <tbody id='cuerpo_tabla'>\
        ");
        //ARREGLAR: al momento de crear la tabla, no crea las notas y materias dentro del tbody, automaticamente lo cierra y por eso queda feo
        for (i=0;array_materias[i] != null ;i++) //El for agrega las materias y notas
        {
            $("#cuerpo_tabla").append("\
            <tr>\
                <td>"+array_materias[i]+"</td>\
                <td>"+array_notas[i]+"</td>>\
            </tr>\
            ");
        }
        $("#notas_contenido").append("\
            </tbody>\
        </table>\
        ");
        vistaYaRegistrado = 1;
        actualizarVista();
    });
    */

    $("#menu_info").click((e) => {
        vistaYaRegistrado = 2;
        actualizarVista();
    });

    $("#botonVolver").click((e) => {
        volver();
    });


    $("#botonLimpiarDNI").click((e) => {
        $("#inputDNI").val("");
    });

    $("#botonLimpiarLegajo").click((e) => {
        $("#inputLegajo").val("");
    });

    $(".inputFormulario").keydown((e) => {
        esNumero(e);
    });

    $(document).keydown((e) => {
        if (e.key == "Enter") {
            ingresar();
        }
        if (ingreso && e.key == "Backspace") {
            volver();
        }
    });

});//Fin $(document).ready(()

function actualizarVista() {
    aEstadoListo();
    if (ingreso == false) {
        $('#bodyWrapperYaRegistrado').hide();
        $("#bodyWrapperIngresar").show();

        $("#menu").hide();
        $("#notas").hide();
        $("#info").hide();

        $("#inputDNI").focus();
    } else {
        $('#bodyWrapperYaRegistrado').show();
        $("#bodyWrapperIngresar").hide();

        if (vistaYaRegistrado === 0) {
            //$("#menu").slideDown(velocidadSlide);
            $("#notas").slideDown(velocidadSlide);            
            //$("#info").hide();
        }
        if (vistaYaRegistrado === 1) {
            //$("#menu").hide();
            //$("#info").hide();
        }
        /*
        if (vistaYaRegistrado === 2) {
            //$("#menu").hide();
            $("#notas").hide();
            //$("#info").slideDown(velocidadSlide);
        }*/
    }
}

function volver() {
    if (vistaYaRegistrado != 0) {
        vistaYaRegistrado = 0;
        actualizarVista();
    } else {
        ingreso = false;
        actualizarVista();
        aEstadoListo();
        limpiarDatos()
    }
}

function esNumero(e) {

    if (
        (parseInt(e.key) != parseInt(e.key)) && //no es numero
        (!e.ctrlKey) && //ctrl no esta presionado (en vez de excepcion para v)
        (e.key != "Backspace") &&
        (e.key != "Tab") &&
        (e.key != "Enter") &&
        (e.key != "Control") &&
        (e.key != "Alt") &&
        (e.key != "Shift") &&
        (e.key != "AltGraph") &&
        (e.key != "OS") &&
        (e.key != "Escape") &&


        !((e.which >= 112) && (e.which <= 123)) && //no es tecla de funcion
        !((e.which >= 33) && (e.which <= 46)) //no es spr,del,etc ni flechitas
    ) {
        e.preventDefault();
        $("#alert_soloNumero").slideDown(100);
    } else {
        $("#alert_soloNumero").slideUp(100);
    }
}

function aEstadoCargando() {
    $("#inputBoton").fadeOut(velocidadSlide, () => {
        $("#container_iconoCargando").fadeIn(velocidadSlide);
    });
}

function aEstadoListo() {
    $("#inputBoton").show();
    $("#container_iconoCargando").hide();
    
}

function ingresar() {
    var valor_dni = $("#inputDNI").val();   
    
    $("#elDivConTodaLaInfo").load("Cargas_notas.php", { "DNI": valor_dni });
    
    var iteracionBusqueda = setInterval(() => {
        var estadoDatos = $("#datosPasados_estadoDatos").html();
        if (estadoDatos == "true") {
            $(".infoAlumno_nombre").html(Nombre_Alumno); ////////Ramiro 4
            $(".infoAlumno_curso").html(Curso_Alumno); //
            ingreso = true;
            vistaYaRegistrado = 1;
            actualizarVista();
            cargarNotas();
            $("#alert_noSeEncontro").hide();
            clearInterval(iteracionBusqueda);
            $("#DNI_form").val($("#inputDNI").val()); ///////////// 
            console.log("Val dni: " + $("#DNI_form").val());
            console.log("establecer_sesion.php");
            //$("#sesion").load("establecer_sesion.php", { "DNI": valor_dni }); ///////
        }
        else if (estadoDatos == "false") {
            $("#alert_noSeEncontro").slideDown(velocidadSlide);
            clearInterval(iteracionBusqueda);
        }
        else {
            $("#alert_noSeEncontro").hide();
            tiempoTranscurrido = tiempoTranscurrido + tiempoIteracion;
            if (tiempoTranscurrido >= tiempoDeEspera) {
               // clearInterval(iteracionBusqueda);
            }
        }
    }, tiempoIteracion);
}

function limpiarDatos(){
    $("#elDivConTodaLaInfo").html("");
}

function cargarNotas(){
    $("#notas_contenido").html("\
    <table class='table'>\
    <thead>\
        <tr>\
        <th scope='col'>Materia</th>\
        <th scope='col'>Nota</th>\
        </tr>\
    </thead>\
    <tbody id='cuerpo_tabla'>\
    ");
    //ARREGLAR: al momento de crear la tabla, no crea las notas y materias dentro del tbody, automaticamente lo cierra y por eso queda feo
    for (i=0;array_materias[i] != null ;i++) //El for agrega las materias y notas
    {
        $("#cuerpo_tabla").append("\
        <tr>\
            <td>"+array_materias[i]+"</td>\
            <td>"+array_notas[i]+"</td>>\
        </tr>\
        ");
    }
    $("#notas_contenido").append("\
        </tbody>\
    </table>\
    ");
    vistaYaRegistrado = 0;
    actualizarVista();
}