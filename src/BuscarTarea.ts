import { mostrarDetalles} from "./Mostrar.js";
import type { interfazTarea } from "./Tarea.js";
import {pedirId, validarID} from "./Validadores.js";
import promptSync from "prompt-sync";

const prompt = promptSync();


export function menuBuscarTarea(listaDeTareas: interfazTarea[]) {

    if(listaDeTareas.length === 0)
    {
        console.log("ERROR. Debe ingresar al menos una tarea. \n");
        return;
    }
    else
    {
        console.log("\n--- 🔍 Búsqueda de Tareas ---");
        console.log("1. Buscar por ID");
        console.log("2. Buscar por Título");
        console.log("0. Volver");

        const opcion = parseInt(prompt("Elige una opción: "),10);

        switch (opcion) {
            case 1:
                return pedirTareaId(listaDeTareas);
                
            case 2:
                return buscarClave(listaDeTareas);
                
            case 0:
                break;
            default:
                console.log("Opción no válida.");
            break;
        }
    }
    
}





//funcion completa donde me retorna una tarea que coincide con el id a buscar
export function pedirTareaId(listaDeTareas: interfazTarea[]){
    
    listaDeTareas.forEach((t) => {
            if (t.eliminado === false) {
                console.log(`${t.getId()} - ${t.getTitulo()}`);
            }
    });
    
    let idBuscado = pedirId();
    

    const tarea = validarID(listaDeTareas, idBuscado);
    if(!tarea){
        console.log("¡ERROR! No se encontraron tareas.");
        return;

    }



    console.log("\n✅ Tarea encontrada:");
    console.log(`[${tarea.getId()}] - ${tarea.getTitulo()}`);

    return mostrarDetalles(listaDeTareas);
}

//---------------------------------- buscar por titulo ----------------------------

//1-funcion pura que filtra por titulo
function retornarLista(listaDeTareas: interfazTarea[], clave: string): interfazTarea[] {

    // 1. Convertimos lo que escribió el usuario a minúsculas
    const claveNormalizada = clave.toLowerCase();

    const filtradas = listaDeTareas.filter((t) => {
        // 2. Convertimos el título de la tarea actual a minúsculas
        const tituloNormalizado = t.getTitulo().toLowerCase();

        // 3. Verificamos coincidencia Y que no esté eliminada
        // Usamos .includes() para que si busco "pan", encuentre "Comprar pan"
        if (tituloNormalizado.includes(claveNormalizada) && t.eliminado === false) {
            return true;
        }
        return false;
    });

    return filtradas;
}

//2- funcion impura para pedir titulo
export function buscarClave(listaDeTareas: interfazTarea[]): interfazTarea[] {

    let tituloBuscado = prompt("Introduce el titulo de una Tarea para buscarla:");

    listaDeTareas.forEach((t) => {
            if (t.eliminado === false) {
                console.log(`${t.getId()} - ${t.getTitulo()}`);
            }
    });
    
    const tarea = retornarLista(listaDeTareas, tituloBuscado);

    
    if(tarea.length === 0){
        console.log("¡ERROR! No se encontraron tareas. Vuelva a intentarlo");
        return listaDeTareas;
    }

    

    console.log("\n✅ Tareas encontradas:");
    console.log("--------------------------------");
    tarea.forEach((t) => {
        
        console.log(`[${t.getId()}] - ${t.getTitulo()} (${t.getEstado()})`);
    });
    console.log("--------------------------------");

    
    return mostrarDetalles(listaDeTareas);

}

