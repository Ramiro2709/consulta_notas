var sextoOculto = true;
var quintoOculto = true;

$(document).ready(() => {
    inicio();

    $("#checkboxTodos5to").change((e) => { 
        if($("#checkboxTodos5to").prop('checked')){
            $(".checkboxAlumnosQuinto").each((i, element) => {
                $(element).prop('checked', true);
            });
        }else{
            $(".checkboxAlumnosQuinto").each((i, element) => {
                $(element).prop('checked', false);
            });
        }
    });

    $("#quinto_titulo").click(() => {
        quintoOculto = !quintoOculto;
        actualizarVista();
    });
    $("#sexto_titulo").click(()=> {
        sextoOculto = !sextoOculto;
        actualizarVista();
    });

    $("#checkboxTodos6to").change((e) => { 
        if($("#checkboxTodos6to").prop('checked')){
            $(".checkboxAlumnosSexto").each((i, element) => {
                $(element).prop('checked', true);
            });
        }else{
            $(".checkboxAlumnosSexto").each((i, element) => {
                $(element).prop('checked', false);
            });
        }
    });
});

function inicio(){
    $("#tablaSexto").load("cargaAlumnos6to.php");
    $("#tablaQuinto").load("cargaAlumnos5to.php");

    $("#alumnosQuinto").hide();
    $("#alumnosSexto").hide();
}

function actualizarVista(){
    if(quintoOculto){
        $("#alumnosQuinto").stop().slideUp();
    }else{
        $("#alumnosQuinto").stop().slideDown();
    }

    if(sextoOculto){
        $("#alumnosSexto").stop().slideUp();
    }else{
        $("#alumnosSexto").stop().slideDown();
    }
}

function clicktr(element){
    var id = $(element).prop('id');

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "horas.php");

    var fieldID = document.createElement("input");
    fieldID.setAttribute("type", "hidden");
    fieldID.setAttribute("name", "id_alumno");
    fieldID.setAttribute("value", id);
    
    form.appendChild(fieldID);

    document.body.appendChild(form);
    form.submit();
}