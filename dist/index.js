import promptSync from "prompt-sync";
const prompt = promptSync();
import { menuPrincipal } from "./Menus.js";
import { leerTareasDesdeArchivo } from "./archivo.js";
// Necesitamos una función async autoejecutable para poder usar 'await' al inicio
(async () => {
    // 1. Cargamos las tareas del archivo
    let listaTareas = await leerTareasDesdeArchivo();
    // 2. Iniciamos el menú con las tareas cargadas
    await menuPrincipal(listaTareas);
})();
//# sourceMappingURL=index.js.map