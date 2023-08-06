/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

var doctor = sessionStorage.getItem("doctor");
//doctorParseado = JSON.parse(doctor);
doctor = JSON.parse(sessionStorage.getItem("doctor"));


var url = "http://localhost:8080/TareaCrudJs/";
var antecedente ={ idPaciente:"",alergia:"",enfermedad:"",cirugia:"",vacuna:"",tiposangre:"",idMedico:""};
var antecedentes = new Array();





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
    $("#idpaciente").val(antecedente.idPaciente);
    $("#alergia").val(antecedente.alergia);
    $("#enfermedad").val(antecedente.enfermedad);
    $("#cirugia").val(antecedente.cirugia);
    $("#vacuna").val(antecedente.vacuna);
    $("#tiposangre").val(antecedente.tiposangre);

    $('#aplicar').off('click').on('click', add);

    $('#add-modal').modal('show');
}


function load() {
    antecedente = {
        
        idPaciente: document.getElementById("idpaciente").value ,
        alergia: document.getElementById("alergia").value,
        enfermedad: document.getElementById("enfermedad").value,
        cirugia: document.getElementById("cirugia").value,
        vacuna: document.getElementById("vacuna").value,
        tiposangre: document.getElementById("tiposangre").value,
        idMedico: doctor.id
       
    };
}

function reset() {
    antecedente ={ idPaciente:"",alergia:"",enfermedad:"",cirugia:"",vacuna:"",tiposangre:"",idMedico:""};
}




function add() {
    load();
    //if (!validar())
        //return;
    const request = new Request(backend + '/antecedente',
            {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(antecedente)});
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
    antecedentes.forEach((p) => {
        row($("#listado"), p);
    });
}

function row(listado, antecedente) {
    var tr = $("<tr />");
    tr.html(`<td>${antecedente.idPaciente}</td>
                 <td>${antecedente.alergia}</td>
                 <td>${antecedente.enfermedad}</td>
                 <td>${antecedente.cirugia}</td>
                 <td>${antecedente.vacuna}</td>
                 <td>${antecedente.tiposangre}</td>
                 <td>${antecedente.idMedico}</td> `);
  
    
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
        //mode = 'A'; //adding
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
        
        const request = new Request(backend + '/antecedentepormedico/'+doctor.id, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status, $("#buscarDiv #errorDiv"));
                    return;
                }
                antecedentes = await response.json();
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
        //$("#buscar").on("click",fetchAndList );
    }

    $(loaded);






