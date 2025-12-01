import { promises as fs } from "fs";
import { constructorTarea, type interfazTarea } from "./Tarea.js";
import { validarTitulo, validarDescripcion, validarEstado, validarDificultad } from "./Validadores.js";

/*
    - Cuando la app arranca, tenemos que leer un archivo real del disco (“archivo.json”).
    - Ese archivo trae información cruda (texto)
    - Tenemos que convertir ese texto a objetos de JS
    - Luego, como JSON NO guarda prototipos ni métodos, debemos reconstruir cada tarea
    usando nuestro constructorTarea (para que vuelvan a tener getters, setters y freeze)
    - Además, chequeamos que los datos del archivo sean válidos (por si el archivo se corrompió,
    o se editó a mano)
    - Solo dejamos pasar tareas válidas
    - Finalmente, devolvemos esa lista al menú principal

*/

export async function leerTareasDesdeArchivo(): Promise<interfazTarea[]> {
    try {
        /*
            1) Leemos el archivo real del disco
            - Si existe, fs.readFile lo carga como texto
            - Si no existe, se va al catch
        */
        const texto = await fs.readFile("archivo.json", "utf8");

        /*
            2) Convertimos ese texto a objetos JS
            JSON.parse transforma un string JSON en arreglos/objetos planos
        */
        const tareasCrudas = JSON.parse(texto);

           // 3) Creamos un array donde vamos a ir metiendo SOLO las tareas válidas
        
        const tareasValidas: interfazTarea[] = [];


           // 4) Recorremos todas las tareas crudas para validarlas y reconstruirlas una por una.
    
        for (const t of tareasCrudas) {

            if (
                validarTitulo(t.titulo) &&
                validarDescripcion(t.descripcion) &&
                validarEstado(t.estado) &&
                validarDificultad(t.dificultad)
            ) {
                /*
                    5) RECONSTRUCCIÓN DE LA TAREA

                    Los objetos del JSON llegan sin nada, sin métodos y sin prototipo.
                    Necesitamos volver a convertirlos en un objeto Tarea REAL como
                    los que usa el resto del sistema

                    Para eso utilizamos:
                    new constructorTarea(...)

                */

                const tarea = new (constructorTarea as any)(
                    t.id,
                    t.titulo,
                    t.descripcion,
                    t.dificultad,
                    t.vencimiento,
                    new Date(t.fechaCreacion),
                    new Date(t.ultimaModificacion),
                    t.estado,
                    t.eliminado
                );

                Object.freeze(tarea);

                // Agregamos esta tarea reconstruida a la lista válida
                tareasValidas.push(tarea);
            }
        }

        return tareasValidas;

    } catch (error) {

        /*
            Si el archivo NO existe o hubo un error de lectura:
            → NO debemos romper el programa
            Simplemente devolvemos una lista vacía

            Cuando el usuario agregue su primera tarea,
            el archivo.json se creará automáticamente
        */
        return [];
    }
}


export async function guardarTareasEnArchivo(tareas: interfazTarea[]): Promise<void> {

    /*
        1) Convertimos las tareas a objetos

        JSON.stringify NO guarda métodos, ni prototipos, ni objetos congelados
        Por eso, antes de guardar, tenemos que convertir cada tarea en un objeto simple
    */
    const tareasPlanas = tareas.map(t => ({
        id: t.id,
        titulo: t.titulo,
        descripcion: t.descripcion,
        dificultad: t.dificultad,
        vencimiento: t.vencimiento,
        fechaCreacion: t.fechaCreacion,
        ultimaModificacion: t.ultimaModificacion,
        estado: t.estado,
        eliminado: t.eliminado
    }));

    /*
        2) Convertimos estos objetos planos a JSON con identación asi esta mas lindo
    */
    const texto = JSON.stringify(tareasPlanas, null, 2);

    /*
        3) Guardamos archivo.json.
           - Si existe, lo reemplaza.
           - Si no existe, lo crea.
    */
    await fs.writeFile("archivo.json", texto, "utf8");
}