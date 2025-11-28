import promptSync from "prompt-sync";
const prompt = promptSync();

import { constructorTarea , type interfazTarea } from "./Tarea.js";
import { agregarTarea } from "./AgregarTarea.js"

/*Como el objeto necesita ser reasginado para mantener la pureza en el uso del objeto uso let y no
const*/
export let listaTareas: interfazTarea[] = [];

//instruccion para agregar tarea a la lista
listaTareas = agregarTarea(listaTareas);
