/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/cuestionariosData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo inicial de cuestionarios del sistema.
 * Este archivo simula la tabla "Cuestionarios" de la futura
 * base de datos y define evaluaciones clasificadas por área,
 * categoría, prioridad y competencias relacionadas.
 *
 * Las preguntas se administran de forma independiente en
 * JS/data/preguntasData.js para mantener una estructura
 * normalizada y preparada para migración a base de datos.
 * ==========================================================
 */

const CuestionariosData = [

    {
        id: 1,
        titulo: "Comunicación y Clima Laboral",
        descripcion: "Evalúa la comunicación interna, el respeto, la colaboración y el ambiente de trabajo entre colaboradores.",
        categoriaId: 3,
        prioridadId: 3,
        areaIds: [],
        competenciaIds: [4, 8],
        aplicaTodasLasAreas: true,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 2,
        titulo: "Productividad y Organización Operativa",
        descripcion: "Evalúa la organización del trabajo, cumplimiento de tareas, orden en el área y eficiencia operativa.",
        categoriaId: 2,
        prioridadId: 2,
        areaIds: [3],
        competenciaIds: [3, 4, 11],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 3,
        titulo: "Seguridad e Higiene Operativa",
        descripcion: "Evalúa el cumplimiento de normas de seguridad, uso de EPP, prevención de riesgos y orden en espacios productivos.",
        categoriaId: 1,
        prioridadId: 3,
        areaIds: [3],
        competenciaIds: [10, 11],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 4,
        titulo: "Liderazgo y Gestión de Equipos",
        descripcion: "Evalúa habilidades de liderazgo, comunicación, delegación, motivación y desarrollo del talento en perfiles con personal a cargo.",
        categoriaId: 4,
        prioridadId: 3,
        areaIds: [],
        competenciaIds: [5, 6, 7, 8],
        aplicaTodasLasAreas: true,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 5,
        titulo: "Competencias Técnicas de IoT y Desarrollo",
        descripcion: "Evalúa conocimientos técnicos relacionados con arquitectura IoT, protocolos de comunicación, programación y prototipado.",
        categoriaId: 12,
        prioridadId: 3,
        areaIds: [4],
        competenciaIds: [12, 13, 14],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 6,
        titulo: "Atención al Cliente y Soporte Técnico",
        descripcion: "Evalúa la capacidad para diagnosticar fallas, atender clientes, resolver quejas y brindar soporte técnico oportuno.",
        categoriaId: 11,
        prioridadId: 2,
        areaIds: [7],
        competenciaIds: [18, 19],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 7,
        titulo: "Gestión Comercial y CRM",
        descripcion: "Evalúa competencias comerciales relacionadas con análisis de datos, gestión CRM, seguimiento de clientes y ventas B2B.",
        categoriaId: 8,
        prioridadId: 2,
        areaIds: [5],
        competenciaIds: [15, 16],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 8,
        titulo: "Administración Financiera y Costos",
        descripcion: "Evalúa competencias relacionadas con análisis de costos, rentabilidad, presupuestos y control financiero.",
        categoriaId: 8,
        prioridadId: 2,
        areaIds: [6],
        competenciaIds: [20],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 9,
        titulo: "Gestión de Recursos Humanos",
        descripcion: "Evalúa competencias relacionadas con entrevista por competencias, legislación laboral, administración de personal y procesos de talento humano.",
        categoriaId: 13,
        prioridadId: 3,
        areaIds: [2],
        competenciaIds: [7, 21, 22],
        aplicaTodasLasAreas: false,
        activo: true,
        fechaCreacion: "2026-07-05"
    },

    {
        id: 10,
        titulo: "Cultura Sustentable y Calidad",
        descripcion: "Evalúa la conciencia sustentable, orientación a la calidad, responsabilidad ambiental y mejora continua dentro de la organización.",
        categoriaId: 9,
        prioridadId: 3,
        areaIds: [],
        competenciaIds: [1, 2],
        aplicaTodasLasAreas: true,
        activo: true,
        fechaCreacion: "2026-07-05"
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

CuestionariosData.forEach((cuestionario) => {

    Object.freeze(cuestionario.areaIds);

    Object.freeze(cuestionario.competenciaIds);

    Object.freeze(cuestionario);

});

Object.freeze(CuestionariosData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.CuestionariosData = CuestionariosData;