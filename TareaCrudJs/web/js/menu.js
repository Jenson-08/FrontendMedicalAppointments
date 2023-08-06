/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
var url = "http://localhost:8080/TareaCrudJs/";
var backend = "http://localhost:8080/BackEndProyecto2/api";


function loadMenu(container){
    json = sessionStorage.getItem("doctor");
    if (!json) document.location = url + "pages/login/index.html";
         
    doctor = JSON.parse(json);
    
    if(["doctor"].includes(doctor.rol)){
   
    container.html(
        `<nav class="navbar navbar-expand-xxl navbar-light bg-light">
        <div class="container-fluid">
        <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a>Dr. ${doctor.name} </a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <a id="agenda" type="button">Agenda</a>
        </li>
         <li class="breadcrumb-item active" aria-current="page">
          <a id="datospersonales">Datos Personales</a>
         </li>
        <li class="breadcrumb-item active" aria-current="page" >
          <a id="pacientes" type="button" >Pacientes</a>
        </li>
       
        <li class="breadcrumb-item active" aria-current="page">
          <a id="antecedentes">Antecedentes</a>
         </li>
        
        <li class="breadcrumb-item active" aria-current="page">
          <a id="atendercita">Atender Cita</a>
         </li>
        <li class="breadcrumb-item active" aria-current="page">
          <a id="citasporpaciente">Historial de Citas</a>
         </li>
        
        <li class="breadcrumb-item active" aria-current="page">
          <a id="logout">Logout</a>
         </li>
        </ol>
        </nav>
        </div>
        </nav>
        `);
    //$("#agenda").on("click",e=>{document.location = url + "pages/register/register.html";});
   
    //$("#logout").on("click",logout);  
}
 $("#pacientes").on("click",e=>{document.location = url + "pages/agregarPersonas/agregarPersonas.html";});
 $("#datospersonales").on("click",e=>{document.location = url + "pages/register/register.html";});
 $("#agenda").on("click",e=>{document.location = url + "pages/calendar/calendar.html";});
 $("#sacarcita").on("click",e=>{document.location = url + "pages/sacarCita/sacarCita.html";});
 $("#atendercita").on("click",e=>{document.location = url + "pages/atenderCita/atenderCita.html";});
 $("#citasporpaciente").on("click",e=>{document.location = url + "pages/citasPorPaciente/citasPorPaciente.html";});
 $("#antecedentes").on("click",e=>{document.location = url + "pages/antecedente/antecedente.html";});
 
}
