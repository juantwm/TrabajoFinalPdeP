// =================================================================
// 🧪 FUNCIONES PURAS (Lógica de Negocio)
// =================================================================
/**
 * Función Pura: Calcula el total de elementos activos.
 * No modifica nada, solo recibe y retorna.
 */
const contarActivas = (lista) => lista.filter(t => !t.eliminado).length;
/**
 * Función Pura: Calcula porcentaje matemático simple.
 */
const calcularPorcentaje = (cantidad, total) => total === 0 ? "0.0%" : ((cantidad / total) * 100).toFixed(1) + "%";
/**
 * Función de Orden Superior (Higher-Order Function)
 * Recibe una lista, un total y una función 'extractor' que sabe qué propiedad mirar.
 * Devuelve una estructura de datos con el reporte.
 */
function generarReporte(lista, total, extractor, // Función que extrae el dato (ej: getEstado)
valoresPosibles) {
    // Trabajamos solo con una proyección de las tareas activas
    const activas = lista.filter(t => !t.eliminado);
    // Usamos map para transformar cada valor posible en un objeto de reporte
    return valoresPosibles.map(valor => {
        // Usamos reduce para contar (Acumulador)
        const cantidad = activas.reduce((acc, tarea) => {
            return extractor(tarea) === valor ? acc + 1 : acc;
        }, 0);
        return {
            categoria: valor,
            cantidad: cantidad,
            porcentaje: calcularPorcentaje(cantidad, total)
        };
    });
}
// =================================================================
// 👁️ FUNCIÓN IMPURA (Entrada/Salida)
// Solo esta función se encarga de "mostrar" o interactuar con el mundo
// =================================================================
export function mostrarEstadisticas(listaTareas) {
    console.clear();
    console.log("\n📊 === REPORTE ESTADÍSTICO (Funcional) === 📊");
    // 1. Obtenemos datos crudos
    const total = contarActivas(listaTareas);
    console.log(`Total de Tareas Activas: ${total}`);
    if (total === 0) {
        console.log("⚠️ No hay datos para procesar.");
        return;
    }
    // 2. Calculamos Reporte de ESTADOS (Transformación pura)
    console.log("\n🔎 [Desglose por Estado]");
    const estados = ['❗ Pendiente', '🛠 En curso', '✔ Terminada', '❌ Cancelada'];
    // Llamada funcional: pasamos la función .getEstado como argumento
    const statsEstado = generarReporte(listaTareas, total, (t) => t.getEstado(), estados);
    statsEstado.forEach(item => {
        console.log(`   ${item.categoria}: ${item.cantidad} (${item.porcentaje})`);
    });
    // 3. Calculamos Reporte de DIFICULTAD (Transformación pura)
    console.log("\n🔎 [Desglose por Dificultad]");
    const dificultades = ['⭐', '⭐⭐', '⭐⭐⭐'];
    // Llamada funcional: pasamos la función .getDificultad como argumento
    const statsDificultad = generarReporte(listaTareas, total, (t) => t.getDificultad(), dificultades);
    statsDificultad.forEach(item => {
        console.log(`   ${item.categoria}: ${item.cantidad} (${item.porcentaje})`);
    });
    console.log("-----------------------------------------");
}
//# sourceMappingURL=Estadisticas.js.map