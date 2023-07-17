import { valida } from "./validaciones.js";
const inpust = document.querySelectorAll("input"); // todos los elementos de tipo input
inpust.forEach(input => {
    input.addEventListener("blur", (input) => {
        valida(input.target.value);
    });
});