/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/config/storageKeys.js
 * ----------------------------------------------------------
 * Descripción:
 * Define las llaves oficiales utilizadas por la capa de
 * almacenamiento del sistema. Estas llaves representan las
 * colecciones principales de la aplicación y permiten que
 * los Services accedan al almacenamiento sin utilizar
 * cadenas de texto directamente.
 * ==========================================================
 */

const StorageKeys = Object.freeze({

    //==========================================
    // Seguridad y usuarios
    //==========================================

    USUARIO_ACTIVO: "usuarioActivo",

    USUARIOS: "usuarios",

    ROLES: "roles",

    //==========================================
    // Estructura organizacional
    //==========================================

    AREAS: "areas",

    PUESTOS: "puestos",

    //==========================================
    // Catálogos DNC
    //==========================================

    CATEGORIAS: "categorias",

    PRIORIDADES: "prioridades",

    COMPETENCIAS: "competencias",

    CURSOS: "cursos",

    //==========================================
    // Operación
    //==========================================

    CUESTIONARIOS: "cuestionarios",

    PREGUNTAS: "preguntas",

    ASIGNACIONES: "asignaciones",

    //==========================================
    // Evaluaciones y resultados
    //==========================================

    RESULTADOS: "resultados",

    RESPUESTAS: "respuestas"

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.StorageKeys = StorageKeys;