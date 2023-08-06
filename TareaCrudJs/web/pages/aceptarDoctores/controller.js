/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
var url = "http://localhost:8080/TareaCrudJs/";
var backend = "http://localhost:8080/BackEndProyecto2/api";
var doctor = {id: "", password: "", name: "", speciality: "", fee: "", location: "",estado:"inactivo",frecuencia:0,
    d1: false, hEntrada1: "", hSalida1: "",
    d2: false, hEntrada2: "", hSalida2: "", d3: false, hEntrada3: "",
    hSalida3: "", d4: false, hEntrada4: "", hSalida4: "", d5: false,
    hEntrada5: "", hSalida5: "", d6: false, hEntrada6: "", hSalida6: "",
    d7: false, hEntrada7: "", hSalida7: "",rol:"doctor"};

var doctores = new Array();
var inactivo = "inactivo";

function fetchAndList() {
        const request = new Request(backend + '/doctoresinactivos/'+inactivo, {method: 'GET', headers: {}});
        (async () => {
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    errorMessage(response.status, $("#buscarDiv #errorDiv"));
                    return;
                }
                doctores = await response.json();
                
                list();
            } catch (e) {
                errorMessage(NET_ERR, $("#buscarDiv #errorDiv"));
            }
        })();
    }
    
    function list() {
    $("#listado").html("");
    doctores.forEach((p) => {
        row($("#listado"), p);
    });
}

function row(listado, doctor) {
    var tr = $("<tr />");
    tr.html(`<td>${doctor.id}</td>
                 <td>${doctor.name}</td>
                
                 <td id="aceptardoctor"><img src="http://localhost:8080/TareaCrudJs/images/edit.png"></td>                                            `);
  
    tr.find("#aceptardoctor").on("click", () => {
        retornaDoctorporId(doctor.id);
        
    });
    listado.append(tr);
}


function retornaDoctorporId(id) {

    const request = new Request(backend + '/doctores/' + id, {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#buscarDiv #errorDiv"));
                return;
            }
            doctor = await response.json();
            
            //mode = 'E'; //editing
            //render2();
            updateEstado(doctor);
        } catch (e) {
            errorMessage(NET_ERR, $("#buscarDiv #errorDiv"));
        }
    })();

}





function updateEstado(doctor) {
    //load();
    //if (!validar())
      //  return;
    const request = new Request(backend + '/estadodoctor/',
            {method: 'PUT', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(doctor)});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status, $("#add-modal #errorDiv"));
                return;
            }
            //fetchAndList();
            //reset();
            alert("Doctor habilitado");
            //$('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
}






  function loaded() {

     
    fetchAndList();
      
    }

    $(loaded);