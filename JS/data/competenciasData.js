/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/competenciasData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de competencias de la organización.
 * Este archivo simula la tabla "Competencias" de la futura
 * base de datos y define las habilidades evaluables dentro
 * del sistema DNC.
 *
 * Las competencias se clasifican en institucionales,
 * liderazgo y técnicas, permitiendo relacionarlas con áreas
 * y puestos mediante identificadores.
 * ==========================================================
 */

const CompetenciasData = [

    //======================================================
    // Competencias institucionales
    // Aplican a todos los puestos de la organización.
    //======================================================

    {
        id: 1,
        nombre: "Conciencia Sustentable",
        tipo: "INSTITUCIONAL",
        descripcion: "Optimiza recursos como energía y materiales, comprendiendo el impacto ambiental de sus tareas.",
        aplicaTodosLosPuestos: true,
        areaIds: [],
        puestoIds: [],
        activa: true
    },

    {
        id: 2,
        nombre: "Orientación a la Calidad",
        tipo: "INSTITUCIONAL",
        descripcion: "Ejecuta sus procesos con rigor y atención al detalle para alcanzar estándares de cero defectos.",
        aplicaTodosLosPuestos: true,
        areaIds: [],
        puestoIds: [],
        activa: true
    },

    {
        id: 3,
        nombre: "Resolución de Problemas",
        tipo: "INSTITUCIONAL",
        descripcion: "Identifica obstáculos rápidamente y propone alternativas viables dentro de su ámbito de acción.",
        aplicaTodosLosPuestos: true,
        areaIds: [],
        puestoIds: [],
        activa: true
    },

    {
        id: 4,
        nombre: "Trabajo Colaborativo",
        tipo: "INSTITUCIONAL",
        descripcion: "Coopera activamente con otras áreas para asegurar el flujo de los proyectos y la producción.",
        aplicaTodosLosPuestos: true,
        areaIds: [],
        puestoIds: [],
        activa: true
    },

    //======================================================
    // Competencias de liderazgo
    // Aplican a perfiles con personal a su cargo.
    //======================================================

    {
        id: 5,
        nombre: "Gestión de Equipos",
        tipo: "LIDERAZGO",
        descripcion: "Delega, motiva y mantiene un clima laboral productivo y respetuoso.",
        aplicaTodosLosPuestos: false,
        areaIds: [],
        puestoIds: [1, 3, 7, 8, 9, 13, 17, 23, 27],
        activa: true
    },

    {
        id: 6,
        nombre: "Visión Estratégica",
        tipo: "LIDERAZGO",
        descripcion: "Toma decisiones basadas en métricas y alinea el trabajo diario con los objetivos estratégicos de la organización.",
        aplicaTodosLosPuestos: false,
        areaIds: [],
        puestoIds: [1, 7, 17, 23],
        activa: true
    },

    {
        id: 7,
        nombre: "Desarrollo de Talento",
        tipo: "LIDERAZGO",
        descripcion: "Detecta necesidades de capacitación y fomenta el crecimiento profesional del personal.",
        aplicaTodosLosPuestos: false,
        areaIds: [],
        puestoIds: [3, 8, 13, 27],
        activa: true
    },

    {
        id: 8,
        nombre: "Comunicación Asertiva",
        tipo: "LIDERAZGO",
        descripcion: "Transmite directrices con claridad y ofrece retroalimentación constructiva.",
        aplicaTodosLosPuestos: false,
        areaIds: [],
        puestoIds: [1, 3, 7, 8, 9, 13, 17, 23, 27],
        activa: true
    },

    //======================================================
    // Competencias técnicas - Operaciones y Producción
    //======================================================

    {
        id: 9,
        nombre: "Destreza Manual y Ensamblaje",
        tipo: "TECNICA",
        descripcion: "Manipulación precisa de microcomponentes y placas base.",
        aplicaTodosLosPuestos: false,
        areaIds: [3],
        puestoIds: [10],
        activa: true
    },

    {
        id: 10,
        nombre: "Normativas de Seguridad (EPP)",
        tipo: "TECNICA",
        descripcion: "Uso correcto del equipo de protección personal y prevención de riesgos laborales.",
        aplicaTodosLosPuestos: false,
        areaIds: [3],
        puestoIds: [9, 10, 11, 12],
        activa: true
    },

    {
        id: 11,
        nombre: "Metodología 5S",
        tipo: "TECNICA",
        descripcion: "Aplicación de técnicas de orden, limpieza y mejora del entorno de trabajo.",
        aplicaTodosLosPuestos: false,
        areaIds: [3],
        puestoIds: [7, 8, 9, 10, 11, 12],
        activa: true
    },

    //======================================================
    // Competencias técnicas - Investigación y Desarrollo
    //======================================================

    {
        id: 12,
        nombre: "Arquitectura IoT y Protocolos",
        tipo: "TECNICA",
        descripcion: "Dominio de WiFi, Zigbee y Bluetooth LE para conectividad de dispositivos inteligentes.",
        aplicaTodosLosPuestos: false,
        areaIds: [4],
        puestoIds: [14, 15],
        activa: true
    },

    {
        id: 13,
        nombre: "Programación de Software",
        tipo: "TECNICA",
        descripcion: "Codificación limpia y eficiente en lenguajes nativos como C++, Python u otros lenguajes relacionados.",
        aplicaTodosLosPuestos: false,
        areaIds: [4],
        puestoIds: [15],
        activa: true
    },

    {
        id: 14,
        nombre: "Diseño CAD y Prototipado",
        tipo: "TECNICA",
        descripcion: "Modelado 3D de carcasas, piezas y prototipos optimizados para usabilidad y fabricación.",
        aplicaTodosLosPuestos: false,
        areaIds: [4],
        puestoIds: [16],
        activa: true
    },

    //======================================================
    // Competencias técnicas - Marketing y Ventas
    //======================================================

    {
        id: 15,
        nombre: "Análisis de Datos (E-commerce)",
        tipo: "TECNICA",
        descripcion: "Interpretación de métricas de conversión, tráfico web y comportamiento del cliente digital.",
        aplicaTodosLosPuestos: false,
        areaIds: [5],
        puestoIds: [18, 19],
        activa: true
    },

    {
        id: 16,
        nombre: "Gestión CRM",
        tipo: "TECNICA",
        descripcion: "Uso de plataformas CRM para seguimiento del embudo de ventas y gestión de clientes.",
        aplicaTodosLosPuestos: false,
        areaIds: [5],
        puestoIds: [20],
        activa: true
    },

    {
        id: 17,
        nombre: "Creación de Contenido Digital",
        tipo: "TECNICA",
        descripcion: "Diseño de campañas visuales y contenido digital orientado a la sustentabilidad.",
        aplicaTodosLosPuestos: false,
        areaIds: [5],
        puestoIds: [21, 22],
        activa: true
    },

    //======================================================
    // Competencias técnicas - Soporte Técnico y Atención
    //======================================================

    {
        id: 18,
        nombre: "Diagnóstico Remoto",
        tipo: "TECNICA",
        descripcion: "Identificación de fallas de hardware o software mediante atención remota.",
        aplicaTodosLosPuestos: false,
        areaIds: [7],
        puestoIds: [28, 29],
        activa: true
    },

    {
        id: 19,
        nombre: "Manejo de Clientes",
        tipo: "TECNICA",
        descripcion: "Contención, atención y resolución de quejas de clientes con empatía y paciencia.",
        aplicaTodosLosPuestos: false,
        areaIds: [7],
        puestoIds: [28, 30],
        activa: true
    },

    //======================================================
    // Competencias técnicas - Finanzas y Recursos Humanos
    //======================================================

    {
        id: 20,
        nombre: "Proyección y Análisis de Costos",
        tipo: "TECNICA",
        descripcion: "Cálculo de rentabilidad, costos de producto, importación de piezas y análisis financiero.",
        aplicaTodosLosPuestos: false,
        areaIds: [6],
        puestoIds: [24, 25],
        activa: true
    },

    {
        id: 21,
        nombre: "Entrevista por Competencias",
        tipo: "TECNICA",
        descripcion: "Evaluación objetiva de candidatos técnicos y operativos mediante entrevistas estructuradas.",
        aplicaTodosLosPuestos: false,
        areaIds: [2],
        puestoIds: [4],
        activa: true
    },

    {
        id: 22,
        nombre: "Gestión de Legislación Laboral",
        tipo: "TECNICA",
        descripcion: "Aplicación correcta de normativas laborales relacionadas con nómina, contratos y administración de personal.",
        aplicaTodosLosPuestos: false,
        areaIds: [2],
        puestoIds: [5, 6],
        activa: true
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

CompetenciasData.forEach((competencia) => {

    Object.freeze(competencia.areaIds);

    Object.freeze(competencia.puestoIds);

    Object.freeze(competencia);

});

Object.freeze(CompetenciasData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.CompetenciasData = CompetenciasData;