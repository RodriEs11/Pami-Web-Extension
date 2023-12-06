let codigoQR = null;
let primerInput = document.getElementById('numeroAfiliado');
let segundoInput = document.getElementById('numeroAfiliado2');
let botonGenerarQR = document.getElementById('botonGenerarQR');
let afiliadoCompleto = null;

botonGenerarQR.addEventListener("click", botonQR);



primerInput.addEventListener('input', guardarDatosChromeLocal);
segundoInput.addEventListener('input', guardarDatosChromeLocal);

// Recuperar los inputs al cargar el popup
document.addEventListener('DOMContentLoaded', function () {

  // Obtener los inputs del almacenamiento local
  chrome.storage.local.get(['primerInput', 'segundoInput'])

    .then((resultado) => {
      primerInput.value = resultado.primerInput || "";
      segundoInput.value = resultado.segundoInput || "";

    });

});



function botonQR() {


  let formValidado = validarInputs() && afiliadoCompleto !== null;

  formValidado ? generarQR(afiliadoCompleto) : alert("Credencial incorrecta");

  guardarDatosChromeLocal();


}


function generarQR(texto) {

  limpiarCodigoQR()
  // Utilizamos la biblioteca qrcode.min.js para generar el nuevo código QR
  codigoQR = new QRCode(document.getElementById('codigoQR'), {
    text: texto,
    width: 192,
    height: 192
  });
}

function limpiarCodigoQR() {

  if (codigoQR !== null) {
    let codigoQRContainer = document.getElementById('codigoQR');
    codigoQRContainer.innerHTML = '';

  }


}

function validarInputs() {

  let numeroAfiliadoPrimeraParte = "";
  let numeroAfiliadoSegundaParte = "";

  if (!primerInput.value && !segundoInput.value) {
    return false;
  }

  if (!tieneSoloNumeros(primerInput.value) || !tieneSoloNumeros(segundoInput.value)) {
    return false;
  }

  if (primerInput.value.length !== 12 || segundoInput.value.length !== 2) {
    return false;
  }

  numeroAfiliadoPrimeraParte = primerInput.value;
  numeroAfiliadoSegundaParte = segundoInput.value;


  // Formato: 123456789012-99
  afiliadoCompleto = `${numeroAfiliadoPrimeraParte}-${numeroAfiliadoSegundaParte}`;

  return true;

}

function guardarDatosChromeLocal() {
  // Guardar el dato en el almacenamiento local

  let codigoQrHtml = document.getElementById('codigoQR').innerHTML;

  chrome.storage.local.set({ 'primerInput': primerInput.value, 'segundoInput': segundoInput.value, 'qr': codigoQrHtml })
    .then(() => {
      console.log("Valores guardados");
    });
}




function tieneSoloNumeros(numero) {

  let expresionRegular = /^\d+$/;  // Expresión regular para verificar si la cadena contiene solo números

  return expresionRegular.test(numero);
}
function isTextoVacio(texto) {

  return texto.trim().length == 0;
}