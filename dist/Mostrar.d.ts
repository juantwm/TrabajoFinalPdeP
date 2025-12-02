import type { interfazTarea } from "./Tarea.js";
export declare function mostrarTareas(listaTareas: interfazTarea[], opcion: number, filtroEspecifico: string): interfazTarea[] | Promise<interfazTarea[]>;
export declare function ordenarTareasFecha(listaDeTareas: interfazTarea[]): interfazTarea[];
export declare function mostrarDetalles(listaDeTareas: interfazTarea[]): interfazTarea[] | Promise<interfazTarea[]>;
export declare function mostrarTareasVencidas(listaTareas: interfazTarea[]): void;
//# sourceMappingURL=Mostrar.d.ts.map