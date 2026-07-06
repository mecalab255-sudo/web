/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/prioridadesData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de prioridades del sistema.
 * Este archivo simula la tabla "Prioridades" de la futura
 * base de datos y define los niveles de importancia
 * aplicables a cuestionarios, evaluaciones, resultados y
 * necesidades de capacitación detectadas.
 * ==========================================================
 */

const PrioridadesData = [

    {
        id: 1,
        nombre: "Baja",
        descripcion: "Prioridad de bajo impacto. Puede atenderse posteriormente sin afectar de forma significativa el desempeño organizacional.",
        nivel: 1,
        peso: 1
    },

    {
        id: 2,
        nombre: "Media",
        descripcion: "Prioridad de impacto moderado. Requiere seguimiento y atención dentro de la planeación regular de capacitación.",
        nivel: 2,
        peso: 2
    },

    {
        id: 3,
        nombre: "Alta",
        descripcion: "Prioridad de alto impacto. Debe atenderse en un plazo corto para evitar afectaciones en productividad, calidad o desempeño.",
        nivel: 3,
        peso: 3
    },

    {
        id: 4,
        nombre: "Crítica",
        descripcion: "Prioridad de impacto crítico. Requiere atención inmediata debido a su relación con riesgos operativos, seguridad, cumplimiento o desempeño estratégico.",
        nivel: 4,
        peso: 4
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

PrioridadesData.forEach(Object.freeze);

Object.freeze(PrioridadesData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.PrioridadesData = PrioridadesData;