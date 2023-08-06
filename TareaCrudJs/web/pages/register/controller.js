/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */




var backend = "http://localhost:8080/BackEndProyecto2/api";
var dias = new Array("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo");
var  url = "http://localhost:8080/TareaCrudJs/";

var horarios = {d1: false, hEntrada1: "", hSalida1: "",
    d2: false, hEntrada2: "", hSalida2: "", d3: false, hEntrada3: "",
    hSalida3: "", d4: false, hEntrada4: "", hSalida4: "", d5: false,
    hEntrada5: "", hSalida5: "", d6: false, hEntrada6: "", hSalida6: "",
    d7: false, hEntrada7: "", hSalida7: ""};

var doctor = {id: "", password: "", name: "", speciality: "", fee: "", location: "",estado:"inactivo",frecuencia:0,
    d1: false, hEntrada1: "", hSalida1: "",
    d2: false, hEntrada2: "", hSalida2: "", d3: false, hEntrada3: "",
    hSalida3: "", d4: false, hEntrada4: "", hSalida4: "", d5: false,
    hEntrada5: "", hSalida5: "", d6: false, hEntrada6: "", hSalida6: "",
    d7: false, hEntrada7: "", hSalida7: "",rol:"doctor"};
//var doctorconhorario;
const NET_ERR = 999;


function render() { //trae lo que se puso y lo muestra en pantalla

    //if(horarios.d1.checked){
    // horarios.d1 = true;
    //horarios de lunes
    $("#inlineCheckboxLunes").val(doctor.d1);
    $("#inputStateEntradaLunes").val(doctor.hEntrada1);
    $("#inputStateSalidaLunes").val(doctor.hSalida1);

    // }

    //if(horarios.d2.checked){
    //horarios.d2 = true;

    //horarios de martes
    $("#inlineCheckboxMartes").val(doctor.d2);
    $("#inputStateEntradaMartes").val(doctor.hEntrada2);
    $("#inputStateSalidaMartes").val(doctor.hSalida2);

    // }
    //if(horarios.d3.checked){
    // horarios.d3 = true;
    //horarios de miercoles
    $("#inlineCheckboxMiercoles").val(doctor.d3);
    $("#inputStateEntradaMiercoles").val(doctor.hEntrada3);
    $("#inputStateSalidaMiercoles").val(doctor.hSalida3);
    // }
    //if(horarios.d4.checked){
    // horarios.d4 = true;
    //horarios de jueves
    $("#inlineCheckboxJueves").val(doctor.d4);
    $("#inputStateEntradaJueves").val(doctor.hEntrada4);
    $("#inputStateSalidaJueves").val(doctor.hSalida4);
    // }
    // if(horarios.d5.checked){
    // horarios.d5 = true;
    //horarios de viernes
    $("#inlineCheckboxViernes").val(doctor.d5);
    $("#inputStateEntradaViernes").val(doctor.hEntrada5);
    $("#inputStateSalidaViernes").val(doctor.hSalida5);
    //}
    //if(horarios.d6.checked){
    //horarios.d6 = true;
    //horarios de sabado
    $("#inlineCheckboxSabado").val(doctor.d6);
    $("#inputStateEntradaSabado").val(doctor.hEntrada6);
    $("#inputStateSalidaSabado").val(doctor.hSalida6);
    // }
    //if(horarios.d7.checked){
    //horarios.d7 = true;
    $("#inlineCheckboxDomingo").val(doctor.d7);
    $("#inputStateEntradaDomingo").val(doctor.hEntrada7);
    $("#inputStateSalidaDomingo").val(doctor.hSalida7);
    // }
    
    $("#id").val(doctor.id);
    $("#password").val(doctor.password);
    $("#name").val(doctor.name);
    $("#speciality").val(doctor.speciality);
    $("#fee").val(doctor.fee);
    $("#location").val(doctor.location);
    $("#frequency").val(doctor.frecuencia);
   

    //doctor.forEach( => {
    //lunes
    if (doctor.d1) {
        document.getElementById("inlineCheckboxLunes").checked = true;
        var element = document.getElementById("inputStateEntradaLunes");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaLunes");
        element.classList.toggle("invisible");
    }
    //martes
     if (doctor.d2) {
        document.getElementById("inlineCheckboxMartes").checked = true;
        var element = document.getElementById("inputStateEntradaMartes");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaMartes");
        element.classList.toggle("invisible");
    }
    //miercoles
    if (doctor.d3) {
        document.getElementById("inlineCheckboxMiercoles").checked = true;
        var element = document.getElementById("inputStateEntradaMiercoles");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaMiercoles");
        element.classList.toggle("invisible");
    }
    //jueves
    if (doctor.d4) {
        document.getElementById("inlineCheckboxJueves").checked = true;
        var element = document.getElementById("inputStateEntradaJueves");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaJueves");
        element.classList.toggle("invisible");
    }
    //viernes
    if (doctor.d5) {
        document.getElementById("inlineCheckboxViernes").checked = true;
        var element = document.getElementById("inputStateEntradaViernes");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaViernes");
        element.classList.toggle("invisible");
    }
    //sabado
    if (doctor.d6) {
        document.getElementById("inlineCheckboxSabado").checked = true;
        var element = document.getElementById("inputStateEntradaSabado");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaSabado");
        element.classList.toggle("invisible");
    }
     //domingo
    if (doctor.d7) {
        document.getElementById("inlineCheckboxDomingo").checked = true;
        var element = document.getElementById("inputStateEntradaDomingo");
        element.classList.toggle("invisible");
        var element = document.getElementById("inputStateSalidaDomingo");
        element.classList.toggle("invisible");
    }

    // }
    //});

}
function muestraModal() {
    $('#add-modal').modal('show');
}

function load() { //trae de pantalla y lo mete en el objeto

    doctor = {
        id: document.getElementById("id").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        speciality: document.getElementById("speciality").value,
        fee: document.getElementById("fee").value,
        location: document.getElementById("location").value,
        estado:"inactivo",
        frecuencia: parseInt(document.getElementById("frequency").value) ,
        //lunes

        d1: document.getElementById("inlineCheckboxLunes").checked,
        hEntrada1: document.getElementById("inputStateEntradaLunes").value,
        hSalida1: document.getElementById("inputStateSalidaLunes").value,
        //martes
        d2: document.getElementById("inlineCheckboxMartes").checked,
        hEntrada2: document.getElementById("inputStateEntradaMartes").value,
        hSalida2: document.getElementById("inputStateSalidaMartes").value,
        //miercoles
        d3: document.getElementById("inlineCheckboxMiercoles").checked,
        hEntrada3: document.getElementById("inputStateEntradaMiercoles").value,
        hSalida3: document.getElementById("inputStateSalidaMiercoles").value,
        //jueves
        d4: document.getElementById("inlineCheckboxJueves").checked,
        hEntrada4: document.getElementById("inputStateEntradaJueves").value,
        hSalida4: document.getElementById("inputStateSalidaJueves").value,
        //viernes
        d5: document.getElementById("inlineCheckboxViernes").checked,
        hEntrada5: document.getElementById("inputStateEntradaViernes").value,
        hSalida5: document.getElementById("inputStateSalidaViernes").value,
        //sabado
        d6: document.getElementById("inlineCheckboxSabado").checked,
        hEntrada6: document.getElementById("inputStateEntradaSabado").value,
        hSalida6: document.getElementById("inputStateSalidaSabado").value,
        //domingo
        d7: document.getElementById("inlineCheckboxDomingo").checked,
        hEntrada7: document.getElementById("inputStateEntradaDomingo").value,
        hSalida7: document.getElementById("inputStateSalidaDomingo").value,
        rol:"doctor"
    };
    //doctorconhorario = Object.assign(doctor,horarios); //por si el que estoy usando no funciona

}

function reset() {

    //localStorage.clear();
    doctor = {id: "", password: "", name: "", speciality: "", fee: "", location: ""};
    horarios = {d1: false, hEntrada1: "", hSalida1: "",
        d2: false, hEntrada2: "", hSalida2: "", d3: false, hEntrada3: "",
        hSalida3: "", d4: false, hEntrada4: "", hSalida4: "", d5: false,
        hEntrada5: "", hSalida5: "", d6: false, hEntrada6: "", hSalida6: "",
        d7: false, hEntrada7: "", hSalida7: "",rol:"doctor"};
}

function add() {
    load();
    localStorage.setItem("doctor", JSON.stringify(doctor));
    const request = new Request(backend + '/doctores', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(doctor)});
    (async () => {
        try {
            const response = await fetch(request);
            //if (!response.ok) {errorMessage(response.status,$("#add-modal #errorDiv"));return;}
            fetchAndList();
            reset();
            render();
            $('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR);
        }
    })();
}

function makenew() {
    reset();
    //mode='A'; //adding
    render();

}

function search() {
    //to do
}
/*
 function errorMessage(status,place){  
 switch(status){
 case 404: error= "Registro no encontrado"; break;
 case 403: case 405: error="Usuario no autorizado"; break;
 case 406: case 405: error="Usuario ya existe"; break;
 case NET_ERR: error="Error de comunicación"; break;
 };            
 place.html('<div class="alert alert-danger fade show">' +
 '<button type="button" class="close" data-dismiss="alert">' +
 '&times;</button><h4 class="alert-heading">Error!</h4>'+error+'</div>');
 return;        
 }  
 */

function fetchAndList() {
    const request = new Request(backend + '/doctores', {method: 'GET', headers: {}});
    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status);
                return;
            }
            doctor = await response.json();

        } catch (e) {
            errorMessage(NET_ERR);
        }
    })();
}
function muestraHorarios() {

    dias.forEach(dia => $("#inlineCheckbox" + dia).click(function () {

            var element = document.getElementById("inputStateEntrada" + dia);
            element.classList.toggle("invisible");
            var element = document.getElementById("inputStateSalida" + dia);
            element.classList.toggle("invisible");

            //$("#inputStateEntrada"+dia).toggle();
            ///$("#inputStateSalida"+dia).toggle();
        }));

}


function popup() {
    $("#m-body").html("");
    dias.forEach(dia => $("#m-body").append(`<div class="form-check form-check-inline mt-2" id="${dia}" style="display: inline-block;">
            <input class="form-check-input position-static" type="checkbox" id="inlineCheckbox${dia}" value=true> ${dia}
            
     <select id="inputStateEntrada${dia}" class="form-control invisible" >
            <option>--</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
                </select>
            <select id="inputStateSalida${dia}" class="form-control invisible" >
            <option>--</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
                </select>

            </div>

      `));
    muestraHorarios();
}
function logout(){
        let request = new Request(backend+'/login', {method: 'DELETE', headers: { }});
        (async ()=>{
            const response = await fetch(request);
            //if (!response.ok) {errorMessage(response.status,$("#loginDialog #errorDiv"));return;}
            sessionStorage.removeItem("doctor");
            document.location = url+"pages/login/index.html";                         
        })();      
    }




function loaded() {
   
    loadMenu($("#menucontainer"));
    $("#logout").on("click",logout);  
    fetchAndList();
    $("#schedule").click(muestraModal);

    //muestraHorarios();
    popup();
    //$("#register").click(makenew);//aqui no es makenew es aplicar

    //$("#buscar").on("click",search);
    //$("#id").prop( "readonly", false );
    $("#register").on("click", add);
    doctor = (localStorage.getItem("doctor")) ? JSON.parse(localStorage.getItem("doctor")) : doctor; 
   
    render();

    //document.getElementById("register").addEventListener("click",add);
}

$(loaded);

