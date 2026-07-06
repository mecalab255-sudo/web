/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/services/BootstrapService.js
 * ----------------------------------------------------------
 * Descripción:
 * Servicio de inicialización general del sistema.
 * Este archivo se encarga de cargar las colecciones iniciales
 * del sistema en localStorage utilizando los datos semilla
 * definidos en JS/data.
 *
 * Su objetivo es centralizar la inicialización de datos para
 * evitar que cada página o servicio tenga que cargar datos
 * por separado.
 * ==========================================================
 */

//==========================================================
// Colecciones iniciales del sistema
//==========================================================

const BootstrapCollections = [

    {
        key: StorageKeys.ROLES,
        dataName: "RolesData",
        descripcion: "Roles del sistema"
    },

    {
        key: StorageKeys.AREAS,
        dataName: "AreasData",
        descripcion: "Áreas de la organización"
    },

    {
        key: StorageKeys.PUESTOS,
        dataName: "PuestosData",
        descripcion: "Puestos de la organización"
    },

    {
        key: StorageKeys.COMPETENCIAS,
        dataName: "CompetenciasData",
        descripcion: "Competencias evaluables"
    },

    {
        key: StorageKeys.CATEGORIAS,
        dataName: "CategoriasData",
        descripcion: "Categorías de evaluación"
    },

    {
        key: StorageKeys.PRIORIDADES,
        dataName: "PrioridadesData",
        descripcion: "Prioridades del sistema"
    },

    {
        key: StorageKeys.CURSOS,
        dataName: "CursosData",
        descripcion: "Cursos recomendados"
    },

    {
        key: StorageKeys.USUARIOS,
        dataName: "UsuariosData",
        descripcion: "Usuarios iniciales"
    },

    {
        key: StorageKeys.CUESTIONARIOS,
        dataName: "CuestionariosData",
        descripcion: "Cuestionarios iniciales"
    },

    {
        key: StorageKeys.PREGUNTAS,
        dataName: "PreguntasData",
        descripcion: "Preguntas iniciales"
    },

    {
        key: StorageKeys.ASIGNACIONES,
        dataName: "AsignacionesData",
        descripcion: "Asignaciones iniciales"
    },

    {
        key: StorageKeys.RESULTADOS,
        dataName: "ResultadosData",
        descripcion: "Resultados iniciales"
    },

    {
        key: StorageKeys.RESPUESTAS,
        dataName: "RespuestasData",
        descripcion: "Respuestas iniciales"
    }

];

//==========================================================
// Servicio Bootstrap
//==========================================================

const BootstrapService = Object.freeze({

    /**
     * Verifica que las dependencias necesarias estén cargadas.
     *
     * @returns {boolean}
     */
    verificarDependencias() {

        if (typeof StorageKeys === "undefined") {

            console.error("BootstrapService: StorageKeys no está definido.");

            return false;

        }

        if (typeof Storage === "undefined") {

            console.error("BootstrapService: Storage no está definido.");

            return false;

        }

        return true;

    },

    /**
     * Inicializa todas las colecciones principales del sistema.
     * Cada colección se carga únicamente si aún no existe en
     * localStorage.
     *
     * @returns {boolean}
     */
    inicializar() {

        if (!this.verificarDependencias()) {

            return false;

        }

        BootstrapCollections.forEach((collection) => {

            const data = window[collection.dataName];

            if (typeof data === "undefined") {

                console.warn(
                    `BootstrapService: No se encontró ${collection.dataName}. Colección omitida.`
                );

                return;

            }

            const dataCopy = JSON.parse(JSON.stringify(data));

            Storage.init(collection.key, dataCopy);

        });

        console.info("BootstrapService: Sistema inicializado correctamente.");

        return true;

    },

    /**
     * Reinicia todas las colecciones principales del sistema.
     * Esta función elimina la información actual del sistema y
     * vuelve a cargar los datos semilla.
     *
     * Debe usarse únicamente durante pruebas o desarrollo.
     *
     * @returns {boolean}
     */
    reiniciarDatos() {

        if (!this.verificarDependencias()) {

            return false;

        }

        Storage.clearSystemData();

        this.inicializar();

        console.info("BootstrapService: Datos reiniciados correctamente.");

        return true;

    },

    /**
     * Devuelve un resumen del estado de las colecciones en
     * localStorage.
     *
     * @returns {Array}
     */
    obtenerEstado() {

        if (!this.verificarDependencias()) {

            return [];

        }

        return BootstrapCollections.map((collection) => {

            const data = Storage.get(collection.key, []);

            return {
                key: collection.key,
                dataName: collection.dataName,
                descripcion: collection.descripcion,
                existe: Storage.exists(collection.key),
                registros: Array.isArray(data) ? data.length : 0
            };

        });

    }

});

//==========================================================
// Protección de colecciones internas
//==========================================================

BootstrapCollections.forEach(Object.freeze);

Object.freeze(BootstrapCollections);

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.BootstrapService = BootstrapService;