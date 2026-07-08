/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/services/CuestionariosService.js
 * ----------------------------------------------------------
 * Descripción:
 * Servicio encargado de administrar cuestionarios y sus
 * preguntas relacionadas dentro del sistema.
 *
 * Este servicio centraliza las operaciones de cuestionarios
 * para evitar que las páginas accedan directamente a
 * localStorage.
 *
 * En la versión 1.1, las preguntas se almacenan como una
 * colección independiente en JS/data/preguntasData.js.
 * ==========================================================
 */

const CuestionariosService = Object.freeze({

    /**
     * Inicializa cuestionarios y preguntas si aún no existen.
     * Normalmente esta operación la realiza BootstrapService,
     * pero se conserva como respaldo.
     *
     * @returns {boolean}
     */
    inicializar() {

        if (typeof CuestionariosData !== "undefined") {

            Storage.init(
                StorageKeys.CUESTIONARIOS,
                JSON.parse(JSON.stringify(CuestionariosData))
            );

        }

        if (typeof PreguntasData !== "undefined") {

            Storage.init(
                StorageKeys.PREGUNTAS,
                JSON.parse(JSON.stringify(PreguntasData))
            );

        }

        return true;

    },

    /**
     * Restaura los cuestionarios y preguntas iniciales.
     *
     * @returns {boolean}
     */
    reiniciar() {

        if (typeof CuestionariosData !== "undefined") {

            Storage.set(
                StorageKeys.CUESTIONARIOS,
                JSON.parse(JSON.stringify(CuestionariosData))
            );

        }

        if (typeof PreguntasData !== "undefined") {

            Storage.set(
                StorageKeys.PREGUNTAS,
                JSON.parse(JSON.stringify(PreguntasData))
            );

        }

        return true;

    },

    /**
     * Normaliza un cuestionario para mantener compatibilidad
     * con versiones anteriores del sistema.
     *
     * @param {Object} cuestionario - Cuestionario original.
     * @returns {Object|null}
     */
    normalizarCuestionario(cuestionario) {

        if (!cuestionario) {

            return null;

        }

        const {
            preguntas,
            area,
            prioridad,
            ...datosBase
        } = cuestionario;

        return {

            ...datosBase,

            id: Number(cuestionario.id),

            titulo: cuestionario.titulo ?? "Cuestionario sin título",

            descripcion: cuestionario.descripcion ?? "",

            categoriaId: cuestionario.categoriaId ?? null,

            prioridadId: cuestionario.prioridadId ?? this.obtenerPrioridadIdPorNombre(prioridad) ?? null,

            areaIds: Array.isArray(cuestionario.areaIds)
                ? cuestionario.areaIds
                : [],

            competenciaIds: Array.isArray(cuestionario.competenciaIds)
                ? cuestionario.competenciaIds
                : [],

            aplicaTodasLasAreas: cuestionario.aplicaTodasLasAreas ?? false,

            activo: cuestionario.activo ?? true,

            fechaCreacion: cuestionario.fechaCreacion ?? new Date().toISOString().split("T")[0]

        };

    },

    /**
     * Intenta obtener el ID de prioridad a partir de su nombre.
     * Se usa solo como compatibilidad con cuestionarios antiguos.
     *
     * @param {string} nombrePrioridad - Nombre de prioridad.
     * @returns {number|null}
     */
    obtenerPrioridadIdPorNombre(nombrePrioridad) {

        if (!nombrePrioridad || typeof PrioridadesData === "undefined") {

            return null;

        }

        const prioridad = PrioridadesData.find(
            (item) => item.nombre.toLowerCase() === nombrePrioridad.toLowerCase()
        );

        return prioridad ? prioridad.id : null;

    },

    /**
     * Obtiene todos los cuestionarios registrados.
     *
     * @returns {Array}
     */
    obtenerTodos() {

        const cuestionarios = Storage.get(StorageKeys.CUESTIONARIOS, []);

        if (!Array.isArray(cuestionarios)) {

            return [];

        }

        return cuestionarios
            .map((cuestionario) => this.normalizarCuestionario(cuestionario))
            .filter((cuestionario) => cuestionario !== null);

    },

    /**
     * Obtiene solo cuestionarios activos.
     *
     * @returns {Array}
     */
    obtenerActivos() {

        return this.obtenerTodos().filter(
            (cuestionario) => cuestionario.activo === true
        );

    },

    /**
     * Guarda la lista completa de cuestionarios.
     *
     * @param {Array} cuestionarios - Lista de cuestionarios.
     * @returns {boolean}
     */
    guardarTodos(cuestionarios) {

        if (!Array.isArray(cuestionarios)) {

            console.error("CuestionariosService: La información debe ser un arreglo.");

            return false;

        }

        return Storage.set(StorageKeys.CUESTIONARIOS, cuestionarios);

    },

    /**
     * Busca un cuestionario por ID.
     *
     * @param {number} id - ID del cuestionario.
     * @returns {Object|null}
     */
    obtenerPorId(id) {

        const cuestionarioId = Number(id);

        return this.obtenerTodos().find(
            (cuestionario) => cuestionario.id === cuestionarioId
        ) || null;

    },

    /**
     * Obtiene las preguntas asociadas a un cuestionario.
     *
     * @param {number} cuestionarioId - ID del cuestionario.
     * @returns {Array}
     */
    obtenerPreguntas(cuestionarioId) {

        const id = Number(cuestionarioId);

        const preguntas = Storage.get(StorageKeys.PREGUNTAS, []);

        if (Array.isArray(preguntas) && preguntas.length > 0) {

            return preguntas
                .filter((pregunta) =>
                    pregunta.cuestionarioId === id &&
                    pregunta.activa !== false
                )
                .sort((a, b) => a.orden - b.orden);

        }

        // Compatibilidad temporal con cuestionarios antiguos
        // que todavía tengan preguntas dentro del objeto.
        const cuestionariosOriginales = Storage.get(StorageKeys.CUESTIONARIOS, []);

        const cuestionarioAntiguo = cuestionariosOriginales.find(
            (cuestionario) => cuestionario.id === id
        );

        if (!cuestionarioAntiguo || !Array.isArray(cuestionarioAntiguo.preguntas)) {

            return [];

        }

        return cuestionarioAntiguo.preguntas.map((pregunta, index) => {

            return {
                id: index + 1,
                cuestionarioId: id,
                competenciaId: null,
                categoriaId: cuestionarioAntiguo.categoriaId ?? null,
                prioridadId: cuestionarioAntiguo.prioridadId ?? null,
                afirmacion: typeof pregunta === "string" ? pregunta : pregunta.afirmacion,
                orden: index + 1,
                activa: true
            };

        });

    },

    /**
     * Obtiene un cuestionario junto con sus preguntas.
     *
     * @param {number} id - ID del cuestionario.
     * @returns {Object|null}
     */
    obtenerConPreguntas(id) {

        const cuestionario = this.obtenerPorId(id);

        if (!cuestionario) {

            return null;

        }

        return {
            ...cuestionario,
            preguntas: this.obtenerPreguntas(cuestionario.id)
        };

    },

    /**
     * Obtiene todos los cuestionarios con sus preguntas.
     *
     * @returns {Array}
     */
    obtenerTodosConPreguntas() {

        return this.obtenerTodos().map((cuestionario) => {

            return {
                ...cuestionario,
                preguntas: this.obtenerPreguntas(cuestionario.id)
            };

        });

    },

    /**
     * Crea un nuevo cuestionario.
     *
     * Si el objeto recibido contiene preguntas, estas se
     * separan y se guardan en la colección Preguntas.
     *
     * @param {Object} nuevoCuestionario - Datos del cuestionario.
     * @returns {Object|null}
     */
    crear(nuevoCuestionario) {

        if (!nuevoCuestionario || !nuevoCuestionario.titulo) {

            console.error("CuestionariosService: Datos de cuestionario incompletos.");

            return null;

        }

        const cuestionarios = this.obtenerTodos();

        const cuestionarioId = nuevoCuestionario.id ?? Storage.getNextId(StorageKeys.CUESTIONARIOS);

        const cuestionarioCreado = this.normalizarCuestionario({

            id: cuestionarioId,

            titulo: nuevoCuestionario.titulo,

            descripcion: nuevoCuestionario.descripcion ?? "",

            categoriaId: nuevoCuestionario.categoriaId ?? null,

            prioridadId: nuevoCuestionario.prioridadId ?? null,

            areaIds: Array.isArray(nuevoCuestionario.areaIds)
                ? nuevoCuestionario.areaIds
                : [],

            competenciaIds: Array.isArray(nuevoCuestionario.competenciaIds)
                ? nuevoCuestionario.competenciaIds
                : [],

            aplicaTodasLasAreas: nuevoCuestionario.aplicaTodasLasAreas ?? false,

            activo: nuevoCuestionario.activo ?? true,

            fechaCreacion: nuevoCuestionario.fechaCreacion ?? new Date().toISOString().split("T")[0]

        });

        cuestionarios.push(cuestionarioCreado);

        this.guardarTodos(cuestionarios);

        if (Array.isArray(nuevoCuestionario.preguntas)) {

            this.crearPreguntasDesdeCuestionario(
                cuestionarioCreado,
                nuevoCuestionario.preguntas
            );

        }

        return cuestionarioCreado;

    },

    /**
     * Crea preguntas relacionadas con un cuestionario.
     *
     * @param {Object} cuestionario - Cuestionario base.
     * @param {Array} preguntas - Lista de preguntas o afirmaciones.
     * @returns {Array}
     */
    crearPreguntasDesdeCuestionario(cuestionario, preguntas) {

        if (!cuestionario || !Array.isArray(preguntas)) {

            return [];

        }

        const preguntasActuales = Storage.get(StorageKeys.PREGUNTAS, []);

        const nuevasPreguntas = preguntas.map((pregunta, index) => {

            const preguntaId = Storage.getNextId(StorageKeys.PREGUNTAS) + index;

            const afirmacion = typeof pregunta === "string"
                ? pregunta
                : pregunta.afirmacion;

            return {
                id: preguntaId,
                cuestionarioId: cuestionario.id,
                competenciaId: pregunta.competenciaId ?? cuestionario.competenciaIds[0] ?? null,
                categoriaId: pregunta.categoriaId ?? cuestionario.categoriaId ?? null,
                prioridadId: pregunta.prioridadId ?? cuestionario.prioridadId ?? null,
                afirmacion,
                orden: pregunta.orden ?? index + 1,
                activa: pregunta.activa ?? true
            };

        });

        Storage.set(
            StorageKeys.PREGUNTAS,
            [
                ...preguntasActuales,
                ...nuevasPreguntas
            ]
        );

        return nuevasPreguntas;

    },

    /**
     * Actualiza un cuestionario existente.
     *
     * @param {number} id - ID del cuestionario.
     * @param {Object} datosActualizados - Datos a modificar.
     * @returns {Object|null}
     */
    actualizar(id, datosActualizados) {

        const cuestionarioId = Number(id);

        const cuestionarios = this.obtenerTodos();

        const indice = cuestionarios.findIndex(
            (cuestionario) => cuestionario.id === cuestionarioId
        );

        if (indice === -1) {

            console.warn("CuestionariosService: No se encontró el cuestionario a actualizar.");

            return null;

        }

        const cuestionarioActualizado = this.normalizarCuestionario({
            ...cuestionarios[indice],
            ...datosActualizados
        });

        cuestionarios[indice] = cuestionarioActualizado;

        this.guardarTodos(cuestionarios);

        return cuestionarioActualizado;

    },

    /**
     * Elimina un cuestionario y sus preguntas asociadas.
     *
     * @param {number} id - ID del cuestionario.
     * @returns {boolean}
     */
    eliminar(id) {

        const cuestionarioId = Number(id);

        const cuestionarios = this.obtenerTodos();

        const nuevaLista = cuestionarios.filter(
            (cuestionario) => cuestionario.id !== cuestionarioId
        );

        if (nuevaLista.length === cuestionarios.length) {

            console.warn("CuestionariosService: No se encontró el cuestionario a eliminar.");

            return false;

        }

        this.guardarTodos(nuevaLista);

        const preguntas = Storage.get(StorageKeys.PREGUNTAS, []);

        if (Array.isArray(preguntas)) {

            const preguntasFiltradas = preguntas.filter(
                (pregunta) => pregunta.cuestionarioId !== cuestionarioId
            );

            Storage.set(StorageKeys.PREGUNTAS, preguntasFiltradas);

        }

        return true;

    },

    /**
     * Obtiene cuestionarios por categoría.
     *
     * @param {number} categoriaId - ID de categoría.
     * @returns {Array}
     */
    obtenerPorCategoria(categoriaId) {

        const id = Number(categoriaId);

        return this.obtenerTodos().filter(
            (cuestionario) => cuestionario.categoriaId === id
        );

    },

    /**
     * Obtiene cuestionarios por prioridad.
     *
     * @param {number} prioridadId - ID de prioridad.
     * @returns {Array}
     */
    obtenerPorPrioridad(prioridadId) {

        const id = Number(prioridadId);

        return this.obtenerTodos().filter(
            (cuestionario) => cuestionario.prioridadId === id
        );

    },

    /**
     * Obtiene cuestionarios por área.
     *
     * @param {number} areaId - ID de área.
     * @returns {Array}
     */
    obtenerPorArea(areaId) {

        const id = Number(areaId);

        return this.obtenerTodos().filter(
            (cuestionario) =>
                cuestionario.aplicaTodasLasAreas === true ||
                cuestionario.areaIds.includes(id)
        );

    },

    /**
     * Obtiene cuestionarios asociados a una competencia.
     *
     * @param {number} competenciaId - ID de competencia.
     * @returns {Array}
     */
    obtenerPorCompetencia(competenciaId) {

        const id = Number(competenciaId);

        return this.obtenerTodos().filter(
            (cuestionario) => cuestionario.competenciaIds.includes(id)
        );

    },

    /**
     * Devuelve la cantidad total de cuestionarios.
     *
     * @returns {number}
     */
    contar() {

        return this.obtenerTodos().length;

    }

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.CuestionariosService = CuestionariosService;