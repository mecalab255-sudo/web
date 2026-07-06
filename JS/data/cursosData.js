/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/cursosData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de cursos recomendados para capacitación.
 * Este archivo simula la tabla "Cursos" de la futura base
 * de datos y define fichas de capacitación relacionadas
 * directamente con competencias evaluables del sistema DNC.
 *
 * Cada curso contiene un enlace externo a YouTube como
 * recurso de apoyo para el prototipo académico.
 * ==========================================================
 */

const CursosData = [

    {
        id: 1,
        nombre: "Introducción a la Conciencia Sustentable",
        descripcion: "Curso introductorio sobre uso responsable de recursos, impacto ambiental y hábitos sustentables en el trabajo.",
        competenciaId: 1,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=conciencia+sustentable+en+el+trabajo",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 2,
        nombre: "Calidad y Cero Defectos",
        descripcion: "Curso enfocado en principios de calidad, prevención de errores y mejora continua en procesos organizacionales.",
        competenciaId: 2,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=calidad+cero+defectos+mejora+continua",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 3,
        nombre: "Resolución de Problemas Laborales",
        descripcion: "Curso sobre identificación de problemas, análisis de causas y generación de soluciones prácticas.",
        competenciaId: 3,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=resolucion+de+problemas+en+el+trabajo",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 4,
        nombre: "Trabajo Colaborativo en Equipos",
        descripcion: "Curso orientado a fortalecer la colaboración, coordinación y cooperación entre áreas de trabajo.",
        competenciaId: 4,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=trabajo+colaborativo+en+equipos",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 5,
        nombre: "Gestión de Equipos de Trabajo",
        descripcion: "Curso sobre delegación, motivación, seguimiento de tareas y liderazgo de equipos.",
        competenciaId: 5,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=gestion+de+equipos+de+trabajo",
        duracion: "1.5 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 6,
        nombre: "Visión Estratégica Organizacional",
        descripcion: "Curso enfocado en pensamiento estratégico, toma de decisiones y alineación con objetivos organizacionales.",
        competenciaId: 6,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=vision+estrategica+organizacional",
        duracion: "1.5 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 7,
        nombre: "Desarrollo de Talento Humano",
        descripcion: "Curso sobre identificación de necesidades de capacitación, crecimiento profesional y desarrollo de colaboradores.",
        competenciaId: 7,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=desarrollo+de+talento+humano+capacitacion",
        duracion: "1.5 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 8,
        nombre: "Comunicación Asertiva",
        descripcion: "Curso para mejorar la comunicación clara, retroalimentación constructiva y relaciones laborales.",
        competenciaId: 8,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=comunicacion+asertiva+en+el+trabajo",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 9,
        nombre: "Destreza Manual y Ensamblaje Electrónico",
        descripcion: "Curso introductorio sobre manipulación de componentes, ensamblaje y precisión en procesos manuales.",
        competenciaId: 9,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=ensamblaje+electronico+componentes+curso",
        duracion: "2 horas",
        nivel: "Básico",
        activo: true
    },

    {
        id: 10,
        nombre: "Uso Correcto de EPP",
        descripcion: "Curso sobre equipo de protección personal, prevención de riesgos y seguridad en áreas operativas.",
        competenciaId: 10,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=uso+correcto+de+equipo+de+proteccion+personal+EPP",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 11,
        nombre: "Metodología 5S",
        descripcion: "Curso sobre clasificación, orden, limpieza, estandarización y disciplina en espacios de trabajo.",
        competenciaId: 11,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=metodologia+5s+curso",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 12,
        nombre: "Arquitectura IoT y Protocolos de Comunicación",
        descripcion: "Curso introductorio sobre arquitectura IoT, conectividad, WiFi, Bluetooth y protocolos de comunicación.",
        competenciaId: 12,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=arquitectura+IoT+protocolos+WiFi+Bluetooth",
        duracion: "2 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 13,
        nombre: "Buenas Prácticas de Programación",
        descripcion: "Curso sobre código limpio, estructura de programas, lógica de software y buenas prácticas de desarrollo.",
        competenciaId: 13,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=buenas+practicas+de+programacion+codigo+limpio",
        duracion: "2 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 14,
        nombre: "Diseño CAD y Prototipado",
        descripcion: "Curso introductorio sobre modelado 3D, diseño de piezas y desarrollo de prototipos.",
        competenciaId: 14,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=dise%C3%B1o+CAD+prototipado+curso",
        duracion: "2 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 15,
        nombre: "Análisis de Datos para E-commerce",
        descripcion: "Curso sobre métricas digitales, conversión, tráfico web y análisis de comportamiento de usuarios.",
        competenciaId: 15,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=analisis+de+datos+ecommerce+metricas",
        duracion: "1.5 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 16,
        nombre: "Gestión CRM para Ventas",
        descripcion: "Curso sobre administración de clientes, seguimiento de oportunidades y gestión del embudo comercial.",
        competenciaId: 16,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=gestion+CRM+ventas+curso",
        duracion: "1.5 horas",
        nivel: "Básico",
        activo: true
    },

    {
        id: 17,
        nombre: "Creación de Contenido Digital",
        descripcion: "Curso sobre planeación, diseño y publicación de contenido digital para campañas de marca.",
        competenciaId: 17,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=creacion+de+contenido+digital+marketing",
        duracion: "1.5 horas",
        nivel: "Básico",
        activo: true
    },

    {
        id: 18,
        nombre: "Diagnóstico Remoto de Fallas",
        descripcion: "Curso sobre identificación de fallas, soporte remoto y atención técnica a usuarios.",
        competenciaId: 18,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=diagnostico+remoto+de+fallas+soporte+tecnico",
        duracion: "1.5 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 19,
        nombre: "Manejo de Clientes y Quejas",
        descripcion: "Curso sobre atención al cliente, manejo de quejas, empatía y resolución de conflictos.",
        competenciaId: 19,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=manejo+de+clientes+y+quejas",
        duracion: "1 hora",
        nivel: "Básico",
        activo: true
    },

    {
        id: 20,
        nombre: "Análisis de Costos",
        descripcion: "Curso introductorio sobre costos, rentabilidad, presupuestos y análisis financiero básico.",
        competenciaId: 20,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=analisis+de+costos+curso",
        duracion: "2 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 21,
        nombre: "Entrevista por Competencias",
        descripcion: "Curso sobre diseño de entrevistas, evaluación objetiva y selección basada en competencias.",
        competenciaId: 21,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=entrevista+por+competencias+recursos+humanos",
        duracion: "1.5 horas",
        nivel: "Intermedio",
        activo: true
    },

    {
        id: 22,
        nombre: "Legislación Laboral Básica",
        descripcion: "Curso introductorio sobre obligaciones laborales, contratos, nómina y cumplimiento normativo.",
        competenciaId: 22,
        plataforma: "YouTube",
        url: "https://www.youtube.com/results?search_query=legislacion+laboral+mexico+curso",
        duracion: "2 horas",
        nivel: "Básico",
        activo: true
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

CursosData.forEach(Object.freeze);

Object.freeze(CursosData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.CursosData = CursosData;