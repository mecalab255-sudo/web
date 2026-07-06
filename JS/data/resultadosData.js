/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/resultadosData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo inicial de resultados del sistema.
 * Este archivo simula la tabla "Resultados" de la futura
 * base de datos y almacena evaluaciones completadas por los
 * usuarios dentro del proceso DNC.
 *
 * Cada resultado representa una evaluación completa realizada
 * por un usuario sobre un cuestionario determinado. Las
 * respuestas individuales se almacenan por separado en
 * JS/data/respuestasData.js.
 * ==========================================================
 */

const ResultadosData = [

    {
        id: 1,
        usuarioId: 6,
        cuestionarioId: 1,
        asignacionId: 6,
        fecha: "2026-07-05",
        promedioGeneral: 4.2,
        estado: "COMPLETADO",
        observaciones: "Buen desempeño general en comunicación y colaboración.",
        activo: true
    },

    {
        id: 2,
        usuarioId: 6,
        cuestionarioId: 2,
        asignacionId: 11,
        fecha: "2026-07-05",
        promedioGeneral: 3.4,
        estado: "COMPLETADO",
        observaciones: "Desempeño aceptable en productividad, con oportunidad de mejora en organización operativa.",
        activo: true
    },

    {
        id: 3,
        usuarioId: 6,
        cuestionarioId: 3,
        asignacionId: 12,
        fecha: "2026-07-05",
        promedioGeneral: 2.8,
        estado: "COMPLETADO",
        observaciones: "Se detecta necesidad de reforzar seguridad, uso de EPP y prevención de riesgos.",
        activo: true
    },

    {
        id: 4,
        usuarioId: 7,
        cuestionarioId: 1,
        asignacionId: 7,
        fecha: "2026-07-05",
        promedioGeneral: 4.0,
        estado: "COMPLETADO",
        observaciones: "Buen nivel de comunicación y trabajo colaborativo.",
        activo: true
    },

    {
        id: 5,
        usuarioId: 7,
        cuestionarioId: 5,
        asignacionId: 13,
        fecha: "2026-07-05",
        promedioGeneral: 3.1,
        estado: "COMPLETADO",
        observaciones: "Requiere fortalecimiento en competencias técnicas de IoT y desarrollo.",
        activo: true
    },

    {
        id: 6,
        usuarioId: 8,
        cuestionarioId: 1,
        asignacionId: 8,
        fecha: "2026-07-05",
        promedioGeneral: 3.7,
        estado: "COMPLETADO",
        observaciones: "Comunicación adecuada, con posibilidad de mejorar la coordinación entre áreas.",
        activo: true
    },

    {
        id: 7,
        usuarioId: 8,
        cuestionarioId: 7,
        asignacionId: 15,
        fecha: "2026-07-05",
        promedioGeneral: 3.2,
        estado: "COMPLETADO",
        observaciones: "Se recomienda reforzar análisis de datos comerciales y uso de CRM.",
        activo: true
    },

    {
        id: 8,
        usuarioId: 9,
        cuestionarioId: 1,
        asignacionId: 9,
        fecha: "2026-07-05",
        promedioGeneral: 4.1,
        estado: "COMPLETADO",
        observaciones: "Buen desempeño en comunicación y colaboración.",
        activo: true
    },

    {
        id: 9,
        usuarioId: 9,
        cuestionarioId: 6,
        asignacionId: 14,
        fecha: "2026-07-05",
        promedioGeneral: 2.6,
        estado: "COMPLETADO",
        observaciones: "Se detecta necesidad de capacitación en diagnóstico remoto y manejo de clientes.",
        activo: true
    },

    {
        id: 10,
        usuarioId: 10,
        cuestionarioId: 8,
        asignacionId: 16,
        fecha: "2026-07-05",
        promedioGeneral: 3.0,
        estado: "COMPLETADO",
        observaciones: "Desempeño medio en análisis de costos. Se recomienda reforzar fundamentos financieros.",
        activo: true
    },

    {
        id: 11,
        usuarioId: 3,
        cuestionarioId: 4,
        asignacionId: 29,
        fecha: "2026-07-05",
        promedioGeneral: 3.6,
        estado: "COMPLETADO",
        observaciones: "Buen desempeño en liderazgo, con oportunidad de fortalecer desarrollo de talento.",
        activo: true
    },

    {
        id: 12,
        usuarioId: 5,
        cuestionarioId: 4,
        asignacionId: 30,
        fecha: "2026-07-05",
        promedioGeneral: 3.8,
        estado: "COMPLETADO",
        observaciones: "Desempeño favorable en liderazgo técnico y comunicación con el equipo.",
        activo: true
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

ResultadosData.forEach(Object.freeze);

Object.freeze(ResultadosData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.ResultadosData = ResultadosData;