import promptSync from "prompt-sync";
import { type interfazTarea } from "./Tarea.js";
import { agregarTarea } from "./AgregarTarea.js";
import { menuBuscarTarea} from "./BuscarTarea.js";
import { mostrarTareas} from "./Mostrar.js";
import { eliminarTarea } from "./EliminarTarea.js";




const prompt = promptSync();

export function menuPrincipal(listaTareas:interfazTarea[] = []) {

    let ejecutando = true;

    console.clear();
    console.log("¡Bienvenido a la lista de tareas!");

    while (ejecutando) {
        console.log("\n=========================");
        console.log("   GESTIÓN DE TAREAS");
        console.log("=========================");  
        
        const activas = listaTareas.filter(t => !t.eliminado).length;
        console.log(`Tareas activas: ${activas}`);

        console.log("[1] Ver mis Tareas");
        console.log("[2] Buscar Tareas");
        console.log("[3] Agregar Tareas");
        console.log("[4] Eliminar una tarea");
        console.log("[5]. Salir");

        const opcion = parseInt(prompt("Elige una opción: "), 10);

        switch (opcion) {
            case 1:
                
                listaTareas = menuVerTareas(listaTareas);
            break;

            case 2:
                
                menuBuscarTarea(listaTareas); 
            break;

            case 3:
                listaTareas = agregarTarea(listaTareas);
            break;

            case 4:
                listaTareas = eliminarTarea(listaTareas);
            break;

            case 5:
                console.log("\n¡Hasta luego!");
                ejecutando = false;
            break;

            default:
                console.log("\n❌ Opción no válida, intenta de nuevo.");
                break;
        }
    }
}



function menuVerTareas(listaTareas: interfazTarea[]): interfazTarea[] {

        let op: number = 0;
        let filtroEspecifico: string = "";
        
        console.log("¿Que tareas deseas ver?");
        console.log("[1] Ver todas las tareas");
        console.log("[2] Ver tareas pendientes");
        console.log("[3] Ver tareas en curso");
        console.log("[4] Ver tareas terminadas");
        console.log("[0] Volver"); // Agregamos opción volver

        const subOpcion = parseInt(prompt("Elige una opción: "), 10);

        switch (subOpcion) {
            
            case 1:
                op = 1;
                console.log("\n--- 📋 Lista de Tareas ---");
    
                return mostrarTareas(listaTareas, op, "");
            
            case 2:
                filtroEspecifico = '❗ Pendiente';
                return mostrarTareas(listaTareas, op, filtroEspecifico);
            
            case 3:
                filtroEspecifico = '🛠 En curso';
                return mostrarTareas(listaTareas, op, filtroEspecifico);
            
            case 4:
                filtroEspecifico = '✔ Terminada';
                return mostrarTareas(listaTareas, op, filtroEspecifico);
            
            case 0:
                return listaTareas; 

            default:
                console.log("\n❌ Opción no válida, intenta de nuevo.");
                return listaTareas; 
        }               
}

export function menuModificarTarea(tituloTarea: String){
    
    console.log('Estas editando la tarea ', tituloTarea);
    console.log("\n¿Qué desea modificar?");
    console.log("[1] Descripción");
    console.log("[2] Estado");
    console.log("[3] Dificultad");
    console.log("[4] Vencimiento");
    console.log("[5] Título");
    

    const opcion = parseInt(prompt("Elija una opción: "), 10);
    return opcion;
}