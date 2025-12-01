export interface interfazTarea {
    id: string;
    titulo: string;
    descripcion: string;
    dificultad: Dificultad;
    vencimiento: Vencimiento;
    fechaCreacion: Date;
    ultimaModificacion: Date;
    estado: Estado;
    eliminado: boolean;
    getId(): string;
    getFechaCreacion(): Date;
    getTitulo(): string;
    setTitulo(nuevoTitulo: string, fecha: Date): interfazTarea;
    getDescripcion(): string;
    setDescripcion(nuevaDescripcion: string, fecha: Date): interfazTarea;
    getVencimiento(): Vencimiento;
    setVencimiento(nuevo: Vencimiento, fecha: Date): interfazTarea;
    getDificultad(): Dificultad;
    setDificultad(nueva: Dificultad, fecha: Date): interfazTarea;
    getEstado(): Estado;
    setEstado(nuevoEstado: Estado, fecha: Date): interfazTarea;
    getUltimaModificacion(): Date;
    setEliminado(eliminado: boolean): interfazTarea;
}
export type Dificultad = '⭐' | '⭐⭐' | '⭐⭐⭐';
export type Vencimiento = string | "No especificado";
export type Estado = '❗ Pendiente' | '🛠 En curso' | '✔ Terminada' | "❌ Cancelada";
export declare function constructorTarea(this: interfazTarea, id: string, titulo: string, descripcion: string, dificultad: Dificultad, vencimiento: Vencimiento, fechaCreacion: Date, ultimaModificacion: Date, estado: Estado, eliminado: boolean): void;
//# sourceMappingURL=Tarea.d.ts.map