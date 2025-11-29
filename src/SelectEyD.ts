import type {Estado, Dificultad} from "./Tarea.js";
import { validarDificultad, validarEstado } from "./Validadores.js";

import promptSync from "prompt-sync";
const prompt = promptSync();

export function seleccionarDificultad () : Dificultad 
{
    
    let opcion = parseInt(prompt("Dificultad [1] Fácil [2] Medio [3] Difícil:"), 10);

    while(validarDificultad(opcion) === false)
    {
        console.log("¡ERROR! Esa opcion no existe, vuelva a intentarlo. \n");
        let opcion = parseInt(prompt("Dificultad [1] Fácil [2] Medio [3] Difícil:"), 10);
    }

    switch(opcion)
    {
        case 1:
            return '⭐';
        case 2:
            return '⭐⭐';
        case 3:
            return '⭐⭐⭐';

        default:
            return '⭐';
    }
}


export function seleccionarEstado() : Estado
{
    let opcion = parseInt(prompt("Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada):"), 10);

        while(validarEstado(opcion) === false)
        {
            console.log("¡ERROR! Esa opcion no existe, vuelva a intentarlo. \n");
            opcion = parseInt(prompt("Estado ([1] Pendiente / [2] En curso / [3] Terminada / [4] Cancelada):"), 10);
        }
        
        switch(opcion)
        {
            case 1:
                return '❗ Pendiente';
            case 2:
                return '🛠 En curso';
            case 3:
                return '✔ Terminada';
            case 4:
                return "❌ Cancelada";

            default: return '❗ Pendiente';
        }
}