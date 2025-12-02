import type { interfazTarea, Estado, Dificultad } from "./Tarea.js";

type ReporteItem = {
    categoria: string;
    cantidad: number;
    porcentaje: string;
};

// =================================================================
// 🧪 FUNCIONES PURAS
// =================================================================

const contarActivas = (lista: interfazTarea[]): number => 
    lista.filter(t => !t.eliminado).length;

const calcularPorcentaje = (cantidad: number, total: number): string =>
    total === 0 ? "0.0%" : ((cantidad / total) * 100).toFixed(1) + "%";

/**
 * Función Genérica Pura (Sin restricciones de tipo)
 */
function generarReporte<T>(
    lista: interfazTarea[], 
    total: number, 
    extractor: (t: interfazTarea) => T, 
    valoresPosibles: T[]
): ReporteItem[] {
    
    const activas = lista.filter(t => !t.eliminado);

    return valoresPosibles.map(valor => {
        const cantidad = activas.reduce((acc, tarea) => {
            // Comparamos valores de cualquier tipo
            return extractor(tarea) === valor ? acc + 1 : acc;
        }, 0);

        return {
            // ⚠️ IMPORTANTE: Convertimos a String para mostrarlo en el reporte
            categoria: String(valor), 
            cantidad: cantidad,
            porcentaje: calcularPorcentaje(cantidad, total)
        };
    });
}

// =================================================================
// 👁️ FUNCIÓN IMPURA (Mostrar)
// =================================================================

export function mostrarEstadisticas(listaTareas: interfazTarea[]) {
    console.clear();
    console.log("\n📊 === REPORTE ESTADÍSTICO (Genérico) === 📊");

    const total = contarActivas(listaTareas);
    console.log(`Total de Tareas Activas: ${total}`);

    if (total === 0) {
        console.log("⚠️ No hay datos para procesar.");
        return;
    }

    // 1. Estados (T es string)
    console.log("\n🔎 [Desglose por Estado]");
    const estados: Estado[] = ['❗ Pendiente', '🛠 En curso', '✔ Terminada', '❌ Cancelada'];
    const statsEstado = generarReporte(listaTareas, total, (t) => t.getEstado(), estados);
    imprimirTabla(statsEstado);

    // 2. Dificultad (T es string)
    console.log("\n🔎 [Desglose por Dificultad]");
    const dificultades: Dificultad[] = ['⭐', '⭐⭐', '⭐⭐⭐'];
    const statsDificultad = generarReporte(listaTareas, total, (t) => t.getDificultad(), dificultades);
    imprimirTabla(statsDificultad);

    console.log("-----------------------------------------");
}

// Helper para no repetir el console.log
function imprimirTabla(datos: ReporteItem[]) {
    datos.forEach(item => {
        console.log(`   ${item.categoria}: ${item.cantidad} (${item.porcentaje})`);
    });
}