const currentLog = document.getElementById("currentLog");

let agenda = [];

class Contacto {
  dni;
  nombre;
  apellido;
  telefono;

  constructor(dni, nombre, apellido, telefono) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    return this;
  }

  toString() {
    return `DNI: ${this.dni} \nNombre: ${this.nombre} \nApellido: ${this.apellido} \nTeléfono: ${this.telefono}`;
  }
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
