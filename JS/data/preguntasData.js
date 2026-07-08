/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/preguntasData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo inicial de preguntas del sistema.
 * Este archivo simula la tabla "Preguntas" de la futura base
 * de datos y define las afirmaciones utilizadas en los
 * cuestionarios de evaluación DNC.
 *
 * Cada pregunta pertenece a un cuestionario y puede estar
 * asociada a una competencia específica para permitir el
 * análisis posterior de resultados, brechas y necesidades
 * de capacitación.
 * ==========================================================
 */

const PreguntasData = [

    //======================================================
    // Cuestionario 1: Comunicación y Clima Laboral
    //======================================================

    {
        id: 1,
        cuestionarioId: 1,
        competenciaId: 8,
        categoriaId: 3,
        prioridadId: 3,
        afirmacion: "Los miembros del equipo expresan sus ideas de forma clara durante las reuniones.",
        orden: 1,
        activa: true
    },

    {
        id: 2,
        cuestionarioId: 1,
        competenciaId: 8,
        categoriaId: 3,
        prioridadId: 3,
        afirmacion: "En el equipo se escucha activamente a los demás antes de tomar decisiones.",
        orden: 2,
        activa: true
    },

    {
        id: 3,
        cuestionarioId: 1,
        competenciaId: 4,
        categoriaId: 7,
        prioridadId: 3,
        afirmacion: "La colaboración entre áreas permite cumplir los objetivos de trabajo.",
        orden: 3,
        activa: true
    },

    {
        id: 4,
        cuestionarioId: 1,
        competenciaId: 4,
        categoriaId: 3,
        prioridadId: 3,
        afirmacion: "Existe un ambiente de respeto durante las discusiones laborales.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 2: Productividad y Organización Operativa
    //======================================================

    {
        id: 5,
        cuestionarioId: 2,
        competenciaId: 3,
        categoriaId: 2,
        prioridadId: 2,
        afirmacion: "Las tareas se completan dentro de los tiempos establecidos.",
        orden: 1,
        activa: true
    },

    {
        id: 6,
        cuestionarioId: 2,
        competenciaId: 11,
        categoriaId: 2,
        prioridadId: 2,
        afirmacion: "El equipo organiza correctamente sus actividades diarias.",
        orden: 2,
        activa: true
    },

    {
        id: 7,
        cuestionarioId: 2,
        competenciaId: 11,
        categoriaId: 2,
        prioridadId: 2,
        afirmacion: "Se utilizan herramientas adecuadas para gestionar el trabajo del área.",
        orden: 3,
        activa: true
    },

    {
        id: 8,
        cuestionarioId: 2,
        competenciaId: 4,
        categoriaId: 7,
        prioridadId: 2,
        afirmacion: "El equipo evita la duplicidad de tareas mediante una correcta coordinación.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 3: Seguridad e Higiene Operativa
    //======================================================

    {
        id: 9,
        cuestionarioId: 3,
        competenciaId: 10,
        categoriaId: 1,
        prioridadId: 3,
        afirmacion: "Se cumplen las normas de seguridad establecidas en el área de trabajo.",
        orden: 1,
        activa: true
    },

    {
        id: 10,
        cuestionarioId: 3,
        competenciaId: 10,
        categoriaId: 1,
        prioridadId: 3,
        afirmacion: "El personal utiliza correctamente el equipo de protección personal.",
        orden: 2,
        activa: true
    },

    {
        id: 11,
        cuestionarioId: 3,
        competenciaId: 11,
        categoriaId: 1,
        prioridadId: 3,
        afirmacion: "Las instalaciones se mantienen limpias, ordenadas y libres de riesgos.",
        orden: 3,
        activa: true
    },

    {
        id: 12,
        cuestionarioId: 3,
        competenciaId: 10,
        categoriaId: 1,
        prioridadId: 3,
        afirmacion: "Los incidentes de seguridad se reportan de forma oportuna.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 4: Liderazgo y Gestión de Equipos
    //======================================================

    {
        id: 13,
        cuestionarioId: 4,
        competenciaId: 5,
        categoriaId: 4,
        prioridadId: 3,
        afirmacion: "El líder delega responsabilidades de forma clara y equilibrada.",
        orden: 1,
        activa: true
    },

    {
        id: 14,
        cuestionarioId: 4,
        competenciaId: 5,
        categoriaId: 4,
        prioridadId: 3,
        afirmacion: "El líder motiva al equipo para alcanzar los objetivos establecidos.",
        orden: 2,
        activa: true
    },

    {
        id: 15,
        cuestionarioId: 4,
        competenciaId: 7,
        categoriaId: 4,
        prioridadId: 3,
        afirmacion: "El líder promueve el desarrollo profesional de sus colaboradores.",
        orden: 3,
        activa: true
    },

    {
        id: 16,
        cuestionarioId: 4,
        competenciaId: 8,
        categoriaId: 6,
        prioridadId: 3,
        afirmacion: "El líder ofrece retroalimentación clara, respetuosa y constructiva.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 5: Competencias Técnicas de IoT y Desarrollo
    //======================================================

    {
        id: 17,
        cuestionarioId: 5,
        competenciaId: 12,
        categoriaId: 12,
        prioridadId: 3,
        afirmacion: "El colaborador comprende los principios básicos de arquitectura IoT.",
        orden: 1,
        activa: true
    },

    {
        id: 18,
        cuestionarioId: 5,
        competenciaId: 12,
        categoriaId: 12,
        prioridadId: 3,
        afirmacion: "El colaborador identifica protocolos de comunicación aplicables a dispositivos inteligentes.",
        orden: 2,
        activa: true
    },

    {
        id: 19,
        cuestionarioId: 5,
        competenciaId: 13,
        categoriaId: 12,
        prioridadId: 3,
        afirmacion: "El colaborador aplica buenas prácticas de programación en sus desarrollos.",
        orden: 3,
        activa: true
    },

    {
        id: 20,
        cuestionarioId: 5,
        competenciaId: 14,
        categoriaId: 12,
        prioridadId: 3,
        afirmacion: "El colaborador utiliza herramientas de diseño o prototipado para validar soluciones técnicas.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 6: Atención al Cliente y Soporte Técnico
    //======================================================

    {
        id: 21,
        cuestionarioId: 6,
        competenciaId: 18,
        categoriaId: 11,
        prioridadId: 2,
        afirmacion: "El colaborador identifica fallas técnicas mediante diagnóstico remoto.",
        orden: 1,
        activa: true
    },

    {
        id: 22,
        cuestionarioId: 6,
        competenciaId: 18,
        categoriaId: 11,
        prioridadId: 2,
        afirmacion: "El colaborador registra adecuadamente la información de los casos atendidos.",
        orden: 2,
        activa: true
    },

    {
        id: 23,
        cuestionarioId: 6,
        competenciaId: 19,
        categoriaId: 11,
        prioridadId: 2,
        afirmacion: "El colaborador atiende quejas de clientes con empatía y paciencia.",
        orden: 3,
        activa: true
    },

    {
        id: 24,
        cuestionarioId: 6,
        competenciaId: 19,
        categoriaId: 11,
        prioridadId: 2,
        afirmacion: "El colaborador ofrece soluciones claras y oportunas a los clientes.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 7: Gestión Comercial y CRM
    //======================================================

    {
        id: 25,
        cuestionarioId: 7,
        competenciaId: 15,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador interpreta métricas comerciales para tomar decisiones.",
        orden: 1,
        activa: true
    },

    {
        id: 26,
        cuestionarioId: 7,
        competenciaId: 15,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador analiza datos de conversión, tráfico o comportamiento de clientes.",
        orden: 2,
        activa: true
    },

    {
        id: 27,
        cuestionarioId: 7,
        competenciaId: 16,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador utiliza herramientas CRM para dar seguimiento a clientes.",
        orden: 3,
        activa: true
    },

    {
        id: 28,
        cuestionarioId: 7,
        competenciaId: 16,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador mantiene actualizada la información del embudo de ventas.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 8: Administración Financiera y Costos
    //======================================================

    {
        id: 29,
        cuestionarioId: 8,
        competenciaId: 20,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador identifica los costos principales asociados a productos o procesos.",
        orden: 1,
        activa: true
    },

    {
        id: 30,
        cuestionarioId: 8,
        competenciaId: 20,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador analiza información financiera para apoyar la toma de decisiones.",
        orden: 2,
        activa: true
    },

    {
        id: 31,
        cuestionarioId: 8,
        competenciaId: 20,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador comprende la relación entre costos, presupuestos y rentabilidad.",
        orden: 3,
        activa: true
    },

    {
        id: 32,
        cuestionarioId: 8,
        competenciaId: 20,
        categoriaId: 8,
        prioridadId: 2,
        afirmacion: "El colaborador registra y organiza información administrativa de forma precisa.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 9: Gestión de Recursos Humanos
    //======================================================

    {
        id: 33,
        cuestionarioId: 9,
        competenciaId: 21,
        categoriaId: 13,
        prioridadId: 3,
        afirmacion: "El colaborador aplica criterios objetivos durante entrevistas por competencias.",
        orden: 1,
        activa: true
    },

    {
        id: 34,
        cuestionarioId: 9,
        competenciaId: 21,
        categoriaId: 13,
        prioridadId: 3,
        afirmacion: "El colaborador identifica habilidades relevantes en candidatos técnicos u operativos.",
        orden: 2,
        activa: true
    },

    {
        id: 35,
        cuestionarioId: 9,
        competenciaId: 22,
        categoriaId: 13,
        prioridadId: 3,
        afirmacion: "El colaborador aplica correctamente criterios básicos de legislación laboral.",
        orden: 3,
        activa: true
    },

    {
        id: 36,
        cuestionarioId: 9,
        competenciaId: 7,
        categoriaId: 13,
        prioridadId: 3,
        afirmacion: "El colaborador identifica necesidades de capacitación en el personal.",
        orden: 4,
        activa: true
    },

    //======================================================
    // Cuestionario 10: Cultura Sustentable y Calidad
    //======================================================

    {
        id: 37,
        cuestionarioId: 10,
        competenciaId: 1,
        categoriaId: 10,
        prioridadId: 3,
        afirmacion: "El colaborador utiliza responsablemente los recursos materiales y energéticos.",
        orden: 1,
        activa: true
    },

    {
        id: 38,
        cuestionarioId: 10,
        competenciaId: 1,
        categoriaId: 10,
        prioridadId: 3,
        afirmacion: "El colaborador reconoce el impacto ambiental de sus actividades laborales.",
        orden: 2,
        activa: true
    },

    {
        id: 39,
        cuestionarioId: 10,
        competenciaId: 2,
        categoriaId: 5,
        prioridadId: 3,
        afirmacion: "El colaborador realiza sus actividades con atención al detalle y apego a estándares.",
        orden: 3,
        activa: true
    },

    {
        id: 40,
        cuestionarioId: 10,
        competenciaId: 2,
        categoriaId: 5,
        prioridadId: 3,
        afirmacion: "El colaborador busca reducir errores y mejorar continuamente sus procesos.",
        orden: 4,
        activa: true
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

PreguntasData.forEach(Object.freeze);

Object.freeze(PreguntasData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.PreguntasData = PreguntasData;