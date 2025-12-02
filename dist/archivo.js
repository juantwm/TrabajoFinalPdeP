import { promises as fs } from "fs";
import { constructorTarea } from "./Tarea.js";
import { validarTitulo, validarDescripcion, validarEstado, validarDificultad } from "./Validadores.js";
//devuelve una promesa que cuando termina devuelve un array de intefaz tarea
export async function leerTareasDesdeArchivo() {
    try {
        const RUTA_ARCHIVO = "./src/archivo.json";
        //va al disco buscar el archivo.json y lo trae pero como se demora en hacerlo hace usamos una promesa
        const texto = await fs.readFile(RUTA_ARCHIVO, "utf8");
        //convertimos el archivo leido en un objeto
        const tareasCrudas = JSON.parse(texto);
        // 3) Creamos un array donde vamos a ir metiendo solo las tareas válidas,esto lo hacemos porque pueden ir tarea corruptas
        let tareasValidas = [];
        // 4) Recorremos todas las tareas crudas para validarlas y reconstruirlas una por una.
        for (const t of tareasCrudas) {
            if (validarTitulo(t.titulo) &&
                validarDescripcion(t.descripcion)) {
                /*RECONSTRUCCIÓN DE LA TAREA

                    Los objetos del JSON llegan sin nada, sin métodos y sin prototipo.
                    Necesitamos volver a convertirlos en un objeto Tarea REAL como
                    los que usa el resto del sistema

                    Para eso utilizamos:
                    new constructorTarea(...)*/
                const tarea = new constructorTarea(//cuando llamo al contructor ya le paso los prototipos en este los pasa 
                t.id, //haciendo eso leemos el archivo tal cual del Json
                t.titulo, t.descripcion, t.dificultad, t.vencimiento, new Date(t.fechaCreacion), new Date(t.ultimaModificacion), t.estado, t.eliminado);
                //freeze solo bloquea los atributos
                Object.freeze(tarea);
                // tareasValidas es un array nuevo local y es temporal
                tareasValidas = [...tareasValidas, tarea];
            }
        }
        return tareasValidas;
    }
    catch (error) {
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
export async function guardarTareasEnArchivo(tareas) {
    const RUTA_ARCHIVO = "./src/archivo.json";
    /*
        1) Convertimos las tareas a objetos

        JSON.stringify NO guarda métodos, ni prototipos, ni objetos congelados
        Por eso, antes de guardar, tenemos que convertir cada tarea en un objeto simple
    */
    //map lo que hace es nos devuelve un nuevo array,sin metodos
    const tareasPlanas = tareas.map(t => ({
        id: t.id, //toma el valor de la tarea t.id y guardalo en id
        titulo: t.titulo,
        descripcion: t.descripcion,
        dificultad: t.dificultad,
        vencimiento: t.vencimiento,
        fechaCreacion: t.fechaCreacion,
        ultimaModificacion: t.ultimaModificacion,
        estado: t.estado,
        eliminado: t.eliminado
    }));
    // tarea planas es un array de objetos esto lo pasamos a texto ,2 es la identacion ,null es que no hay cambio,stringify convierte objetos a texto
    const texto = JSON.stringify(tareasPlanas, null, 2);
    //sobrescribe el archivo.json,await es una promesa que le dice que espere que escriba el texto
    await fs.writeFile(RUTA_ARCHIVO, texto, "utf8");
}
//# sourceMappingURL=archivo.js.map