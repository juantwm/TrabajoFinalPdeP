import type { interfazTarea } from "./Tarea.js";
export declare function validarTitulo(titulo: string): boolean;
export declare function validarDescripcion(descripcion: string): boolean;
export declare function validarVencimiento(vencimiento: string): boolean;
export declare function validarDificultad(opcion: number): boolean;
export declare function validarEstado(opcion: number): boolean;
export declare function validarSiNo(opcion: string): boolean;
export declare function pedirId(): string;
export declare function validarID(listaDeTareas: interfazTarea[], idBuscado: string): interfazTarea | undefined;
export declare function revisarContenga(nuevaLista: interfazTarea[]): boolean;
export declare function tareasVencidas(listaTareas: interfazTarea[], hoy: Date): interfazTarea[];
//# sourceMappingURL=Validadores.d.ts.map