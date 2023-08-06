/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

var backend = "http://localhost:8080/BackEndProyecto2/api";
var  url = "http://localhost:8080/TareaCrudJs/";
const NET_ERR=999;

var encontradodoctor = false;
var encontradoadmin = false;
 
var admin ={id:"",password:""}; 
var admins = new Array();

var doctor = {id: "", password: "", name: "", speciality: "", fee: "", location: "",estado:"inactivo",frecuencia:0,
    d1: false, hEntrada1: "",hSalida1:"",
    d2:false,hEntrada2: "",hSalida2:"", d3: false,hEntrada3: "",
    hSalida3:"", d4: false, hEntrada4: "",hSalida4:"", d5: false,
    hEntrada5: "",hSalida5:"",d6: false,hEntrada6: "",hSalida6:"",
    d7:false, hEntrada7: "",hSalida7:"",rol:"doctor"};


//doctor.id = document.getElementById("id").value;
//doctor.password = document.getElementById("password").value;


var  doctores = new Array();
//var alerta = window.confirm('No se encuentra este usuario en el sistema');

function fetchAndList(){
    const request = new Request(backend+'/doctores', {method: 'GET', headers: { }});
    (async ()=>{
        try{
            const response = await fetch(request);
            //if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
            doctores = await response.json();
            
        }
        catch(e){
            //errorMessage(NET_ERR);
        }         
    })();    
} 

function fetchAndListAdmins(){
    const request = new Request(backend+'/admins', {method: 'GET', headers: { }});
    (async ()=>{
        try{
            const response = await fetch(request);
            //if (!response.ok) {errorMessage(response.status,$("#buscarDiv #errorDiv"));return;}
            admins = await response.json();
            
        }
        catch(e){
            //errorMessage(NET_ERR);
        }         
    })();    
} 





  
  
  function reset(){
    doctor = {id: "", password: "", name: "", speciality: "", fee: "", location: "",estado:"inactivo",frecuencia:0,
    d1: false, hEntrada1: "",hSalida1:"",
    d2:false,hEntrada2: "",hSalida2:"", d3: false,hEntrada3: "",
    hSalida3:"", d4: false, hEntrada4: "",hSalida4:"", d5: false,
    hEntrada5: "",hSalida5:"",d6: false,hEntrada6: "",hSalida6:"",
    d7:false, hEntrada7: "",hSalida7:"",rol:"doctor"};
  }

function rendervacio(){
    localStorage.clear();
    //reset();
    
}


function irARegister(){
    //localStorage.clear();
    document.location =  url + "pages/register/register.html";
}

function load(){ //trae de pantalla y lo mete en el objeto
    admin ={
        id:document.getElementById("id").value, 
        password:document.getElementById("password").value
    };
        
    doctor={
        id:document.getElementById("id").value, 
        password:document.getElementById("password").value,
        name:doctor.name,speciality: "", fee: "", location: "",estado:"inactivo",frecuencia:0,
    d1: false, hEntrada1: "",hSalida1:"",
    d2:false,hEntrada2: "",hSalida2:"", d3: false,hEntrada3: "",
    hSalida3:"", d4: false, hEntrada4: "",hSalida4:"", d5: false,
    hEntrada5: "",hSalida5:"",d6: false,hEntrada6: "",hSalida6:"",
    d7:false, hEntrada7: "",hSalida7:"",rol:"doctor"
      
    };
      
}

function verifica(){
    load();
    
    doctores.forEach(d =>{
        
        if(d.id === doctor.id && d.password === doctor.password ){
             //document.location =  url + "pages/register/register.html";
             //d = doctor;
             doctor = d;
             encontradodoctor = true;
        }
        
    });
    
    admins.forEach(a =>{
        
        if(a.id === admin.id && a.password === admin.password ){
             //document.location =  url + "pages/register/register.html";
             //d = doctor;
             admin = a;
             encontradoadmin = true;
        }
        
    });
    
    
    if(encontradodoctor){
        //sessionStorage.setItem('doctor', JSON.stringify(doctor));
        //localStorage.setItem("doctor",JSON.stringify(doctor));
        
        let request = new Request(backend+'/login', {method: 'POST', headers: { 'Content-Type': 'application/json'},body: JSON.stringify(doctor)});
        (async ()=>{
            const response = await fetch(request);
            ///if (!response.ok) {errorMessage(response.status,$("#loginDialog #errorDiv"));return;}
            doctor = await response.json();
            sessionStorage.setItem("doctor", JSON.stringify(doctor));
            //$('#loginDialog').modal('hide');            
           switch(doctor.rol){
               case "doctor": document.location = url+"pages/agregarPersonas/agregarPersonas.html"; break;
               //case 'CLI': document.location = url+"about.html"; break;
           }                           
        })(); 
    
        //document.location =  url + "pages/register/register.html";
    }if(encontradoadmin){
        //link de pagina de aceptarlos
        document.location = url+"pages/aceptarDoctores/aceptarDoctores.html";
    }
    
    
    
    else{
        //window.alert("Usuario no encontrado en el sistema");
    }

}


  function loaded(){
    fetchAndList();
    fetchAndListAdmins();
    $("#login").on("click",verifica);  
   
  }
  
  $(loaded);  

