/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
var backend = "http://localhost:8080/BackEndProyecto2/api";
var doctor = sessionStorage.getItem("doctor");
//doctorParseado = JSON.parse(doctor);
doctor = JSON.parse(sessionStorage.getItem("doctor"));

var cita = {fecha: "", titulocita: "", nomPaciente: "", horacita: "", id_medico: ""};
var url = "http://localhost:8080/TareaCrudJs/";
var citas = new Array();

var citaAtendida = {titulo:"",nomPaciente:"",idMedico:"",signos:"",diagnosticos:"",prescripciones:""};
var citasAtendidas = new Array();



var personas = new Array();
var persona = {cedula: "", nombre: "", sexo: "", id_medico: ""};
var mode = 'A'; //adding
var backend = "http://localhost:8080/BackEndProyecto2/api";
const NET_ERR = 999;


/*
 var doctor = {id: "", password: "", name: "", speciality: "", fee: "", location: "",estado:"inactivo",frecuencia:0,
 d1: false, hEntrada1: "",hSalida1:"",
 d2:false,hEntrada2: "",hSalida2:"", d3: false,hEntrada3: "",
 hSalida3:"", d4: false, hEntrada4: "",hSalida4:"", d5: false,
 hEntrada5: "",hSalida5:"",d6: false,hEntrada6: "",hSalida6:"",
 d7:false, hEntrada7: "",hSalida7:"",rol:"doctor"};
 
 */



function render2() {
    $("#nombre2").val(cita.nomPaciente);
    $("#titulo2").val(cita.titulocita);
    //$("input[name='sexo']").val([persona.sexo]);
    $("#nombre2").prop("readonly", true);
    $("#titulo2").prop("readonly", true);
    $('#aplicar2').off('click').on('click', addCita);


    $('#add-modal').modal('show');
}


function loadcita() {
    citaAtendida = {
        
        titulo: cita.titulocita,
        nomPaciente: cita.nomPaciente,
        idMedico: doctor.id,
        signos: document.getElementById("signos").value,
        diagnosticos: document.getElementById("diagnosticos").value,
        prescripciones: document.getElementById("prescripciones").value
       
    };
}

function resetcita() {
    cita = {fecha: "", titulocita: "", nomPaciente: "", horacita: "", id_medico: ""};
}
function resetCitaAtendida(){
    citaAtendida = {titulo:"",nomPaciente:"",idMedico:"",signos:"",diagnosticos:"",prescripciones:""};
}



function addCita() {
    loadcita();
    //if (!validar())
        //return;
    const request = new Request(backend + '/citaatendida',
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(citaAtendida)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            //fetchAndList();
            resetCitaAtendida();
            $('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
}

function validar() {
    var error = false;
    $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='text']").filter((i, e) => {
        return e.value == '';
    }).length > 0;
    $("#formulario input[type='text']").filter((i, e) => {
        return e.value == '';
    }).addClass("invalid");
    error |= $("input[name='sexo']:checked").length == 0;
    if ($("input[name='sexo']:checked").length == 0)
        $("#formulario input[name='sexo']").addClass("invalid");
    return !error;
}

function list() {
    $("#listado").html("");
    citasAtendidas.forEach((p) => {
        row($("#listado"), p);
    });
}

function row(listado, citaAtendida) {
    var tr = $("<tr />");
    tr.html("<td>"+citaAtendida.titulo+"</td>"+
        "<td>"+citaAtendida.nomPaciente+"</td>"+
        "<td>"+citaAtendida.idMedico+"</td>" +
        "<td ><a target='_blank' href='"+backend+"/pdfcita/"+citaAtendida.titulo+"/pdf'> <img src='http://localhost:8080/TareaCrudJs/images/print.png' class='icon'> </a></td>");
        //tr.find("#edit").on("click",()=>{edit(persona.cedula);});
    
    listado.append(tr);
}

function retornacitaporNombre(titulocita) {

    const request = new Request(backend + '/citapormedico/' + titulocita, {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#buscarDiv #errorDiv"));
                return;
            }
            cita = await response.json();
            //mode = 'E'; //editing
            render2();
        } catch (e) {
            errorMessage(NET_ERR, $("#buscarDiv #errorDiv"));
        }
    })();

}

    function makenew() {
        reset();
        mode = 'A'; //adding
        render();
    }

    function search() {
        //to do
    }

    function errorMessage(status, place) {
        switch (status) {
            case 404:
                error = "Registro no encontrado";
                break;
            case 403:
            case 405:
                error = "Usuario no autorizado";
                break;
            case 406:
            case 405:
                error = "Usuario ya existe";
                break;
            case NET_ERR:
                error = "Error de comunicación";
                break;
        }
        ;
        place.html('<div class="alert alert-danger fade show">' +
                '<button type="button" class="close" data-dismiss="alert">' +
                '&times;</button><h4 class="alert-heading">Error!</h4>' + error + '</div>');
        return;
    }

    function fetchAndList() {
        var nombrePersona = document.getElementById("nombreSearch").value;
        const request = new Request(backend + '/citasporpaciente/'+nombrePersona, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status, $("#buscarDiv #errorDiv"));
                    return;
                }
                citasAtendidas = await response.json();
                list();
            } catch (e) {
                errorMessage(NET_ERR, $("#buscarDiv #errorDiv"));
            }
        })();
    }
    function logout() {
        let request = new Request(backend + '/login', {method: 'DELETE', headers: {}});
        (async () => {
            const response = await fetch(request);
            //if (!response.ok) {errorMessage(response.status,$("#loginDialog #errorDiv"));return;}
            sessionStorage.removeItem("doctor");
            document.location = url + "pages/login/index.html";
        })();
    }
    function loaded() {

        loadMenu($("#menucontainer"));
        $("#logout").on("click", logout);
        //render2();
        //fetchAndList();
        $("#crear").click(makenew);
        $("#buscar").on("click",fetchAndList );
    }

    $(loaded);




