/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

var doctor = sessionStorage.getItem("doctor");
doctor = JSON.parse(sessionStorage.getItem("doctor"));

var personas = new Array();
var persona = {cedula: "", nombre: "", sexo: "", id_medico: ""};

var citas = {fecha:"",titulocita:"",nomPaciente:"",horacita:"",id_medico:""};
var  url = "http://localhost:8080/TareaCrudJs/";


function loadCitas(){
    citas={
        fecha: document.getElementById("fecha").value,
        titulocita: document.getElementById("titulocita").value,
        nomPaciente: document.getElementById("pacientedoctor").value,
        horacita: document.getElementById("horariosdoctor").value,
        id_medico: doctor.id
    };

}

 function add(){
    loadCitas();
    //if(!validar()) return;
    const request = new Request(backend+'/citas', 
            {method: 'POST', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(citas)});
    (async ()=>{
        try{
            const response = await fetch(request);
            if (!response.ok) {alert("error");}
            //fetchAndList();
            reset();
            render();
            alert("Cita agregada");
            //$('#add-modal').modal('hide'); 
        }
        catch(e){
            alert("error");
        }        
    })();    
  }

function reset(){
    citas = {fecha:"",titulocita:"",nomPaciente:"",horacita:"",id_medico:""};
}






function popup() {
    $("#pacientedoctor").html("");
    personas.forEach((p1) =>{ $("#pacientedoctor").append(`<option value="${p1.nombre}">${p1.nombre}</option>`)});
}

function popup2(){
    
    var horaentrada = parseInt(doctor.hEntrada1);
    var horasalida = parseInt(doctor.hSalida1);
    var frecuencia = parseInt(doctor.frecuencia);
    var i;
    var horas1 = new Array();
    for (i=horaentrada;i<=horasalida;i=i+frecuencia) { 
        horas1.push(i);
    }
 
    if(doctor.d1)
    $("#horariosdoctor").html("");
    horas1.forEach((h1) =>{$("#horariosdoctor").append(`<option value="${h1}">${h1}</option>`)} );
}
 function render(){
        $("#fecha").val(persona.cedula);
	$("#titulocita").val(persona.nombre);
        $("#pacientedoctor").val(persona.nombre);
        $("#horariosdoctor").val(persona.nombre);
        
}





function fetchAndList() {
    const request = new Request(backend + '/pacientespormedico/' + doctor.id, {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            //if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
            personas = await response.json();
            popup();
        } catch (e) {
            errorMessage(NET_ERR,$("#buscarDiv #errorDiv"));
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
function loaded(){
loadMenu($("#menucontainer"));
fetchAndList();
popup2();
$("#logout").on("click", logout);
$("#register").on("click", add);
}
$(loaded);