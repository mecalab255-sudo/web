/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/asignacionesData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo inicial de asignaciones del sistema.
 * Este archivo simula la tabla "Asignaciones" de la futura
 * base de datos y define qué cuestionarios deben responder
 * determinados usuarios, áreas o puestos.
 *
 * Cada asignación relaciona un cuestionario con un destino
 * específico mediante el campo tipoDestino:
 *
 * USUARIO -> destinoId corresponde a un usuarioId
 * AREA    -> destinoId corresponde a un areaId
 * PUESTO  -> destinoId corresponde a un puestoId
 * ==========================================================
 */

const AsignacionesData = [

    //======================================================
    // Asignaciones directas por usuario
    // Cuestionario 1: Comunicación y Clima Laboral
    //======================================================

    {
        id: 1,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 1,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 2,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 2,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 3,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 3,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 4,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 4,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 5,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 5,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 6,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 6,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 7,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 7,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 8,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 8,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 9,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 9,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    {
        id: 10,
        cuestionarioId: 1,
        tipoDestino: "USUARIO",
        destinoId: 10,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-20",
        activa: true
    },

    //======================================================
    // Asignaciones por área
    //======================================================

    {
        id: 11,
        cuestionarioId: 2,
        tipoDestino: "AREA",
        destinoId: 3,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    {
        id: 12,
        cuestionarioId: 3,
        tipoDestino: "AREA",
        destinoId: 3,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    {
        id: 13,
        cuestionarioId: 5,
        tipoDestino: "AREA",
        destinoId: 4,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    {
        id: 14,
        cuestionarioId: 6,
        tipoDestino: "AREA",
        destinoId: 7,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    {
        id: 15,
        cuestionarioId: 7,
        tipoDestino: "AREA",
        destinoId: 5,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    {
        id: 16,
        cuestionarioId: 8,
        tipoDestino: "AREA",
        destinoId: 6,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    {
        id: 17,
        cuestionarioId: 9,
        tipoDestino: "AREA",
        destinoId: 2,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-25",
        activa: true
    },

    //======================================================
    // Cuestionario 10: Cultura Sustentable y Calidad
    // Asignado a todas las áreas mediante registros separados
    //======================================================

    {
        id: 18,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 1,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    {
        id: 19,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 2,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    {
        id: 20,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 3,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    {
        id: 21,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 4,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    {
        id: 22,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 5,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    {
        id: 23,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 6,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    {
        id: 24,
        cuestionarioId: 10,
        tipoDestino: "AREA",
        destinoId: 7,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-30",
        activa: true
    },

    //======================================================
    // Asignaciones por puesto
    // Cuestionario 4: Liderazgo y Gestión de Equipos
    //======================================================

    {
        id: 25,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 1,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 26,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 3,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 27,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 7,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 28,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 8,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 29,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 9,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 30,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 13,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 31,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 17,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 32,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 23,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    },

    {
        id: 33,
        cuestionarioId: 4,
        tipoDestino: "PUESTO",
        destinoId: 27,
        asignadoPorUsuarioId: 1,
        fechaAsignacion: "2026-07-05",
        fechaLimite: "2026-07-28",
        activa: true
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

AsignacionesData.forEach(Object.freeze);

Object.freeze(AsignacionesData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.AsignacionesData = AsignacionesData;