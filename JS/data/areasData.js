/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/areasData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de áreas de la organización.
 * Este archivo simula la tabla "Áreas" de la futura base de
 * datos y proporciona las áreas oficiales de NovaEco
 * Technologies para la asignación de usuarios, puestos,
 * cuestionarios, competencias y reportes.
 * ==========================================================
 */

const AreasData = [

    {
        id: 1,
        nombre: "Dirección General",
        descripcion: "Área responsable de la dirección estratégica, visión corporativa y toma de decisiones principales de la organización."
    },

    {
        id: 2,
        nombre: "Recursos Humanos",
        descripcion: "Área encargada de la gestión del talento humano y del flujo principal del proceso DNC."
    },

    {
        id: 3,
        nombre: "Operaciones y Producción",
        descripcion: "Área responsable del ensamblaje, operación productiva, control operativo y cumplimiento de procesos de manufactura."
    },

    {
        id: 4,
        nombre: "Investigación y Desarrollo (I+D)",
        descripcion: "Área encargada del diseño, desarrollo, innovación tecnológica, software, hardware y prototipado de productos IoT."
    },

    {
        id: 5,
        nombre: "Marketing y Ventas",
        descripcion: "Área responsable de la estrategia comercial, ventas B2B, posicionamiento digital, e-commerce y comunicación de marca."
    },

    {
        id: 6,
        nombre: "Finanzas y Administración",
        descripcion: "Área encargada de la administración financiera, análisis de costos, presupuestos, nómina y control administrativo."
    },

    {
        id: 7,
        nombre: "Soporte Técnico y Atención",
        descripcion: "Área responsable de la atención al cliente, diagnóstico remoto, soporte técnico y gestión de garantías."
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

AreasData.forEach(Object.freeze);

Object.freeze(AreasData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.AreasData = AreasData;