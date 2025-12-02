import promptSync from "prompt-sync";
import { type interfazTarea } from "./Tarea.js";
import { agregarTarea } from "./AgregarTarea.js";
import { menuBuscarTarea} from "./BuscarTarea.js";
import { mostrarTareas, mostrarTareasVencidas} from "./Mostrar.js";
import { eliminarTarea } from "./EliminarTarea.js";
import { mostrarEstadisticas } from "./Estadisticas.js";




const prompt = promptSync();

export async function menuPrincipal(listaTareas:interfazTarea[] = []) {

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
        console.log("[5] Estadisticas");
        console.log("[6]. Salir");

        let opcion = parseInt(prompt("Elige una opción: "), 10);


        switch (opcion) {
            case 1:
                
                listaTareas = await menuVerTareas(listaTareas);
            break;

            case 2:

                const listaActualizada = await menuBuscarTarea(listaTareas);
                if (listaActualizada) 
                {
                        listaTareas = listaActualizada;
                }
            break;

            case 3:
                listaTareas = await agregarTarea(listaTareas);
            break;

            case 4:
                listaTareas = await eliminarTarea(listaTareas);
            break;

            case 5:
                mostrarEstadisticas(listaTareas);
            break;

            case 6:
                console.log("\n¡Hasta luego!");
                ejecutando = false;
            break;

            default:
                console.log("\n❌ Opción no válida, intenta de nuevo.");
                break;
        }
    }
}



async function menuVerTareas(listaTareas: interfazTarea[]): Promise<interfazTarea[]> {

        let op: number = 0;
        let filtroEspecifico: string = "";
        
        console.log("¿Que tareas deseas ver?");
        console.log("[1] Ver todas las tareas");
        console.log("[2] Ver tareas pendientes");
        console.log("[3] Ver tareas en curso");
        console.log("[4] Ver tareas terminadas");
        console.log("[5] Ver tareas vencidas.");
        console.log("[0] Volver"); // Agregamos opción volver

        const subOpcion = parseInt(prompt("Elige una opción: "), 10);

        switch (subOpcion) {
            
            case 1:
                op = 1;
                console.log("\n--- 📋 Lista de Tareas ---");
    
                return await mostrarTareas(listaTareas, op, "");
            
            case 2:
                filtroEspecifico = '❗ Pendiente';
                return await mostrarTareas(listaTareas, op, filtroEspecifico);
            
            case 3:
                filtroEspecifico = '🛠 En curso';
                return await mostrarTareas(listaTareas, op, filtroEspecifico);
            
            case 4:
                filtroEspecifico = '✔ Terminada';
                return await mostrarTareas(listaTareas, op, filtroEspecifico);

            case 5:
                await mostrarTareasVencidas(listaTareas);

                break;

            case 0:
                return listaTareas; 

            default:
                console.log("\n❌ Opción no válida, intenta de nuevo.");
                return listaTareas; 
        }
        return listaTareas;
}

