const inputDNI = document.getElementById("input-dni");
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputTel = document.getElementById("input-tel");
const buttonAgregar = document.getElementById("agregarContacto");
const buttonEliminar = document.getElementById("eliminarContacto");
const buttonMostrar = document.getElementById("mostrarAgenda");
const tableAgenda = document.getElementById("agendaContent");
const encabezadoDNI = document.getElementById("encabezadoDNI");
const encabezadoNombre = document.getElementById("encabezadoNombre");
const encabezadoApellido = document.getElementById("encabezadoApellido");
const encabezadoTelefono = document.getElementById("encabezadoTelefono");

//const filaEdit = document.getElementById(`row-${ind}`);
let agenda = [];

class Contacto {
  dni;
  nombre;
  apellido;
  telefono;

  constructor(dni, nombre, apellido, telefono) {
    this.dni = parseInt(dni);
    this.nombre = this.formatearString(nombre);
    this.apellido = this.formatearString(apellido);
    this.telefono = parseInt(telefono);
    return this;
  }

  formatearString(string) {
    string = string.toString();
    string = string.toLowerCase();
    string = string.charAt(0).toUpperCase() + string.slice(1);

    return string;
  }

  toString() {
    return `DNI: ${this.dni} \nNombre: ${this.nombre} \nApellido: ${this.apellido} \nTeléfono: ${this.telefono}`;
  }

  // toTableRow() {
  //   return `<tr>
  //   <td>${this.dni}</td>
  //   <td>${this.nombre}</td>
  //   <td>${this.apellido}</td>
  //   <td>${this.telefono}</td>
  //   </tr>`;
  // }
}

//Fila edicion
function crearFilaEdicion(contacto, pos) {
  const filaEdit = document.createElement("tr");
  let cellEdit = document.createElement("td");
  let inpEdit = document.createElement("input");
  filaEdit.setAttribute("id", "filaEdit");
  filaEdit.setAttribute("pos", `${pos}`);
  //celda input dni
  inpEdit.setAttribute("type", "number");
  inpEdit.setAttribute("name", "edit-dni");
  inpEdit.setAttribute("id", "edit-dni");
  inpEdit.setAttribute("placeholder", "dni");
  inpEdit.setAttribute("value", `${contacto.dni}`);
  cellEdit.appendChild(inpEdit);
  filaEdit.appendChild(cellEdit);

  //celda input nombre
  cellEdit = document.createElement("td");
  inpEdit = document.createElement("input");
  inpEdit.setAttribute("type", "text");
  inpEdit.setAttribute("name", "edit-nombre");
  inpEdit.setAttribute("id", "edit-nombre");
  inpEdit.setAttribute("placeholder", "nombre");
  inpEdit.setAttribute("value", `${contacto.nombre}`);
  cellEdit.appendChild(inpEdit);
  filaEdit.appendChild(cellEdit);

  //celda input apellido
  cellEdit = document.createElement("td");
  inpEdit = document.createElement("input");
  inpEdit.setAttribute("type", "text");
  inpEdit.setAttribute("name", "edit-apellido");
  inpEdit.setAttribute("id", "edit-apellido");
  inpEdit.setAttribute("placeholder", "apellido");
  inpEdit.setAttribute("value", `${contacto.apellido}`);
  cellEdit.appendChild(inpEdit);
  filaEdit.appendChild(cellEdit);

  //celda input telefono
  cellEdit = document.createElement("td");
  inpEdit = document.createElement("input");
  inpEdit.setAttribute("type", "number");
  inpEdit.setAttribute("name", "edit-telefono");
  inpEdit.setAttribute("id", "edit-telefono");
  inpEdit.setAttribute("placeholder", "telefono");
  inpEdit.setAttribute("value", `${contacto.telefono}`);
  cellEdit.appendChild(inpEdit);
  filaEdit.appendChild(cellEdit);

  //celda boton guardar
  cellEdit = document.createElement("td");
  inpEdit = document.createElement("button");
  inpEdit.innerHTML = "Guardar";
  inpEdit.setAttribute("id", "botonGuadar");
  inpEdit.setAttribute(
    "onclick",
    `editarContactoEnAgenda(new Contacto(document.getElementByID("edit-dni"),document.getElementByID("edit-nombre"),document.getElementByID("edit-apellido"),document.getElementByID("edit-telefono")),${pos})`
  );
  cellEdit.appendChild(inpEdit);
  filaEdit.appendChild(cellEdit);

  return filaEdit;
}

function editarContactoEnAgenda(contacto, pos) {
  if (contacto.dni && contacto.nombre && contacto.nombre && contacto.telefono) {
    //Si encuentra el dni ingresado en la agenda...
    if (buscarContacto(inputDNI.value) !== null) {
      alert("El dni ingresado ya existe en la agenda.");
    }
    //Si no lo encuentra, lo inserta en la agenda y actualiza la página.
    else {
      //Reasigna el elemento de la agenda con el nuevo
      agenda[pos] = contacto;
      //Y si simplemente actualizamos la tabla??? o_o
      actualizarTablaHTML();
    }
  }
}

function ordenarAgendaPorDNI() {
  agenda.sort((a, b) => a.dni - b.dni);
}

function ordenarAgendaPorTelefono() {
  agenda.sort((a, b) => a.telefono - b.telefono);
}

function ordenarAgendaPorNombre() {
  agenda.sort((a, b) => {
    const nameA = a.nombre.toUpperCase();
    const nameB = b.nombre.toUpperCase();
    let comparacion = 0; //Se asume que son iguales.
    if (nameA < nameB) {
      comparacion = -1; //Si a es menor
    }
    if (nameA > nameB) {
      comparacion = 1; //Si a es mayor
    }
    return comparacion;
  });
}

function ordenarAgendaPorApellido() {
  agenda.sort((a, b) => {
    const nameA = a.apellido.toUpperCase();
    const nameB = b.apellido.toUpperCase();
    let comparacion = 0; //Se asume que son iguales.
    if (nameA < nameB) {
      comparacion = -1; //Si a es menor
    }
    if (nameA > nameB) {
      comparacion = 1; //Si a es mayor
    }
    return comparacion;
  });
}

/**
 * Inserta mediante push el contacto pasado a la agenda.
 * @param {*} contacto
 */
let agregarContacto = (contacto) => {
  agenda.push(contacto);
};

let eliminarPorDNI = (dni) => {
  let resultado = false;
  let pos = buscarContacto(dni);
  if (pos !== null) {
    agenda.splice(pos, 1);
    resultado = true;
  }
  return resultado;
};

/**
 * UI para crear contacto nuevo y agregarlo a la agenda.
 */
let crearContacto = () => {
  let DNI = prompt("Ingrese DNI");
  let nombre = prompt("Ingrese nombre");
  let apellido = prompt("Ingrese apellido");
  let tel = prompt("Ingresar télefeno");
  agregarContacto(new Contacto(DNI, nombre, apellido, tel));
};

/**
 *
 * @param {*} DNI
 * @returns posición del contacto en la agenda (null si no lo encuentra)
 */
let buscarContacto = (DNI) => {
  let int = null;
  agenda.forEach((contacto, i) => {
    if (contacto.dni == DNI) {
      int = i;
    }
  });
  return int;
};

let mostrarAgenda = () => {
  if (agenda.length === 0) {
    alert("Agenda vacía!");
  } else {
    agenda.forEach((contacto, i) => {
      alert(mostrarContacto(contacto));
    });
  }
};

let mostrarContacto = (contacto) => {
  return contacto.toString();
};

let menu = () => {
  let op;
  let DNI;
  while (op != 0) {
    op = prompt(
      "Mostrar agenda: 1 \nCrear contacto: 2 \nEliminar por DNI: 3 \nSalir: 0 \nOpción: "
    );
    switch (op) {
      case "1":
        mostrarAgenda();
        //op = 0;
        break;
      case "2":
        crearContacto();
        break;
      case "3":
        DNI = prompt("Ingresar DNI");
        if (eliminarPorDNI(DNI)) {
          alert("Contacto elminado!");
        } else {
          alert(`No se encontró el contacto indicado\nDNI provisto: ${DNI}`);
        }

        break;
      default:
        break;
    }
  }
};

//Agrega!
buttonAgregar.onclick = () => {
  if (
    inputDNI.value &&
    inputNombre.value &&
    inputApellido.value &&
    inputTel.value
  ) {
    //Si encuentra el dni ingresado en la agenda...
    if (buscarContacto(inputDNI.value) !== null) {
      alert("El dni ingresado ya existe en la agenda.");
    }
    //Si no lo encuentra, lo inserta en la agenda y actualiza la página.
    else {
      agregarContacto(
        new Contacto(
          inputDNI.value,
          inputNombre.value,
          inputApellido.value,
          inputTel.value
        )
      );
      limpiarInputs();
      actualizarTablaHTML();
    }
  }
};

buttonEliminar.onclick = () => {
  eliminarPorDNI(inputDNI.value);
  actualizarTablaHTML();
};

//Lista???
buttonMostrar.onclick = () => {
  actualizarTablaHTML();
};

function actualizarTablaHTML() {
  limpiarTabla();
  let ind = 0;

  agenda.map((contacto) => {
    const rowNode = document.createElement("tr");
    rowNode.setAttribute("id", `row-${ind}`);
    let cellNode = document.createElement("td");
    let textNode = document.createTextNode(contacto.dni);
    cellNode.appendChild(textNode);
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    textNode = document.createTextNode(contacto.nombre);
    cellNode.appendChild(textNode);
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    textNode = document.createTextNode(contacto.apellido);
    cellNode.appendChild(textNode);
    rowNode.appendChild(cellNode);

    cellNode = document.createElement("td");
    //textNode = document.createTextNode(contacto.telefono);
    //cellNode.appendChild(textNode);
    cellNode.innerHTML = contacto.telefono; //FORMA DE AGREGARLE EL TEXTO INTERNO SIN CREAR TEXTNODE
    rowNode.appendChild(cellNode);

    //Botón editar
    cellNode = document.createElement("td");
    let buttonNode = document.createElement("button");
    buttonNode.innerHTML = "editar";
    //mmm....
    buttonNode.setAttribute("pos", `${ind}`); //DARLE ATRIBUTO A LA tr
    buttonNode.setAttribute("onclick", `${ind}`);

    ind++;
    rowNode.appendChild(buttonNode);

    tableAgenda.appendChild(rowNode);
  });
}

//BOTONES PARA ORDENAR LISTA
function revertirOrdenAgendaHTML() {
  agenda.reverse();
  actualizarTablaHTML();
}

encabezadoDNI.onclick = () => {
  if (tableAgenda.getAttribute("orden") === "dni") {
    revertirOrdenAgendaHTML();
  } else {
    ordenarAgendaPorDNI();
    tableAgenda.setAttribute("orden", "dni");
    actualizarTablaHTML();
  }
};

encabezadoNombre.onclick = () => {
  if (tableAgenda.getAttribute("orden") === "nombre") {
    revertirOrdenAgendaHTML();
  } else {
    ordenarAgendaPorNombre();
    tableAgenda.setAttribute("orden", "nombre");
    actualizarTablaHTML();
  }
};

encabezadoApellido.onclick = () => {
  if (tableAgenda.getAttribute("orden") === "apellido") {
    revertirOrdenAgendaHTML();
  } else {
    ordenarAgendaPorApellido();
    tableAgenda.setAttribute("orden", "apellido");
    actualizarTablaHTML();
  }
};

encabezadoTelefono.onclick = () => {
  if (tableAgenda.getAttribute("orden") === "telefono") {
    revertirOrdenAgendaHTML();
  } else {
    ordenarAgendaPorTelefono();
    tableAgenda.setAttribute("orden", "telefono");
    actualizarTablaHTML();
  }
};

function limpiarTabla() {
  while (tableAgenda.firstChild) {
    tableAgenda.removeChild(tableAgenda.lastChild);
  }
}

function limpiarInputs() {
  inputDNI.value = "";
  inputNombre.value = "";
  inputApellido.value = "";
  inputTel.value = "";
}

/*
funcion que cree elemento con etiqueta "tr"
y 4 celdas "td". Cada una con un elemento "input"



*/
