/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/data/puestosData.js
 * ----------------------------------------------------------
 * Descripción:
 * Catálogo de puestos de la organización.
 * Este archivo simula la tabla "Puestos" de la futura base
 * de datos y define los cargos disponibles dentro de cada
 * área de NovaEco Technologies.
 * ==========================================================
 */

const PuestosData = [

    //======================================================
    // Dirección General
    //======================================================

    {
        id: 1,
        nombre: "Director General",
        descripcion: "Responsable de la dirección estratégica, visión corporativa y toma de decisiones principales de la organización.",
        areaId: 1,
        nivelJerarquico: "DIRECTIVO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 2,
        nombre: "Auxiliar de Dirección",
        descripcion: "Apoya en actividades administrativas, seguimiento de acuerdos y gestión documental de la Dirección General.",
        areaId: 1,
        nivelJerarquico: "AUXILIAR",
        tienePersonalACargo: false,
        activo: true
    },

    //======================================================
    // Recursos Humanos
    //======================================================

    {
        id: 3,
        nombre: "Gerente de Recursos Humanos",
        descripcion: "Coordina la gestión del talento humano y supervisa el proceso general de DNC.",
        areaId: 2,
        nivelJerarquico: "GERENCIAL",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 4,
        nombre: "Especialista en Reclutamiento",
        descripcion: "Gestiona procesos de atracción, selección y evaluación de candidatos.",
        areaId: 2,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 5,
        nombre: "Especialista en Nómina",
        descripcion: "Administra procesos de nómina, contratos y documentación laboral.",
        areaId: 2,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 6,
        nombre: "Generalista de Recursos Humanos",
        descripcion: "Apoya en actividades generales de administración de personal, capacitación y clima laboral.",
        areaId: 2,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    //======================================================
    // Operaciones y Producción
    //======================================================

    {
        id: 7,
        nombre: "Director de Operaciones",
        descripcion: "Dirige la estrategia operativa, productiva y de cumplimiento en la planta de manufactura.",
        areaId: 3,
        nivelJerarquico: "DIRECTIVO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 8,
        nombre: "Jefe de Ensamblaje",
        descripcion: "Coordina las actividades de ensamblaje, control operativo y cumplimiento de procesos productivos.",
        areaId: 3,
        nivelJerarquico: "MANDO_MEDIO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 9,
        nombre: "Supervisor de Producción",
        descripcion: "Supervisa al personal operativo y el cumplimiento de metas de producción.",
        areaId: 3,
        nivelJerarquico: "MANDO_MEDIO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 10,
        nombre: "Operador de Ensamblaje",
        descripcion: "Realiza tareas operativas de ensamblaje de componentes y productos terminados.",
        areaId: 3,
        nivelJerarquico: "OPERATIVO",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 11,
        nombre: "Almacenista",
        descripcion: "Administra materiales, entradas, salidas y almacenamiento de componentes de producción.",
        areaId: 3,
        nivelJerarquico: "OPERATIVO",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 12,
        nombre: "Técnico de Calidad",
        descripcion: "Verifica productos, procesos y estándares de calidad dentro del área operativa.",
        areaId: 3,
        nivelJerarquico: "OPERATIVO",
        tienePersonalACargo: false,
        activo: true
    },

    //======================================================
    // Investigación y Desarrollo (I+D)
    //======================================================

    {
        id: 13,
        nombre: "Gerente de I+D",
        descripcion: "Coordina proyectos de innovación, desarrollo tecnológico y diseño de soluciones IoT.",
        areaId: 4,
        nivelJerarquico: "GERENCIAL",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 14,
        nombre: "Ingeniero de Hardware",
        descripcion: "Diseña, prueba y valida componentes electrónicos para productos inteligentes.",
        areaId: 4,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 15,
        nombre: "Desarrollador de Software",
        descripcion: "Desarrolla firmware, aplicaciones y soluciones de software para productos IoT.",
        areaId: 4,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 16,
        nombre: "Diseñador Industrial",
        descripcion: "Diseña carcasas, piezas, prototipos y soluciones ergonómicas para productos tecnológicos.",
        areaId: 4,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    //======================================================
    // Marketing y Ventas
    //======================================================

    {
        id: 17,
        nombre: "Director Comercial",
        descripcion: "Dirige la estrategia comercial, ventas, posicionamiento y crecimiento de mercado.",
        areaId: 5,
        nivelJerarquico: "DIRECTIVO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 18,
        nombre: "Especialista en E-commerce",
        descripcion: "Gestiona canales digitales, métricas de conversión y estrategias de venta en línea.",
        areaId: 5,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 19,
        nombre: "Analista de Datos Comerciales",
        descripcion: "Analiza indicadores de ventas, tráfico digital y comportamiento de clientes.",
        areaId: 5,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 20,
        nombre: "Ejecutivo de Ventas B2B",
        descripcion: "Gestiona relaciones comerciales con clientes empresariales y seguimiento del embudo de ventas.",
        areaId: 5,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 21,
        nombre: "Diseñador Gráfico",
        descripcion: "Desarrolla materiales visuales para campañas, comunicación de marca y contenido digital.",
        areaId: 5,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 22,
        nombre: "Community Manager",
        descripcion: "Administra comunidades digitales, redes sociales y comunicación con usuarios en línea.",
        areaId: 5,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    //======================================================
    // Finanzas y Administración
    //======================================================

    {
        id: 23,
        nombre: "Director de Finanzas",
        descripcion: "Dirige la administración financiera, presupuestos, análisis económico y control administrativo.",
        areaId: 6,
        nivelJerarquico: "DIRECTIVO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 24,
        nombre: "Contador",
        descripcion: "Gestiona registros contables, estados financieros y control fiscal de la organización.",
        areaId: 6,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 25,
        nombre: "Analista de Costos",
        descripcion: "Analiza costos, rentabilidad de productos, presupuestos e importación de componentes.",
        areaId: 6,
        nivelJerarquico: "ESPECIALISTA",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 26,
        nombre: "Auxiliar Administrativo",
        descripcion: "Apoya en tareas administrativas, documentación, control de pagos y seguimiento operativo.",
        areaId: 6,
        nivelJerarquico: "AUXILIAR",
        tienePersonalACargo: false,
        activo: true
    },

    //======================================================
    // Soporte Técnico y Atención
    //======================================================

    {
        id: 27,
        nombre: "Coordinador de Soporte Técnico",
        descripcion: "Coordina la atención técnica, seguimiento de incidencias y gestión del equipo de soporte.",
        areaId: 7,
        nivelJerarquico: "MANDO_MEDIO",
        tienePersonalACargo: true,
        activo: true
    },

    {
        id: 28,
        nombre: "Asesor Telefónico",
        descripcion: "Atiende solicitudes, dudas, quejas y reportes de clientes mediante canales remotos.",
        areaId: 7,
        nivelJerarquico: "OPERATIVO",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 29,
        nombre: "Técnico de Reparación",
        descripcion: "Diagnostica y repara fallas de hardware o software en productos de la empresa.",
        areaId: 7,
        nivelJerarquico: "OPERATIVO",
        tienePersonalACargo: false,
        activo: true
    },

    {
        id: 30,
        nombre: "Gestor de Garantías",
        descripcion: "Da seguimiento a garantías, reclamos, reemplazos y casos especiales de atención al cliente.",
        areaId: 7,
        nivelJerarquico: "OPERATIVO",
        tienePersonalACargo: false,
        activo: true
    }

];

//==========================================================
// Protección del catálogo
//==========================================================

PuestosData.forEach(Object.freeze);

Object.freeze(PuestosData);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.PuestosData = PuestosData;