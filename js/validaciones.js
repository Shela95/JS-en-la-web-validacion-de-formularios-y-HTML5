export function valida(input) {
    //required data-tipo="nacimento
    //Dataset lo que nosotros estamos obteniendo es la colección de todos los datas atribute
    //el punto tipo es para obtener el tipo de input
    const tipoDeInput = input.dataset.tipo;
    //necesitamos por cada uno de los tipos de input o por el tipo de input
    //verificar si existe dentro del input
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input); // vinculado con el otro archivo app.js
    }
    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError (tipoDeInput, input)
      }
}
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];


const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos seis caracteres maximo 12 , debe contener una letra minuscula , 1 letra mayuscula. 1 numero , no puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",

    },

    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección  debe contener entre 10 a 40 caracteres",

    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad  debe contener entre 10 a 40 caracteres",

    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido debe contener entre 10 a 40 caracteres",

    },
};

const validadores = {
    // en registro usamos la palabra nacimiento ( required data-tipo="nacimento")
    nacimiento: input => validarNacimiento(input),

};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];

        }
    });
    return mensaje
}

//se crear función para recibir el input
function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    //acceder al valor de fecha, formato año, mes y dia
    const fechaUsuario = new Date(input.value);
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

//verificar si es mayor de edad
function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
    
}
