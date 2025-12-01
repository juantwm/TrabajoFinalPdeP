import type {interfazTarea} from "./Tarea.js";
import { seleccionarDificultad, seleccionarEstado } from "./SelectEyD.js";
import { agregarDescripcion, agregarVencimiento, agregarTitulo } from "./AgregarTarea.js";
import { menuModificarTarea } from "./Menus.js";



export function modificarTarea(listaTareas : interfazTarea[], tituloTarea: string, idTarea: String) : interfazTarea[]
{
    let opcion: Number = 0;

    opcion = menuModificarTarea(tituloTarea);
    
    let tareaOriginal = listaTareas.find( t => t.getId() === idTarea);

    if(!tareaOriginal)
    {
        console.log("¡ERROR! ❌ No se encontro la tarea ❌");
        return listaTareas;
    }

    //tareaModificada es una varibale de tipo interfazTarea que se va a utilizar para guardar los cambios

    let tareaModificada: interfazTarea | null = null;
    let fechaHoy = new Date();

    switch(opcion)
    {
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
        

    }

            if(tareaModificada)
            {
                console.log('¡✅ Tarea modificada exitosamente!.')

                // se llama a 'reemplazarEnLista'. 
                // Le pasamos la lista vieja y la tarea nueva (modificada).
                // Esta funcion devuelve una lista NUEVA con el cambio agregado.
                return reemplazarEnLista(listaTareas, tareaModificada); 

            }
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


