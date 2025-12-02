import type { interfazTarea, Vencimiento } from "./Tarea.js";

import promptSync from "prompt-sync";
const prompt = promptSync();

export function validarTitulo(titulo : string) : boolean {
    if (titulo.length < 100 && titulo.length > 0) return true
    else return false;
}

export function validarDescripcion(descripcion : string) : boolean {
    if (descripcion.length <= 200) 
    {
        return true
    }
    else
    {
        return false;
    } 
}

export function validarVencimiento(vencimiento: string) : boolean {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20\d{2})$/;
    /*
    Pide al usuario una fecha.
    Usa expresiones regulares (regex) para validar el formato.
    ^(0[1-9]|[12][0-9]|3[01]) → día válido (01 a 31).
    \/(0[1-9]|1[0-2]) → barra / y mes válido (01 a 12).
    \/(20\d{2})$ → barra / y un año entre 2000 y 2099.
    Si no coincide (!regex.test(...)), muestra error y repite el bucle.
    Si es correcto, marca valido = 1 y sale.
    */
    if (!regex.test(vencimiento)) return false
    else return true;
}

export function validarDificultad(opcion : number) : boolean {
    if (opcion === 1 || opcion === 2 || opcion === 3)
    {
        return true;
    } 
    else
    {
        return false;
    } 
}


export function validarEstado(opcion : number) : boolean 
{   
    if(opcion === 1 || opcion === 2 || opcion === 3 || opcion ===4)
    {
        return true
    }
    else
    {
        return false;
    }
}

export function validarSiNo(opcion: string): boolean {
    return opcion === "s" || opcion === "n";
}


export function pedirId() 
{
    
    const id = (prompt("Ingrese el valor:") ?? "").trim();
    return id;
}


export function validarID(listaDeTareas: interfazTarea[], idBuscado: string): interfazTarea | undefined 
{ 

    const tareaEncontrada = listaDeTareas.find((t) => {
        return t.getId() === idBuscado && t.eliminado === false;
    });

    return tareaEncontrada;
}

// Revisamos que no este vacia (y que tenga al menos una tarea activa)
export function revisarContenga(nuevaLista: interfazTarea[]): boolean {

    // 1. Filtramos las tareas activas
    const tareasActivas = nuevaLista.filter(t => t.eliminado === false);

    // 2. Si la cantidad es mayor a 0, devolvemos TRUE
    if (tareasActivas.length > 0) {
        return true;
    }

    // 3. Si no hay activas, devolvemos FALSE
    return false;
}



export function tareasVencidas(listaTareas : interfazTarea[], hoy : Date) : interfazTarea[] {
    const vencidas = listaTareas.filter(tarea => {
        const v = tarea.getVencimiento();
        const fechaVenc = parsearFecha(v);

        if (fechaVenc === null) return false;   // sin fecha → no se considera vencida

        // tarea vencida si su fecha es anterior a hoy
        return fechaVenc < hoy;
    })
    return vencidas;
}

function parsearFecha(v: Vencimiento): Date | null {
    if (v === "No especificado") return null;

    const [diaStr, mesStr, anioStr] = v.split("/");
    const dia = Number(diaStr);
    const mes = Number(mesStr) - 1; // en Date: 0 = enero, 11 = diciembre
    const anio = Number(anioStr);

    return new Date(anio, mes, dia);
}