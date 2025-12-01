import promptSync from "prompt-sync";
import type { interfazTarea } from "./Tarea.js";

const prompt = promptSync();

export function eliminarTarea(listaTareas: interfazTarea[]): interfazTarea[] {
    const id = pedirId();
    
    // aca se valida si el ID existe y no esta eliminado 
    const tareaExiste = listaTareas.some(t => t.getId() === id && !t.eliminado);
    if (!tareaExiste) {
        console.log("❌ No se encontró una tarea activa con ese ID.");
        return listaTareas; // Retornamos la lista original sin cambios
    }

    const nuevaLista = marcarEliminada(listaTareas, id);
    console.log("🗑️ Tarea eliminada correctamente.");
    return nuevaLista;
}

/*
    Se cumple con la pureza porque recibe una lista y un ID, y retorna una nueva lista
    con la tarea marcada como eliminada, no muta el array original.
 */
function marcarEliminada(lista: interfazTarea[], id: string): interfazTarea[] {
    return lista.map((tarea) => {
        if (tarea.getId() === id) {
            // se crea la copia eliminada usando el método del prototipo
            return tarea.setEliminado(true, new Date());
        }
        return tarea;
    });
}

function pedirId(): string {
    return prompt("Ingrese el ID de la tarea a eliminar: ") ?? "";
}