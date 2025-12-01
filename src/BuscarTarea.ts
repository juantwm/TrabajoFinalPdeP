import { mostrarTarea} from "./Mostrar.js";
import type { interfazTarea } from "./Tarea.js";
import promptSync from "prompt-sync";
const prompt = promptSync();


//------------------------------------------buscar id---------------------------

//funcion para pedir el id
function pedirId(): string {
    const id = prompt("Ingrese el id de la tarea: ").trim();
    return id;
}
//funcion que revisa que ese id pertenezca a una tarea
export function buscarPorId(listaDeTareas: interfazTarea[], id: string): interfazTarea | undefined { 

    const tareaEncontrada = listaDeTareas.find((t) => {
        return t.getId() === id && t.eliminado === true;
    });

    return tareaEncontrada;
}
//funcion completa donde me retorna una tarea que coincide con el id a buscar
export function pedirTareaId(listaDeTareas: interfazTarea[]): interfazTarea | undefined {
    console.log("lista de tareas:");
    mostrarTarea(listaDeTareas);

    const id = pedirId();
    const tarea = buscarPorId(listaDeTareas, id);
    if(!tarea){
        console.log("no se encontraron tareas");
        return undefined;

    }
    return tarea;
}

//---------------------------------- buscar por titulo ----------------------------

//1-pedir titulo impura
export function pedirTitulo(): string {
    const clave: string = prompt("ingresa el titulo a buscar: ").trim().toLowerCase();
    return clave;
}
//2-funcion pura que filtra por titulo
function retornarLista(listaDeTareas: interfazTarea[], clave: string): interfazTarea[] {

    const filtradas = listaDeTareas.filter((t) => {

        const tituloEnMinusculas = t.getTitulo().toLowerCase();

        if (tituloEnMinusculas.includes(clave) && t.eliminado === true) {
            return true;
        }
        return false;

    });
    return filtradas;
}

//3 funcion impura aca juntamos las otras 2 funciones 
export function buscarClave(listaDeTareas: interfazTarea[]): interfazTarea[]|undefined {

    const clavePedir = pedirTitulo();
    const tareas = retornarLista(listaDeTareas, clavePedir);
    if(!tareas){
        console.log("no se encontraron tareas");
        return undefined;

    }
    return tareas;
}