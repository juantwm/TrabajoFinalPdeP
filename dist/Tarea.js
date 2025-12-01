export function constructorTarea(id, titulo, descripcion, dificultad, vencimiento, fechaCreacion, ultimaModificacion, estado, eliminado) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.dificultad = dificultad;
    this.vencimiento = vencimiento;
    this.fechaCreacion = fechaCreacion;
    this.ultimaModificacion = ultimaModificacion;
    this.estado = estado;
    this.eliminado = eliminado;
}
constructorTarea.prototype.getId = function () {
    return this.id;
};
constructorTarea.prototype.getFechaCreacion = function () {
    return this.fechaCreacion;
};
constructorTarea.prototype.getTitulo = function () {
    return this.titulo;
};
/*
Los setter reciben los atributos necesarios y retornan objetos nuevos tarea, con una copia (usando spread ...) de los
atributos que no son modificados
*/
constructorTarea.prototype.setTitulo = function (nuevoTitulo, fecha) {
    const copia = {
        ...this,
        titulo: nuevoTitulo,
        ultimaModificacion: fecha,
    };
    /*
    Copia es un objeto literal creado con spread. Ese objeto pierde los métodos del prototipo de constructorTarea
    de modo que mediante setPrototypeOf le indico al programa que ese objeto plano obtenga todos los metodos
    del prototipo, dicho de otras palabras setprototypeod significa: hacer que ese objeto sea un objeto del
    prototipo de constructorTarea
    */
    Object.setPrototypeOf(copia, constructorTarea.prototype);
    Object.freeze(copia);
    return copia;
};
constructorTarea.prototype.getDescripcion = function () {
    return this.descripcion;
};
// ...this copia todo, menos lo que vas a modificar.
constructorTarea.prototype.setDescripcion = function (nuevaDescripcion, fecha) {
    const copia = {
        ...this,
        descripcion: nuevaDescripcion,
        ultimaModificacion: fecha,
    };
    Object.setPrototypeOf(copia, constructorTarea.prototype);
    Object.freeze(copia);
    return copia;
};
constructorTarea.prototype.getEstado = function () {
    return this.estado;
};
constructorTarea.prototype.setEstado = function (nuevoEstado, fecha) {
    const copia = {
        ...this,
        estado: nuevoEstado,
        ultimaModificacion: fecha,
    };
    Object.setPrototypeOf(copia, constructorTarea.prototype);
    Object.freeze(copia);
    return copia;
};
constructorTarea.prototype.getDificultad = function () {
    return this.dificultad;
};
constructorTarea.prototype.setDificultad = function (nuevaDificultad, fecha) {
    const copia = {
        ...this,
        dificultad: nuevaDificultad,
        ultimaModificacion: fecha,
    };
    Object.setPrototypeOf(copia, constructorTarea.prototype);
    Object.freeze(copia);
    return copia;
};
constructorTarea.prototype.getVencimiento = function () {
    return this.vencimiento;
};
constructorTarea.prototype.setVencimiento = function (nuevoVencimiento, fecha) {
    const copia = {
        ...this,
        vencimiento: nuevoVencimiento,
        ultimaModificacion: fecha,
    };
    Object.setPrototypeOf(copia, constructorTarea.prototype);
    Object.freeze(copia);
    return copia;
};
constructorTarea.prototype.getUltimaModificacion = function () {
    return this.ultimaModificacion;
};
constructorTarea.prototype.setEliminado = function (eliminado) {
    const copia = {
        ...this,
        eliminado,
    };
    Object.setPrototypeOf(copia, constructorTarea.prototype);
    Object.freeze(copia);
    return copia;
};
//# sourceMappingURL=Tarea.js.map