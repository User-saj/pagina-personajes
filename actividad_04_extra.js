/* JavaScript para Server Side actividad_04.html */

/* ------------------------ acciones iniciales --------------------------- */
// variable para manejar el <span>> "numPsj"
var spanPsjs = document.getElementById("numPsj");
let numeroPsjs = localStorage.length;
// escribe el numero de personajes en el <span>
spanPsjs.innerHTML = numeroPsjs;
// contador depende del numero inicial de personajes Local Storage
var cont = numeroPsjs + 1;
// var para manejar al boton de info del personaje
var infoBoton = document.getElementById("obtnPsj");
// bloquea el boton si no hay inf guardada
if (numeroPsjs == 0) {
  infoBoton.disabled = true;
} else {
  infoBoton.disabled = false;
}
// var para manejar al contenedor de ino del personaje
var contInf = document.getElementById("infInd");
// al inicio oculta el contenedor info del personaje
contInf.style.display = "none";
// *llamada a funcion* crea y muestra lista de personajes guardados en el localStorage
cargPsj();

/* --------------------   funciones -------------------- */
// ***** funcion: guarda info del formulario al presionar el boton "guardar"(submit)
function func_guardaLS(evento) {
  // previene la accion original del boton submit
  evento.preventDefault();
  // variables locales para usar con localStorage(key, value)
  let personaje, info_personaje;
  // carga la informacion del formulario en variables locales
  let nCompl = document.getElementById("nombre").value;
  let tempMasc = document.getElementById("radioMasc"); // ".checked" regresa: true or false
  // si el valor es: true/false se asigna a gnr: masculino/femenino
  let gnr = tempMasc.checked ? "Masculino" : "Femenino"; // if de una linea
  let pNac = document.getElementById("paisNac").value;
  let fNac = document.getElementById("fechNac").value;
  let espec = document.getElementById("especialidad").value;
  // se llena una variable objeto con los valores obtenidos del formulario
  info_personaje = {
    nombre: nCompl,
    genero: gnr,
    paisNac: pNac,
    fechaNac: fNac,
    especialidad: espec,
  };
  // se genera una key consecutiva cada vez que se presiona el boton submit
  personaje = `personaje_${cont}`;
  // se almacena en localStorage el objeto con la info del personaje
  localStorage.setItem(personaje, JSON.stringify(info_personaje));

  // se limpia el formulario al terminar el codigo
  document.getElementById("form_prsnj").reset();
  // se aumenta en uno el contador cada vez que se preiona el boton submit
  cont++;
  // despliega el numero de entradas guardadas en el Local Storage
  spanPsjs.innerHTML = localStorage.length;
  // recarga la lista de personajes cada vez ques e agrega uno
  cargPsj();
  // habilta el boton info de personaje
  infoBoton.disabled = false;
  // oculta el contenedor de info del personaje
  contInf.style.display = "none";
}

/* ------------- bloque de informacion de los personajes ---------------- */

// ***** funcion: carga personajes del lolalStorage en la lista de seleccion
function cargPsj() {
  // var para manejar al selector de la pagina html
  let selector = document.getElementById("selecc");
  // borra todos los elementos previos de la lista de seleccion
  while (selector.options.length > 0) {
    selector.remove(0);
  }
  // keys de todos los personajes guardados
  var idsPersonajes = Object.keys(localStorage);
  // recorre todos los personajes guardados y extrae su key y nombre
  for (const idPsj of idsPersonajes) {
    //  recupera la info de cada personaje en una var objeto
    let personaje_k = JSON.parse(localStorage.getItem(idPsj));
    // crea opcion (personaje por iteracion) para agregar al selector
    var opcion = document.createElement("option");
    // asigna valor y nombre a la opcion
    opcion.value = idPsj;
    opcion.text = personaje_k.nombre;
    // crea la opcion con la info de cada personaje
    selector.appendChild(opcion);
  }
}

// ***** funcion: obtiene info del pers seleccionado al presionar el boton "obtener"
function func_slctdPsj(evento) {
  evento.preventDefault();
  // al presionar el boton se obtiene el valor del elemento seleccionado
  let idPersonaje = document.getElementById("selecc").value;
  // se obtiene la info de la key seleccionada
  let objPersonaje = JSON.parse(localStorage.getItem(idPersonaje));

  // var para manejar las celdas de la tabla (para la info)
  let tablalNom = document.getElementById("tblNom");
  let tablaGen = document.getElementById("tblGen");
  let tablaPN = document.getElementById("tblPN");
  let tablaFN = document.getElementById("tblFN");
  let tablaEsp = document.getElementById("tblEsp");

  // miestra el contenedor de info del personaje
  contInf.style.display = "block";

  // escribe los datos del personaje en la tabla
  tablalNom.innerHTML = objPersonaje.nombre;
  tablaGen.innerHTML = objPersonaje.genero;
  tablaPN.innerHTML = objPersonaje.paisNac;
  tablaFN.innerHTML = objPersonaje.fechaNac;
  tablaEsp.innerHTML = objPersonaje.especialidad;
}
