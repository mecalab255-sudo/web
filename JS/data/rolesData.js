/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/rolesData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de roles del sistema.
 * Este archivo simula la tabla "Roles" de la futura base de
 * datos y proporciona los roles disponibles para la
 * autenticación y autorización del sistema.
 * ==========================================================
 */

const RolesData = [

    {
        id: 1,
        nombre: "ADMIN",
        descripcion: "Acceso total al sistema."
    },

    {
        id: 2,
        nombre: "SUPERVISOR",
        descripcion: "Consulta información, supervisa resultados y gestiona información de su área."
    },

    {
        id: 3,
        nombre: "EMPLEADO",
        descripcion: "Responde cuestionarios asignados y consulta sus propios resultados."
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

RolesData.forEach(Object.freeze);

Object.freeze(RolesData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.RolesData = RolesData;