/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
var doctor = sessionStorage.getItem("doctor");
//doctorParseado = JSON.parse(doctor);
doctor = JSON.parse(sessionStorage.getItem("doctor"));

var cita = {fecha: "", titulocita: "", nomPaciente: "", horacita: "", id_medico: ""};
var url = "http://localhost:8080/TareaCrudJs/";


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


function render() {
    $("#cedula").val(persona.cedula);
    $("#nombre").val(persona.nombre);
    $("input[name='sexo']").val([persona.sexo]);
    switch (mode) {
        case 'A':
            $("#cedula").prop("readonly", false);
            $('#aplicar').off('click').on('click', add);
            break;
        case 'E':
            $("#cedula").prop("readonly", true);
            $('#aplicar').off('click').on('click', update);
            break;
    }
    $('#add-modal').modal('show');
}
function render2() {
    //$("#cedula").val(persona.cedula);
    $("#nombre").val(persona.nombre);
    //$("input[name='sexo']").val([persona.sexo]);

    $("#nombre").prop("readonly", true);
    $('#aplicar2').off('click').on('click', addCita);


    $('#add-modal2').modal('show');
}

function load() {
    //persona = Object.fromEntries( (new FormData($("#formulario").get(0))).entries());
    persona = {

        cedula: document.getElementById("cedula").value,
        nombre: document.getElementById("nombre").value,
        sexo: $('input[name="sexo"]:checked').val(), ///arregalr este bug
        id_medico: doctor.id

    };
}
function loadcita() {
    cita = {
        fecha: document.getElementById("fecha2").value,
        titulocita: document.getElementById("titulo2").value,
        nomPaciente: document.getElementById("nombre").value,
        horacita: document.getElementById("hora2").value,
        id_medico: doctor.id
    };
}

function reset() {
    persona = {cedula: "", nombre: "", sexo: "", id_medico: ""};
}
function resetcita() {
    cita = {fecha: "", titulocita: "", nomPaciente: "", horacita: "", id_medico: ""};
}



function addCita() {
    loadcita();
    //if (!validar())
        //return;
    const request = new Request(backend + '/citas',
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(cita)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            //fetchAndList();
            resetcita();
            $('#add-modal2').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
}


function add() {
    load();
    //if (!validar())
        //return;
    const request = new Request(backend + '/personas',
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(persona)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            fetchAndList();
            reset();
            $('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
}

function update() {
    load();
    if (!validar())
        return;
    const request = new Request(backend + '/personas/' + persona.cedula,
            {method: 'PUT', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(persona)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            fetchAndList();
            reset();
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
    personas.forEach((p) => {
        row($("#listado"), p);
    });
}

function row(listado, persona) {
    var tr = $("<tr />");
    tr.html(`<td>${persona.cedula}</td>
                 <td>${persona.nombre}</td>
                 <td><img src="http://localhost:8080/TareaCrudJs/images/${persona.sexo}.png" class="icon" ></td>
                 <td>${persona.id_medico}</td>
                 <td id="edit"><img src="http://localhost:8080/TareaCrudJs/images/edit.png"></td>
                 <td id="sacarcita"><img src="http://localhost:8080/TareaCrudJs/images/edit.png"></td>                                            `);
    tr.find("#edit").on("click", () => {
        retornapersonaporId(persona.cedula);
    });
    tr.find("#sacarcita").on("click", () => {
        retornapersonaporId2(persona.cedula);
    });
    listado.append(tr);
}

function retornapersonaporId(cedula) {

    const request = new Request(backend + '/personas/' + cedula, {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#buscarDiv #errorDiv"));
                return;
            }
            persona = await response.json();
            mode = 'E'; //editing
            render();
        } catch (e) {
            errorMessage(NET_ERR, $("#buscarDiv #errorDiv"));
        }
    })();

}

function retornapersonaporId2(cedula) {

    const request = new Request(backend + '/personas/' + cedula, {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#buscarDiv #errorDiv"));
                return;
            }
            persona = await response.json();
            //mode='E'; //editing
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
        const request = new Request(backend + '/pacientespormedico/'+doctor.id, {method: 'GET', headers: {}});
       
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status, $("#buscarDiv #errorDiv"));
                    return;
                }
                personas = await response.json();
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
        fetchAndList();
        $("#crear").click(makenew);
        $("#buscar").on("click", search);
    }

    $(loaded);

