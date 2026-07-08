/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/utils/idGenerator.js
 * ----------------------------------------------------------
 * Descripción:
 * Utilidad centralizada para generar identificadores únicos
 * dentro de las colecciones almacenadas en el sistema.
 *
 * Este archivo evita el uso de Date.now() o Math.random()
 * como identificadores principales y permite mantener IDs
 * consecutivos y consistentes para usuarios, cuestionarios,
 * preguntas, asignaciones, resultados y respuestas.
 * ==========================================================
 */

const IdGenerator = Object.freeze({

    /**
     * Obtiene el siguiente ID disponible dentro de una lista.
     *
     * @param {Array} lista - Colección de objetos con campo id.
     * @returns {number}
     */
    obtenerSiguienteId(lista = []) {

        if (!Array.isArray(lista) || lista.length === 0) {

            return 1;

        }

        const ids = lista
            .map((item) => Number(item.id))
            .filter((id) => !Number.isNaN(id));

        if (ids.length === 0) {

            return 1;

        }

        return Math.max(...ids) + 1;

    },

    /**
     * Obtiene el siguiente ID disponible desde una colección
     * almacenada en Storage.
     *
     * @param {string} key - Llave de StorageKeys.
     * @returns {number}
     */
    obtenerSiguienteIdPorKey(key) {

        if (!key) {

            console.error("IdGenerator: No se recibió una llave válida.");

            return 1;

        }

        if (typeof Storage === "undefined") {

            console.error("IdGenerator: Storage no está definido.");

            return 1;

        }

        const coleccion = Storage.get(key, []);

        return this.obtenerSiguienteId(coleccion);

    },

    /**
     * Genera un ID para una colección específica.
     *
     * @param {string} key - Llave de StorageKeys.
     * @returns {number}
     */
    generar(key) {

        return this.obtenerSiguienteIdPorKey(key);

    },

    /**
     * Genera un ID para usuarios.
     *
     * @returns {number}
     */
    generarUsuarioId() {

        return this.generar(StorageKeys.USUARIOS);

    },

    /**
     * Genera un ID para cuestionarios.
     *
     * @returns {number}
     */
    generarCuestionarioId() {

        return this.generar(StorageKeys.CUESTIONARIOS);

    },

    /**
     * Genera un ID para preguntas.
     *
     * @returns {number}
     */
    generarPreguntaId() {

        return this.generar(StorageKeys.PREGUNTAS);

    },

    /**
     * Genera un ID para asignaciones.
     *
     * @returns {number}
     */
    generarAsignacionId() {

        return this.generar(StorageKeys.ASIGNACIONES);

    },

    /**
     * Genera un ID para resultados.
     *
     * @returns {number}
     */
    generarResultadoId() {

        return this.generar(StorageKeys.RESULTADOS);

    },

    /**
     * Genera un ID para respuestas.
     *
     * @returns {number}
     */
    generarRespuestaId() {

        return this.generar(StorageKeys.RESPUESTAS);

    }

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.IdGenerator = IdGenerator;