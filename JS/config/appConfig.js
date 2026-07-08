/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/config/appConfig.js
 * ----------------------------------------------------------
 * Descripción:
 * Archivo de configuración general del sistema.
 * Centraliza valores globales utilizados por la aplicación,
 * como nombre del sistema, versión, escala de evaluación,
 * roles oficiales, límites generales y rutas principales.
 * ==========================================================
 */

const AppConfig = Object.freeze({

    //======================================================
    // Información general del sistema
    //======================================================

    NOMBRE_SISTEMA: "FORMA TALENTO",

    VERSION: "1.1",

    MODO_DEMO: true,

    EMPRESA_DEMO: "NovaEco Technologies",

    //======================================================
    // Escala de evaluación
    //======================================================

    ESCALA_MIN: 0,

    ESCALA_MAX: 5,

    ESCALA_TIPO: "LIKERT_0_5",

    TEXTO_ESCALA_MIN: "Totalmente en desacuerdo",

    TEXTO_ESCALA_MAX: "Totalmente de acuerdo",

    UMBRAL_COMPETENCIA_BAJA: 3,

    //======================================================
    // Límites generales
    //======================================================

    MAX_PREGUNTAS: 50,

    MIN_PREGUNTAS: 1,

    MAX_USUARIOS_DEMO: 200,

    //======================================================
    // Roles oficiales por ID
    //======================================================

    ROLES: Object.freeze({

        ADMIN: 1,

        SUPERVISOR: 2,

        EMPLEADO: 3

    }),

    //======================================================
    // Roles oficiales por nombre
    //======================================================

    ROLES_NOMBRE: Object.freeze({

        ADMIN: "ADMIN",

        SUPERVISOR: "SUPERVISOR",

        EMPLEADO: "EMPLEADO"

    }),

    //======================================================
    // Roles administrativos
    //======================================================

    ROLES_ADMINISTRATIVOS: Object.freeze([
        1,
        2
    ]),

    ROLES_ADMINISTRATIVOS_NOMBRE: Object.freeze([
        "ADMIN",
        "SUPERVISOR"
    ]),

    //======================================================
    // Estados generales
    //======================================================

    ESTADOS: Object.freeze({

        ACTIVO: true,

        INACTIVO: false,

        COMPLETADO: "COMPLETADO",

        PENDIENTE: "PENDIENTE",

        CANCELADO: "CANCELADO"

    }),

    //======================================================
    // Rutas principales
    //======================================================

    RUTAS: Object.freeze({

        LOGIN: "index.html",

        DASHBOARD: "HTML/dashboard.html",

        USUARIOS: "HTML/usuarios.html",

        CUESTIONARIOS: "HTML/cuestionarios.html",

        CREAR_CUESTIONARIO: "HTML/crear_cuestionario.html",

        RESPONDER_CUESTIONARIO: "HTML/cuestionario_responder.html",

        RESULTADOS: "HTML/resultados.html"

    })

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.AppConfig = AppConfig;