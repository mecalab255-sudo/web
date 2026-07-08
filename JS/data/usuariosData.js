/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/usuariosData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de usuarios iniciales del sistema.
 * Este archivo simula la tabla "Usuarios" de la futura base
 * de datos y proporciona usuarios de prueba para validar el
 * inicio de sesión, los roles, las áreas, los puestos y los
 * permisos del sistema.
 * ==========================================================
 */

const UsuariosData = [

    //======================================================
    // Administradores
    //======================================================

    {
        id: 1,
        nombre: "Administrador",
        apellido: "Global",
        usuario: "admin",
        password: "1234",
        correo: "admin@formatalento.com",
        rolId: 1,
        areaId: 2,
        puestoId: 3,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 2,
        nombre: "Miguel",
        apellido: "Torres",
        usuario: "rh01",
        password: "1234",
        correo: "rh01@novaeco.com",
        rolId: 1,
        areaId: 2,
        puestoId: 3,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    //======================================================
    // Supervisores
    //======================================================

    {
        id: 3,
        nombre: "Sofía",
        apellido: "Ramírez",
        usuario: "sup01",
        password: "1234",
        correo: "sup01@novaeco.com",
        rolId: 2,
        areaId: 3,
        puestoId: 9,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 4,
        nombre: "Carlos",
        apellido: "Herrera",
        usuario: "sup02",
        password: "1234",
        correo: "sup02@novaeco.com",
        rolId: 2,
        areaId: 7,
        puestoId: 27,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 5,
        nombre: "Andrea",
        apellido: "Molina",
        usuario: "sup03",
        password: "1234",
        correo: "sup03@novaeco.com",
        rolId: 2,
        areaId: 4,
        puestoId: 13,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    //======================================================
    // Empleados
    //======================================================

    {
        id: 6,
        nombre: "Luis",
        apellido: "García",
        usuario: "emp01",
        password: "1234",
        correo: "emp01@novaeco.com",
        rolId: 3,
        areaId: 3,
        puestoId: 10,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 7,
        nombre: "Mariana",
        apellido: "López",
        usuario: "emp02",
        password: "1234",
        correo: "emp02@novaeco.com",
        rolId: 3,
        areaId: 4,
        puestoId: 15,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 8,
        nombre: "Jorge",
        apellido: "Castillo",
        usuario: "emp03",
        password: "1234",
        correo: "emp03@novaeco.com",
        rolId: 3,
        areaId: 5,
        puestoId: 20,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 9,
        nombre: "Paola",
        apellido: "Núñez",
        usuario: "emp04",
        password: "1234",
        correo: "emp04@novaeco.com",
        rolId: 3,
        areaId: 7,
        puestoId: 28,
        activo: true,
        fechaRegistro: "2026-07-05"
    },

    {
        id: 10,
        nombre: "Fernando",
        apellido: "Rojas",
        usuario: "emp05",
        password: "1234",
        correo: "emp05@novaeco.com",
        rolId: 3,
        areaId: 6,
        puestoId: 25,
        activo: true,
        fechaRegistro: "2026-07-05"
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

UsuariosData.forEach(Object.freeze);

Object.freeze(UsuariosData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.UsuariosData = UsuariosData;