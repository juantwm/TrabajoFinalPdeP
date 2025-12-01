import promptSync from "prompt-sync";
const prompt = promptSync();
import { menuPrincipal } from "./Menus.js";
/*Como el objeto necesita ser reasginado para mantener la pureza en el uso del objeto uso let y no
const*/
let listaTareas = [];
// Iniciar el menú principal
menuPrincipal(listaTareas);
//# sourceMappingURL=index.js.map