import { pedirTareaId } from "./BuscarTarea.js";
import type { interfazTarea } from "./Tarea.js";
import { modificarTarea } from "./ModificarTarea.js";

import promptSync from "prompt-sync";
const prompt = promptSync();

//revisamos que no este vacia
export function revisarContenga(nuevaLista:interfazTarea[]):boolean{
    if(nuevaLista.length===0){
        return false
    }
    return true;

}

//funcion mostrar tarea 
export function mostrarTarea(listaTareas:interfazTarea []){
    //revisamos que no este eleminada
   const listaTareasOrdenadas= ordenarTareasFecha(listaTareas);
    listaTareasOrdenadas.forEach((t)=>{
        if (t.eliminado === true) {
            console.log(t.getId() +"-:" + t.getTitulo());
        }
    });
}
//funcion mostrar tarea pendientes
export function mostrarPendientes(listaDeTareas:interfazTarea[]){
   const nuevaLista= listaDeTareas.filter((t)=> t.getEstado()==='❗ Pendiente' && t.eliminado === true );
   const resultado = revisarContenga(nuevaLista);
   if(resultado===false){
    console.log("no hay elementos en la lista");
    return;
   }
   mostrarTarea(nuevaLista);
}
//mostrar tarea en curso
export function mostrarCurso(listaDeTareas:interfazTarea[]){
   const nuevaLista= listaDeTareas.filter((t)=>t.getEstado() ==='🛠 En curso'&& t.eliminado === true);
   const resultado = revisarContenga(nuevaLista);
   if(resultado===false){
    console.log("no hay elementos en la lista");
    return;
   }
   mostrarTarea(nuevaLista);
}

//funcion mostrar terminadas
export function mostrarTerminadas(listaDeTareas:interfazTarea[]){
    const nuevaLista= listaDeTareas.filter((t)=> t.getEstado()==='✔ Terminada'&& t.eliminado === true);
   const resultado = revisarContenga(nuevaLista);
   if(resultado===false){
    console.log("no hay elementos en la lista");
    return;
   }
   mostrarTarea(nuevaLista);
}


//ordenamos por fecha de creacion
export function ordenarTareasFecha(listaDeTareas:interfazTarea[]):interfazTarea[]{
    //creamos copia asi despues usamos sort y no mutamos el original
    const copia=[...listaDeTareas];
    return copia.sort((a,b)=>a.getFechaCreacion().getTime() - b.getFechaCreacion().getTime())

}

//funcion mostrar a detalles
export function mostrarDetalles(listaDeTareas:interfazTarea[]){
   
    const tarea = pedirTareaId(listaDeTareas);

    if (!tarea) {
        console.log("No existe esa tarea.");
        return;
    }

    console.log("---------------");
    console.log("Nombre: " + tarea.getTitulo());
    console.log("Estado: " + tarea.getEstado());
    console.log("Fecha creación: " + tarea.getFechaCreacion());
    console.log("Última edición: " + tarea.getUltimaModificacion());
    console.log("Vencimiento: " + tarea.getVencimiento());
    console.log("Dificultad: " + tarea.getDificultad());
    console.log("---------------");

    const opcion = Number(prompt("¿Desea editarla? (1-Sí, 2-No): "));

    if (opcion === 1) {
        console.log("Redirigiendo a edición...");
        modificarTarea(tarea.getTitulo(),tarea.getId());   // SE EDITA LA MISMA TAREA MOSTRADA
    }
}