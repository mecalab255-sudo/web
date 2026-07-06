/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/utils/storage.js
 * ----------------------------------------------------------
 * Descripción:
 * Utilidad centralizada para el manejo de almacenamiento
 * local del sistema.
 *
 * Este archivo encapsula las operaciones realizadas sobre
 * localStorage para evitar que las páginas y servicios
 * manipulen directamente la capa de almacenamiento.
 *
 * En futuras versiones, esta utilidad podrá ser sustituida
 * por llamadas a una API sin modificar la lógica principal
 * de los módulos.
 * ==========================================================
 */

const Storage = Object.freeze({

    /**
     * Guarda información en localStorage.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {*} data - Información a guardar.
     */
    set(key, data) {

        try {

            localStorage.setItem(key, JSON.stringify(data));

            return true;

        } catch (error) {

            console.error("Error al guardar información en Storage:", error);

            return false;

        }

    },

    /**
     * Obtiene información desde localStorage.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {*} defaultValue - Valor por defecto si no existe información.
     * @returns {*} Información almacenada o valor por defecto.
     */
    get(key, defaultValue = null) {

        try {

            const data = localStorage.getItem(key);

            if (data === null) {

                return defaultValue;

            }

            return JSON.parse(data);

        } catch (error) {

            console.error("Error al leer información desde Storage:", error);

            return defaultValue;

        }

    },

    /**
     * Elimina una entrada específica de localStorage.
     *
     * @param {string} key - Llave de almacenamiento.
     */
    remove(key) {

        try {

            localStorage.removeItem(key);

            return true;

        } catch (error) {

            console.error("Error al eliminar información de Storage:", error);

            return false;

        }

    },

    /**
     * Verifica si existe una llave en localStorage.
     *
     * @param {string} key - Llave de almacenamiento.
     * @returns {boolean}
     */
    exists(key) {

        return localStorage.getItem(key) !== null;

    },

    /**
     * Inicializa una colección en localStorage solo si aún no existe.
     *
     * Esta función es útil para cargar datos semilla como:
     * UsuariosData, RolesData, AreasData, CuestionariosData, etc.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {Array|Object} initialData - Datos iniciales.
     */
    init(key, initialData) {

        if (!this.exists(key)) {

            return this.set(key, initialData);

        }

        return false;

    },

    /**
     * Reemplaza completamente una colección almacenada.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {Array|Object} data - Nueva información.
     */
    update(key, data) {

        return this.set(key, data);

    },

    /**
     * Agrega un nuevo registro a una colección tipo arreglo.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {Object} item - Registro nuevo.
     */
    addToCollection(key, item) {

        const collection = this.get(key, []);

        if (!Array.isArray(collection)) {

            console.error("La colección indicada no es un arreglo:", key);

            return false;

        }

        collection.push(item);

        return this.set(key, collection);

    },

    /**
     * Actualiza un registro dentro de una colección por ID.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {number} id - ID del registro a actualizar.
     * @param {Object} updatedItem - Datos actualizados.
     */
    updateInCollection(key, id, updatedItem) {

        const collection = this.get(key, []);

        if (!Array.isArray(collection)) {

            console.error("La colección indicada no es un arreglo:", key);

            return false;

        }

        const index = collection.findIndex((item) => item.id === id);

        if (index === -1) {

            console.warn("No se encontró el registro con ID:", id);

            return false;

        }

        collection[index] = {
            ...collection[index],
            ...updatedItem
        };

        return this.set(key, collection);

    },

    /**
     * Elimina un registro de una colección por ID.
     *
     * @param {string} key - Llave de almacenamiento.
     * @param {number} id - ID del registro a eliminar.
     */
    removeFromCollection(key, id) {

        const collection = this.get(key, []);

        if (!Array.isArray(collection)) {

            console.error("La colección indicada no es un arreglo:", key);

            return false;

        }

        const filteredCollection = collection.filter((item) => item.id !== id);

        return this.set(key, filteredCollection);

    },

    /**
     * Obtiene el siguiente ID disponible dentro de una colección.
     *
     * @param {string} key - Llave de almacenamiento.
     * @returns {number}
     */
    getNextId(key) {

        const collection = this.get(key, []);

        if (!Array.isArray(collection) || collection.length === 0) {

            return 1;

        }

        const maxId = Math.max(...collection.map((item) => item.id || 0));

        return maxId + 1;

    },

    /**
     * Limpia todas las llaves principales del sistema.
     *
     * Esta función debe usarse con cuidado. Es útil para pruebas,
     * reinicio de datos o depuración durante el desarrollo.
     */
    clearSystemData() {

        if (typeof StorageKeys === "undefined") {

            console.error("StorageKeys no está definido.");

            return false;

        }

        Object.values(StorageKeys).forEach((key) => {

            localStorage.removeItem(key);

        });

        return true;

    }

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.Storage = Storage;