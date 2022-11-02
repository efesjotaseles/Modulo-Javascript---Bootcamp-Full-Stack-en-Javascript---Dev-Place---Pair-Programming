const botonera = document.getElementById("botonera");
const btnStart = document.getElementById("btnStart");
const palabraEscondida = document.getElementById("palabraEscondida");
const intentosHTML = document.getElementById("intentosFallidos");
const palabras = [
  "PALABRA",
  "ESTACION",
  "ZAPATILLA",
  "RENACUAJO",
  "LIMONERO",
  "HELICOIDAL",
  "GUIJARROS",
  "PORTAVOZ",
  "PROCRASTINAR"
];
let intentosFallidos;
let palabraElegida;
var palabraConGuiones = [];

btnStart.addEventListener("click", comenzarJuego);

function comenzarJuego() {
  intentosFallidos = 0;
  intentosHTML.innerHTML = intentosFallidos;
  palabraElegida = elegirPalabra();
  generarPalabraConGuiones(palabraElegida);
  actualizarPalabraHTML(palabraConGuiones);
  console.log(palabraElegida);
}

botonera.addEventListener("click", (e) => {
  const letra = e.target.getAttribute("letra");
  if (letra) {
    if (acerto(letra)) {
      alert("éxito!");
      comprobarLetra(letra);
      actualizarPalabraHTML(palabraConGuiones);
    } else {
      intentosFallidos++;
      intentosHTML.innerHTML = intentosFallidos;
      alert("Intento fallido!");
      //dibujar parte del cuerpo???
    }

    //console.log(letra);
  }
});
//document.getElementById('mydata').innerText = 'Result: ' + no;

function elegirPalabra() {
  return palabras[Math.floor(Math.random() * palabras.length)];
}

function generarPalabraConGuiones(palabraOriginal) {
  for (let i = 0; i < palabraElegida.length; i++) {
    palabraConGuiones[i] = "_";
  }
  //palabraConGuiones = palabraOriginal.replace(/./g, "_ ");
}

function actualizarPalabraHTML(palabraAMostrar) {
  palabraEscondida.innerHTML = palabraAMostrar.join(" "); //devuelve un array a string
}

function comprobarLetra(letra) {
  //console.log(letra);
  for (let i = 0; i < palabraElegida.length; i++) {
    if (letra === palabraElegida[i]) {
      palabraConGuiones[i] = letra;
      //palabraConGuiones = "algo";
      //alert(palabraConGuiones);
      //palabraConGuiones.slice(i, 1);
      //palabraConGuiones.splice(i, 0, letra);
    }
  }
  console.log(palabraConGuiones);
}

function acerto(letra) {
  let rta = false;
  if (palabraElegida.indexOf(letra) !== -1) {
    rta = true;
  }
  return rta;
}
