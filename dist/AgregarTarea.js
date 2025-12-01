import { v4 as uuidv4 } from "uuid";
import { constructorTarea } from "./Tarea.js";
import { validarTitulo, validarDescripcion, validarVencimiento, validarSiNo } from "./Validadores.js";
import promptSync from "prompt-sync";
import { seleccionarDificultad, seleccionarEstado } from "./SelectEyD.js";
const prompt = promptSync();
export function agregarTarea(listaTareas) {
    const id = uuidv4();
    const titulo = agregarTitulo();
    const descripcion = agregarDescripcion();
    const estado = seleccionarEstado(); // Estado inicial siempre es "pendiente"
    const dificultad = seleccionarDificultad();
    const vencimiento = agregarVencimiento();
    const ultimaModificacion = new Date();
    const fechaCreacion = new Date();
    const tarea = crearTarea(id, titulo, estado, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion);
    return insertarTarea(listaTareas, tarea);
}
function insertarTarea(lista, tarea) {
    /*Aca lo que hago es recibir por parametro la lista de tareas y la tarea a insertar y devuevlo una nueva
    lista que copia con "..." todos los objetos de la lista anterior y le agrega el nuevo objeto a agregar*/
    return [...lista, tarea];
}
/*Crear tarea debe si o si recibir por parametro los datos para retornar el objeto tarea, porque si
llama desde alla las funciones impuras que retornan datos, entonces por conmposicion se vuelve una funcion
impura*/
function crearTarea(id, titulo, estado, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion) {
    const tarea = new constructorTarea(id, titulo, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion, estado, false);
    Object.freeze(tarea);
    return tarea;
}
/*
Para obtener el tiempo no puedo hacer uso de Date.now() porque:
-interactuo con el entorno, porque depende del reloj del sistema
-dos llamadas con los mismos argumentos retornan valores distintos: no hay transparencia referencial
Al usar epochMs obtengo un valor que se calcula por fuera de la funcion que
-cumple con transparencia referencial: Con el mismo epochMs siempre retorna el mismo número, no consulta el
reloj
-no provoca efectos secundarios, no muta nada
*/
export function agregarTitulo() {
    const titulo = prompt("Ingresa el Título: ") ?? "";
    if (validarTitulo(titulo)) {
        return titulo;
    }
    else {
        console.log("El título debe tener entre 1 y 100 caracteres.");
        return agregarTitulo();
    }
}
export function agregarDescripcion() {
    let descripcion = prompt("Ingresa la Descripción: ") ?? "";
    /*
    El operador ?? se llama operador de coalescencia nula (nullish coalescing operator).
    Su función: devolver el primer valor que no sea null ni undefined.
    Si prompt() devuelve una cadena → usa esa cadena.
    Si prompt() devuelve null → usa "" (cadena vacía).
    si el usuario presiona Enter sin escribir nada, el valor devuelto es "" (cadena vacía), no null.
    null solo aparece si la función prompt() del navegador es cancelada (clic en Cancelar). Por eso es necesario
    */
    if (descripcion.length === 0)
        descripcion = "Sin descripción";
    else if (validarDescripcion(descripcion) === false) {
        console.log("La descripción no debe exceder los 200 caracteres.");
        return agregarDescripcion();
    }
    else if (validarDescripcion(descripcion) === true) {
        return descripcion;
    }
    return descripcion;
}
export function agregarVencimiento() {
    const base = "No especificado";
    let opcion;
    do {
        opcion = (prompt("¿Desea agregar una fecha de vencimiento? (s/n): ") ?? "")
            .trim()
            .toLowerCase();
        if (!validarSiNo(opcion)) {
            console.log("Opción inválida. Use 's' o 'n'.");
        }
    } while (!validarSiNo(opcion));
    if (opcion === "n") {
        return base;
    }
    let vencimiento;
    let esValido = false;
    do {
        vencimiento = (prompt("Fecha de vencimiento (DD/MM/AAAA): ") ?? "").trim();
        if (!validarVencimiento(vencimiento)) {
            console.log("Formato inválido. Use DD/MM/AAAA.");
        }
        else {
            esValido = true;
        }
    } while (!esValido);
    return vencimiento;
}
//# sourceMappingURL=AgregarTarea.js.map