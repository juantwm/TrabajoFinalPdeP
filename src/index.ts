import promptSync from "prompt-sync";
const prompt = promptSync();
import { menuPrincipal } from "./Menus.js";
import type { interfazTarea } from "./Tarea.js";



/*Como el objeto necesita ser reasginado para mantener la pureza en el uso del objeto uso let y no
const*/
let listaTareas : interfazTarea [] = [];

// Iniciar el menú principal
menuPrincipal(listaTareas);

