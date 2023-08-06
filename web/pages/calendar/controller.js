let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
var backend = "http://localhost:8080/BackEndProyecto2/api";
var doctor = sessionStorage.getItem("doctor");
doctor = JSON.parse(sessionStorage.getItem("doctor"));
var personas = new Array();
var persona = {cedula: "", nombre: "", sexo: "", id_medico: ""};
var numeros = new Array("1", "2", "3", "4", "5", "6", "7");
var citas = new Array();
var citaAtendida = {titulo:"",nomPaciente:"",idMedico:"",signos:"",diagnosticos:"",prescripciones:""};

var cita = {fecha:"",titulocita:"",nomPaciente:"",horacita:"",id_medico:""};

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');

const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function resetCitaAtendida(){
    citaAtendida = {titulo:"",nomPaciente:"",idMedico:"",signos:"",diagnosticos:"",prescripciones:""};
}

function render() {
   
    $('#aplicar').off('click').on('click', addCitaAtendida);


    $('#add-modal').modal('show');
}

function loadCitas(){
    cita={
        fecha: clicked,
        titulocita: eventTitleInput.value,
        nomPaciente: document.getElementById("pacientedoctor").value,
        horacita: document.getElementById("horariosdoctor").value,
        id_medico: doctor.id
    };

}

function loadcitaAtendida() {
    citaAtendida = {
        
        titulo: document.getElementById("titulo").value,
        nomPaciente: document.getElementById("nombre").value,
        idMedico: doctor.id,
        signos: document.getElementById("signos").value,
        diagnosticos: document.getElementById("diagnosticos").value,
        prescripciones: document.getElementById("prescripciones").value
       
    };
}
function addCitaAtendida() {
    loadcitaAtendida();
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
            alert("Cita atendida");
            $('#add-modal').modal('hide');
        } catch (e) {
            errorMessage(NET_ERR, $("#add-modal #errorDiv"));
        }
    })();
}



 function add(){
    //loadCitas();
    //if(!validar()) return;
    cita = citas[citas.length-1];
    const request = new Request(backend+'/citas', 
            {method: 'POST', 
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(cita)});
    (async ()=>{
        try{
            const response = await fetch(request);
            if (!response.ok) {alert("error");}
            //fetchAndList();
            //reset();
            alert("Cita agregada");
            //$('#add-modal').modal('hide'); 
        }
        catch(e){
            //alert("error");
        }        
    })();    
  }

function reset(){
    cita = {fecha:"",titulocita:"",nomPaciente:"",horacita:"",id_medico:""};
}






function popup() {
    $("#pacientedoctor").html("");
    personas.forEach((p1) =>{ $("#pacientedoctor").append(`<option value="${p1.nombre}">${p1.nombre}</option>`)});
}

function listahorarios(){
    
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

function openModal(fecha) {
    clicked = fecha;

    const eventForDay = events.find(e => e.fecha === clicked);

    if (eventForDay) {
       
        //document.getElementById('eventText').innerText = eventForDay.titulocita;
        //deleteEventModal.style.display = 'block';
       render();
        
    } else {
        newEventModal.style.display = 'block';
    }

    //backDrop.style.display = 'block';
     
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const fechaString = firstDayOfMonth.toLocaleDateString('es-cr', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(fechaString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
            `${dt.toLocaleDateString('es-cr', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.fecha === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.titulocita;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {

    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            fecha: clicked,
            titulocita: eventTitleInput.value,
            nomPaciente: document.getElementById("pacientedoctor").value,
            horacita: document.getElementById("horariosdoctor").value,
            id_medico: doctor.id
        });
        
        localStorage.setItem('events', JSON.stringify(events));
        citas = JSON.parse(localStorage.getItem('events'));
        closeModal();
        add();
        
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e => e.fecha !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
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

loadMenu($("#menucontainer"));
fetchAndList();
popup();
listahorarios();

$("#logout").on("click", logout);
initButtons();
load();
//add();