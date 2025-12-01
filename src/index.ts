import promptSync from "prompt-sync";
const prompt = promptSync();

import { constructorTarea , type interfazTarea } from "./Tarea.js";

import { menuPrincipal } from "./Menus.js";


/*Como el objeto necesita ser reasginado para mantener la pureza en el uso del objeto uso let y no
const*/
export let listaTareas: interfazTarea[] = [];

// Iniciar el menú principal
menuPrincipal();

/*
//instruccion para agregar tarea a la lista
listaTareas = agregarTarea(listaTareas);

//instruccion para eliminar tarea de la lista
listaTareas = eliminarTarea(listaTareas);
*/