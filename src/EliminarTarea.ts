import { guardarTareasEnArchivo } from "./archivo.js";
import type { interfazTarea } from "./Tarea.js";
import { pedirId, validarID } from "./Validadores.js";



export async function eliminarTarea(listaTareas: interfazTarea[]): Promise<interfazTarea[]> {
    const idBuscado = pedirId();
    
    // aca se valida si el ID existe y no esta eliminado 
    const tareaExiste = validarID(listaTareas, idBuscado);

    if (!tareaExiste) {
        console.log("❌ No se encontró una tarea activa con ese ID.");
        return listaTareas; // Retornamos la lista original sin cambios
    }
    // Crea la lista con la tarea ya eliminada y guarda el cambio en el archivo JSON
    const nuevaLista = marcarEliminada(listaTareas, idBuscado);
    await guardarTareasEnArchivo(nuevaLista);

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
            return tarea.setEliminado(true);
        }
        return tarea;
    }); 
}

