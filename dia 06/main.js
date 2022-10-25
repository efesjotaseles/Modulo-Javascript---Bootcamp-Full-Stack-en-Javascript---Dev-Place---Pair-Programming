const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const resultado = document.getElementById("resultado");
const operador = document.getElementById("operador");

numA.onchange = function () {
  operacion();
};

numB.onchange = function () {
    operacion();
  };

/*operador.onchange = function () {
  operacion();
};
*/
function operacion() {
  switch (operador.value) {
    case "+":
      resultado.value = parseFloat(numA.value) + parseFloat(numB.value);
      break;

    case "-":
      resultado.value = parseFloat(numA.value) - parseFloat(numB.value);
      break;
    case "x":
      resultado.value = parseFloat(numA.value) * parseFloat(numB.value);
      break;
    case "/":
      resultado.value = parseFloat(numA.value) / parseFloat(numB.value);
      break;
    default:
      resultado.value = 0;
      break;
  }
}
