/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/categoriasData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de categorías de evaluación del sistema.
 * Este archivo simula la tabla "Categorías" de la futura
 * base de datos y permite clasificar cuestionarios,
 * preguntas, resultados y reportes dentro del modelo DNC.
 * ==========================================================
 */

const CategoriasData = [

    {
        id: 1,
        nombre: "Seguridad e Higiene",
        descripcion: "Categoría relacionada con prevención de riesgos, uso de EPP, seguridad laboral e higiene en el entorno de trabajo."
    },

    {
        id: 2,
        nombre: "Productividad",
        descripcion: "Categoría enfocada en eficiencia operativa, cumplimiento de metas, rendimiento y mejora de procesos."
    },

    {
        id: 3,
        nombre: "Ambiente Laboral",
        descripcion: "Categoría relacionada con clima organizacional, colaboración, bienestar y relaciones laborales."
    },

    {
        id: 4,
        nombre: "Liderazgo",
        descripcion: "Categoría enfocada en dirección de equipos, toma de decisiones, comunicación y desarrollo del talento."
    },

    {
        id: 5,
        nombre: "Calidad",
        descripcion: "Categoría relacionada con cumplimiento de estándares, mejora continua, control de calidad y reducción de errores."
    },

    {
        id: 6,
        nombre: "Comunicación",
        descripcion: "Categoría enfocada en comunicación clara, asertiva y efectiva dentro de la organización."
    },

    {
        id: 7,
        nombre: "Trabajo en Equipo",
        descripcion: "Categoría relacionada con colaboración, coordinación entre áreas y cooperación entre compañeros."
    },

    {
        id: 8,
        nombre: "Competencias Técnicas",
        descripcion: "Categoría enfocada en conocimientos y habilidades técnicas específicas de cada área o puesto."
    },

    {
        id: 9,
        nombre: "Competencias Institucionales",
        descripcion: "Categoría relacionada con competencias generales aplicables a todos los puestos de la organización."
    },

    {
        id: 10,
        nombre: "Sustentabilidad",
        descripcion: "Categoría enfocada en conciencia ambiental, uso eficiente de recursos y responsabilidad sustentable."
    },

    {
        id: 11,
        nombre: "Atención al Cliente",
        descripcion: "Categoría relacionada con servicio, soporte, manejo de clientes, quejas y resolución de incidencias."
    },

    {
        id: 12,
        nombre: "Innovación y Tecnología",
        descripcion: "Categoría enfocada en desarrollo tecnológico, soluciones IoT, software, hardware, prototipado e innovación."
    },

    {
        id: 13,
        nombre: "Detección de Necesidades de Capacitación",
        descripcion: "Categoría relacionada con análisis de brechas, identificación de necesidades y recomendaciones de capacitación."
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

CategoriasData.forEach(Object.freeze);

Object.freeze(CategoriasData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.CategoriasData = CategoriasData;