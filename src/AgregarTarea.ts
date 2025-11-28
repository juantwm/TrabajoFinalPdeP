import { v4 as uuidv4 } from "uuid";
import type { interfazTarea , Estado , Vencimiento , Dificultad } from "./Tarea.js";
import { constructorTarea } from "./Tarea.js";
import { validarTitulo, validarDescripcion , validarVencimiento, validarDificultad} from "./Validadores.js";
import promptSync from "prompt-sync";
const prompt = promptSync();

export function agregarTarea(listaTareas : interfazTarea[]) : interfazTarea[] {
    const id = uuidv4();
    const titulo = agregarTitulo();
    const descripcion = agregarDescripcion();
    const estado: Estado = "❗ Pendiente"; // Estado inicial siempre es "pendiente"
    const dificultad: Dificultad= agregarDificultad();
    const vencimiento : Vencimiento= agregarVencimiento();
    const ultimaModificacion = new Date();
    const fechaCreacion = new Date();
    const tarea : interfazTarea = crearTarea
    (id, titulo, estado, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion);
    return insertarTarea(listaTareas, tarea);
}

function insertarTarea (lista : interfazTarea[], tarea: interfazTarea) : interfazTarea[] {
/*Aca lo que hago es recibir por parametro la lista de tareas y la tarea a insertar y devuevlo una nueva
lista que copia con "..." todos los objetos de la lista anterior y le agrega el nuevo objeto a agregar*/
    return [...lista, tarea];
}

/*Crear tarea debe si o si recibir por parametro los datos para retornar el objeto tarea, porque si
llama desde alla las funciones impuras que retornan datos, entonces por conmposicion se vuelve una funcion 
impura*/

function crearTarea (id : string, titulo : string,  estado: Estado, descripcion : string, dificultad : Dificultad, vencimiento: Vencimiento, fechaCreacion: Date, ultimaModificacion: Date ): interfazTarea {
    const tarea : interfazTarea = new (constructorTarea as any) ( id, titulo, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion, estado, false);
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

function agregarTitulo (): string {
    const titulo : string = prompt("Título: ") ?? "";
    if (validarTitulo(titulo)) {
        return titulo;
    } 
    else
    {
    console.log("El título debe tener entre 1 y 100 caracteres.");
    return agregarTitulo();
    }
}

function agregarDescripcion (): string {
    let descripcion : string  = prompt("Descripción: ") ?? "";
    /*
    El operador ?? se llama operador de coalescencia nula (nullish coalescing operator).
    Su función: devolver el primer valor que no sea null ni undefined.
    Si prompt() devuelve una cadena → usa esa cadena.
    Si prompt() devuelve null → usa "" (cadena vacía).
    si el usuario presiona Enter sin escribir nada, el valor devuelto es "" (cadena vacía), no null.
    null solo aparece si la función prompt() del navegador es cancelada (clic en Cancelar). Por eso es necesario
  */
    if (descripcion.length === 0) descripcion = "Sin descripción";
    else if (!validarDescripcion(descripcion)) 
    {
        console.log("La descripción no debe exceder los 200 caracteres.");
        return agregarDescripcion();
    }
    else if (validarDescripcion(descripcion)) {
    return descripcion;
    }
    return descripcion
}

function agregarVencimiento (): Vencimiento {
    const base: Vencimiento = "No especificado";
    /*El for (;;) { ... } es una forma compacta de escribir un bucle infinito.
    cuando escribo for (inicializacion;condicion;actualizacion) sin nada, es decir: for(;;)
    -No hay inicialización
    -No hay condición
    -No hay actualización
    Por lo tanto, la condición del bucle siempre es “verdadera”.
    Como quiero repetir hasta que el usuario ingrese algo válido. El bucle for (;;) mantiene la ejecución en un ciclo infinito, y se rompe solo
    cuando aparece un return, de modo que con "continue" repite el bucle.
    Es idéntico a while (true), pero no depende de una variable bandera por lo tanto es mas simple porque usa menos variables.
    */
for (;;) {
    const opcion = (prompt("¿Desea agregar una fecha de vencimiento? (s/n): ") ?? "").trim().toLowerCase();
    if (opcion === "n") return base;
    if (opcion !== "s") { console.log("Opción inválida"); continue; }
    for (;;) {
        const vencimiento = (prompt("Fecha de vencimiento (DD/MM/AAAA): ") ?? "").trim();
            if (validarVencimiento(vencimiento)) { console.log("Formato inválido. Use DD/MM/AAAA."); continue; }
                return vencimiento as Vencimiento;
    }
            }
}

function agregarDificultad () : Dificultad 
{
    let opcion : string, valido : number =0;
    let dificultad : Dificultad = "⭐";

    do
    {
        opcion = (prompt("¿Desea agregar una dificultad? (s/n): ") ?? "").toLowerCase();
        if (opcion !== 's' && opcion !== 'n') console.log("Opción inválida");
        else if (opcion === 'n') 
        {
            return dificultad;
        }
        else if (opcion === 's') 
        {
            do 
            {
                let cadena : string = (prompt("Dificultad (facil/media/dificil): ") ?? "").toLowerCase();
                if (!validarDificultad(dificultad)) {
                    console.log("Dificultad inválida. Use facil, media o dificil.");
                }
                if (cadena === 'facil')  return '⭐' as Dificultad;
                if (cadena === 'media')  return '⭐⭐' as Dificultad;
                if (cadena === 'dificil') return '⭐⭐⭐' as Dificultad;
                } while (valido===0);
        }
                } while (valido===0);
            return dificultad;
}