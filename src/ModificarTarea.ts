import type {interfazTarea} from "./Tarea.js";
import { seleccionarDificultad, seleccionarEstado } from "./SelectEyD.js";
import { agregarDescripcion, agregarVencimiento, agregarTitulo } from "./AgregarTarea.js";
import promptSync from "prompt-sync";
import { guardarTareasEnArchivo } from "./archivo.js";
const prompt = promptSync();



export async function modificarTarea(listaTareas : interfazTarea[], tituloTarea: string, idTarea: String) : Promise <interfazTarea[]>
{
    
    let opcion : number;
    do
    {
        console.log('Estas editando la tarea ', tituloTarea);
        console.log("\n¿Qué desea modificar?");
        console.log("[1] Descripción");
        console.log("[2] Estado");
        console.log("[3] Dificultad");
        console.log("[4] Vencimiento");
        console.log("[5] Título");
        console.log("[0] Para volver al menú.");
        
        let tareaOriginal = listaTareas.find( t => t.getId() === idTarea);

        if(!tareaOriginal)
        {
            console.log("¡ERROR! ❌ No se encontro la tarea ❌");
            return listaTareas;
        }

        opcion = parseInt(prompt("Elija una opción: "), 10);

        //tareaModificada es una varibale de tipo interfazTarea que se va a utilizar para guardar los cambios

        let tareaModificada: interfazTarea | null = null;
        let fechaHoy = new Date();

        switch(opcion)
        {
            case 0:
                console.log("¡Volviendo al menu principal!");
            break;
            case 1:
                    /*
                        Primero se le pide al usuario los nuevos valores para modificar la variable deseada.
                        Luego, como los sets del prototipo tarea crean un nuevo objeto, es decir clonan la tarea, este clon 
                        se le asigna a tareaModificada. Asi mismo, con el resto de los atributos.
                    */
                    const nuevaDescripcion = agregarDescripcion();
                    tareaModificada = tareaOriginal.setDescripcion(nuevaDescripcion, fechaHoy);

                    console.log('¡✅ Datos guardados!.');
            break;


            case 2:

                    const nuevoEstado = seleccionarEstado();
                    tareaModificada = tareaOriginal.setEstado(nuevoEstado, fechaHoy);
                    console.log('¡✅ Datos guardados!.');
            break;

            case 3:

                    const nuevaDificultad = seleccionarDificultad();
                    tareaModificada = tareaOriginal.setDificultad(nuevaDificultad, fechaHoy);
                    console.log('¡✅ Datos guardados!.');
            break;

            case 4:

                    const nuevoVencimiento = agregarVencimiento();
                    tareaModificada = tareaOriginal.setVencimiento(nuevoVencimiento, fechaHoy);
                    console.log('¡✅ Datos guardados!.');
            break;


            case 5:

                    const nuevoTitulo = agregarTitulo();
                    tareaModificada = tareaOriginal.setTitulo(nuevoTitulo, fechaHoy);
                    console.log('¡✅ Datos guardados!.');

            break;

            default:
                console.log("\n❌ Opción no válida, intenta de nuevo.");
            break;

            

        }

                if(tareaModificada)
                {
                    console.log('¡✅ Tarea modificada exitosamente!.')

                    // se llama a 'reemplazarEnLista'. 
                    // Le pasamos la lista vieja y la tarea nueva (modificada).
                    // Esta funcion devuelve una lista NUEVA con el cambio agregado.

                    // Se crea una lista para guardar los cambios y pasarlos al archivo JSON
                    const nuevaLista = reemplazarEnLista(listaTareas, tareaModificada);
                    await guardarTareasEnArchivo(nuevaLista);

                    return nuevaLista; 

                }


    }while(opcion!==0);

    return listaTareas;
}

function reemplazarEnLista(lista: interfazTarea[], tareaNueva: interfazTarea): interfazTarea[] {
    /*
    Se crea un array NUEVO, con los cambios nuevos.
    */
    return lista.map(tarea => 
        
        tarea.getId() === tareaNueva.getId() ? tareaNueva : tarea  
        // SI: En el nuevo array, se pone la tarea nueva (la tarea modificada).
        // NO: En el nuevo array, se deja la tarea sin modificar.
    );
}


