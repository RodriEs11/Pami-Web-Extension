
// EXTENSION FUNCIONAL EN LA URL https://www.pami.org.ar/credencial-provisoria
// AGREGA LA FUNCIONALIDAD DE OBTENER EL CUIL DEL PACIENTE SEGUN EL SEXO Y EL NUMERO DE DNI

const formulario = document.querySelector("#formulario");

const numeroAfiliadoDiv = document.querySelector("#formulario > div:nth-child(1) > div > div:nth-child(1)");
const numeroAfiliadoInput = document.querySelector("#formulario > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2)");

const cuilDiv = document.querySelector("#formulario > div:nth-child(1) > div > div:nth-child(2)");
const cuilLabel = document.querySelector("#formulario > div:nth-child(1) > div > div:nth-child(2) > label");
const cuilInput = document.querySelector("#el_cuil")

const botonImprimirCredencial = document.querySelector("#btn_imprimir_credencial");


function crearInput(id){
    
    // DEVUELVE UN INPUT DE TEXTO CON EL MISMO ESTILO DE LA PAGINA
    const divPrincipal = document.createElement("div");
    divPrincipal.setAttribute("class", "form-inline m-b-15");
    divPrincipal.setAttribute("style", "margin-top:10px");
    
    const divChild = document.createElement("div");
    divChild.setAttribute("class", "form-group inline-block");
    divChild.setAttribute("style", "width:33%");

    const input = document.createElement("input");
    input.setAttribute("class", "form-control");
    input.setAttribute("size", "14");
    input.setAttribute("maxlength", "14");
    input.setAttribute("type", "text");
    input.setAttribute("id", id);
    
    divPrincipal.appendChild(divChild);
    divChild.appendChild(input);

    return divPrincipal;
}

function crearBoton(id, value){

    // DEVUELVE UN BOTON CON EL MISMO ESTILO QUE LA PAGINA
    
    const divPrincipal = document.createElement("div");
    
    const input = document.createElement("input");
    input.setAttribute("class", "boton_accion");
    input.setAttribute("value", value);
    input.setAttribute("type", "button");
    input.setAttribute("id", id);
    
    input.addEventListener("click", () => validar() );

    divPrincipal.appendChild(input);

    return divPrincipal;

}

function crearRadioButtonsSexo(){


    // FEMENINO = 0
    // MASCULINO = 1

    const divRadioButton = document.createElement("div");
    const fieldSet = document.createElement("fieldset");
    const label1 = document.createElement("label");
    const label2 = document.createElement("label");
    const inputRadioButtonFemenino = document.createElement("input");
    const inputRadioButtonMasculino = document.createElement("input");
    
    label1.textContent = "Femenino";
    label2.textContent = "Masculino";
    
    inputRadioButtonFemenino.setAttribute("type", "radio");
    inputRadioButtonFemenino.setAttribute("id", "radioButtonF");
    inputRadioButtonFemenino.setAttribute("name", "sexo");
    inputRadioButtonFemenino.setAttribute("value", "0");
    inputRadioButtonFemenino.setAttribute("style", "margin:10px");
    inputRadioButtonFemenino.setAttribute("checked", "checked");
    
    inputRadioButtonMasculino.setAttribute("type", "radio");
    inputRadioButtonMasculino.setAttribute("id", "radioButtonM");
    inputRadioButtonMasculino.setAttribute("name", "sexo");
    inputRadioButtonMasculino.setAttribute("value", "1");
    inputRadioButtonMasculino.setAttribute("style", "margin:10px");
    
    divRadioButton.appendChild(fieldSet);
    fieldSet.appendChild(label1);
    fieldSet.appendChild(label2);
    label1.appendChild(inputRadioButtonFemenino);
    label2.appendChild(inputRadioButtonMasculino);
  

    return divRadioButton;
}


function validar(){

    const dniInput = document.querySelector("#dni");
    const sexo = checkSexo();

   cuilInput.value = getCuilCuit(dniInput.value, sexo);

}

function checkSexo(){

    // FEMENINO = 0
    // MASCULINO = 1
    
    const radioButtonF = document.querySelector("#radioButtonF");
    const radioButtonM = document.querySelector("#radioButtonM");

    let sexoSeleccionado = "MUJER";

    if(radioButtonM.checked){
        sexoSeleccionado = "HOMBRE";
    }

   return sexoSeleccionado;

}


function crearDivGroup(id){

    // DIV PARA AGRUPAR RADIO ELEMENTS - INPUTS - BUTTONS

    const divPrincipal = document.createElement("div");
    divPrincipal.setAttribute("class", "form-group");
    divPrincipal.setAttribute("style", "margin-top:10px");
    divPrincipal.setAttribute("id", id);
    
    return divPrincipal;

}

//CREA GRUPO
formulario.appendChild(crearDivGroup("groupDni"));
const divDni = document.querySelector("#groupDni");
const labelDni = document.createElement("label");
labelDni.innerHTML = "DNI";

// SE AGREGAN AL GRUPO TODOS LOS ELEMENTOS
// TEXTO "Dni"  
// TEXT INPUT
// BOTON "Cargar Cuil"
divDni.appendChild(labelDni);
divDni.appendChild(crearInput("dni"));
divDni.appendChild(crearRadioButtonsSexo());
divDni.appendChild(crearBoton("cargarCuilBtn", "Cargar CUIL"));



function getCuilCuit(document_number, gender) {
    /**
     * Cuil format is: AB - document_number - C
     * Author: Nahuel Sanchez, Woile
     *
     * @param {str} document_number -> string solo digitos
     * @param {str} gender -> debe contener HOMBRE, MUJER o SOCIEDAD
     *
     * @return {str}
     **/
    "use strict";
    const HOMBRE = ["HOMBRE", "M", "MALE"],
      MUJER = ["MUJER", "F", "FEMALE"],
      SOCIEDAD = ["SOCIEDAD", "S", "SOCIETY"];
    let AB, C;
  
    /**
     * Verifico que el document_number tenga exactamente ocho numeros y que
     * la cadena no contenga letras.
     */
    if (document_number.length != 8 || isNaN(document_number)) {
      if (document_number.length == 7 && !isNaN(document_number)) {
        document_number = "0".concat(document_number);
      } else {
        // Muestro un error en caso de no serlo.
        throw "El numero de document_number ingresado no es correcto.";
      }
    }
  
    /**
     * De esta manera permitimos que el gender venga en minusculas,
     * mayusculas y titulo.
     */
    gender = gender.toUpperCase();
  
    // Defino el valor del prefijo.
    if (HOMBRE.indexOf(gender) >= 0) {
      AB = "20";
    } else if (MUJER.indexOf(gender) >= 0) {
      AB = "27";
    } else {
      AB = "30";
    }
  
    /*
     * Los numeros (excepto los dos primeros) que le tengo que
     * multiplicar a la cadena formada por el prefijo y por el
     * numero de document_number los tengo almacenados en un arreglo.
     */
    const multiplicadores = [3, 2, 7, 6, 5, 4, 3, 2];
  
    // Realizo las dos primeras multiplicaciones por separado.
    let calculo = parseInt(AB.charAt(0)) * 5 + parseInt(AB.charAt(1)) * 4;
  
    /*
     * Recorro el arreglo y el numero de document_number para
     * realizar las multiplicaciones.
     */
    for (let i = 0; i < 8; i++) {
      calculo += parseInt(document_number.charAt(i)) * multiplicadores[i];
    }
  
    // Calculo el resto.
    let resto = parseInt(calculo) % 11;
  
    /*
     * Llevo a cabo la evaluacion de las tres condiciones para
     * determinar el valor de C y conocer el valor definitivo de
     * AB.
     */
    if (SOCIEDAD.indexOf(gender) < 0 && resto == 1) {
      if (HOMBRE.indexOf(gender) >= 0) {
        C = "9";
      } else {
        C = "4";
      }
      AB = "23";
    } else if (resto === 0) {
      C = "0";
    } else {
      C = 11 - resto;
    }
    const example = `${AB}-${document_number}-${C}`;
    // Show example
    //console.log(example);
  
    // Generate cuit
    const cuil_cuit = `${AB}${document_number}${C}`;
    return cuil_cuit;
  }

