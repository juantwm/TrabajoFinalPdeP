import type { interfazTarea } from "./Tarea.js";
import { modificarTarea } from "./ModificarTarea.js";
import { pedirId } from "./Validadores.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

// Revisamos que no este vacia
export function revisarContenga(nuevaLista: interfazTarea[]): boolean {
    return nuevaLista.length > 0;
}


/*
    Funcion que muestra todas las tareas, o muestra segun el filtro ingresado por el usuario (pendiente, en curso, etc)
    Si el usuario ingresa que quiere ver todas las tareas se muestran de estas, el id y el titulo. Luego se invoca para ver los detalles
    Si usario ingresa un filtro especifico (pendiente, en curso, etc), se muesta el ID y el titulo de las mismas, y nuevamente se invoca para ver los detalles
    El return es por si se modifica la tarea, entonces se va guardando el clon modificado hasta llegar al main menu
*/
export function mostrarTareas(listaTareas: interfazTarea[], opcion: number, filtroEspecifico: string) {

    if(listaTareas.length === 0)
    {
        console.log("ERROR. Debe ingresar al menos una tarea. \n");
        return listaTareas;
    }
    else
    {
        let listaTareasOrdenadas: interfazTarea[];

        if (opcion === 1) 
        {
            listaTareasOrdenadas = ordenarTareasFecha(listaTareas);
            listaTareasOrdenadas.forEach((t) => {
                if (t.eliminado === false) 
                {
                    console.log(`${t.getId()} - ${t.getTitulo()}`);
                }
            });

            
        } 
        else 
        {
            listaTareasOrdenadas = ordenarTareasFecha(listaTareas);
            listaTareasOrdenadas.forEach((t) => {
                if (t.getEstado() === filtroEspecifico && t.eliminado === false) 
                {
                    console.log(`${t.getId()} - ${t.getTitulo()}`);
                }
            });
            
            
        }

    }
    return mostrarDetalles(listaTareas);

    
}

// Ordenamos por fecha de creacion
export function ordenarTareasFecha(listaDeTareas: interfazTarea[]): interfazTarea[] {
    const copia = [...listaDeTareas];
    return copia.sort((a, b) => a.getFechaCreacion().getTime() - b.getFechaCreacion().getTime());
}

// Funcion mostrar detalles
export function mostrarDetalles(listaDeTareas: interfazTarea[]) {
    console.log(`
    -------------------------------------------
    ¿Deseas ver los detalles de alguna tarea?
    Introduce el ID para verla o 0 para volver.
    -------------------------------------------
    `);

    
    let idIngresado = pedirId();

    /* 
        Si el usuario ingresa 0 o nada, vuelve a menu principal, por el contrario busca el ID. Si este es correcto muestra los detalles de la tarea
    
    */
    if (idIngresado === "0" || idIngresado === "") {
        return listaDeTareas;
    }

    // Buscamos la tarea
    let tareaElegida = listaDeTareas.find(t => t.getId() === idIngresado);

    
    while (!tareaElegida) {
        console.log("❌ Ese ID no existe. Vuelva a intentarlo o ingrese 0 para volver.");
        idIngresado = pedirId();
        
        if (idIngresado === "0" || idIngresado === "") {
            return listaDeTareas;
        }
        tareaElegida = listaDeTareas.find(t => t.getId() === idIngresado);
    }

    
    console.log("\n--- DETALLES ---");
    console.log("Nombre: " + tareaElegida.getTitulo());
    console.log("Descripcion: " + tareaElegida.getDescripcion());
    console.log("Estado: " + tareaElegida.getEstado());
    console.log("Fecha creación: " + tareaElegida.getFechaCreacion().toLocaleDateString());
    console.log("Última edición: " + tareaElegida.getUltimaModificacion().toLocaleDateString());
    console.log("Vencimiento: " + tareaElegida.getVencimiento());
    console.log("Dificultad: " + tareaElegida.getDificultad());
    console.log("----------------\n");

    console.log("¿Desea editarla? [1] Sí / [0] No");
    const opcion = parseInt(prompt("Opción: "), 10);

    /*
        Si el usuario ingresa la opcion 1 se llama al metodo para modificar la tarea. El return es para guardar la copia modificada y que no se pierda en el "aire"
    */
    if (opcion === 1) {
        
        return modificarTarea(listaDeTareas, tareaElegida.getTitulo(), tareaElegida.getId());
    }
    return listaDeTareas;
}