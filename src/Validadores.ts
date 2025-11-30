export function validarTitulo(titulo : string) : boolean {
    if (titulo.length < 100 && titulo.length > 0) return true
    else return false;
}

export function validarDescripcion(descripcion : string) : boolean {
    if (descripcion.length > 200) return true
    else return false;
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
    if (!regex.test(vencimiento)) return true
    else return false;
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