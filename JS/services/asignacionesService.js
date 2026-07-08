/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/services/AsignacionesService.js
 * ----------------------------------------------------------
 * Descripción:
 * Servicio encargado de administrar las asignaciones de
 * cuestionarios dentro del sistema.
 *
 * Este servicio permite determinar qué cuestionarios han sido
 * asignados a usuarios, áreas o puestos específicos, evitando
 * que las páginas accedan directamente a localStorage.
 * ==========================================================
 */

const AsignacionesService = Object.freeze({

    /**
     * Inicializa la colección de asignaciones si aún no existe.
     * Normalmente esta operación será realizada por
     * BootstrapService, pero se conserva como respaldo.
     *
     * @returns {boolean}
     */
    inicializar() {

        if (typeof AsignacionesData === "undefined") {

            console.warn("AsignacionesService: AsignacionesData no está definido.");

            return false;

        }

        return Storage.init(
            StorageKeys.ASIGNACIONES,
            JSON.parse(JSON.stringify(AsignacionesData))
        );

    },

    /**
     * Restaura las asignaciones iniciales del sistema.
     *
     * @returns {boolean}
     */
    reiniciar() {

        if (typeof AsignacionesData === "undefined") {

            console.warn("AsignacionesService: AsignacionesData no está definido.");

            return false;

        }

        return Storage.set(
            StorageKeys.ASIGNACIONES,
            JSON.parse(JSON.stringify(AsignacionesData))
        );

    },

    /**
     * Normaliza una asignación para mantener una estructura
     * consistente.
     *
     * @param {Object} asignacion - Asignación original.
     * @returns {Object|null}
     */
    normalizarAsignacion(asignacion) {

        if (!asignacion) {

            return null;

        }

        return {

            id: Number(asignacion.id),

            cuestionarioId: Number(asignacion.cuestionarioId),

            tipoDestino: String(asignacion.tipoDestino ?? "").toUpperCase(),

            destinoId: Number(asignacion.destinoId),

            asignadoPorUsuarioId: asignacion.asignadoPorUsuarioId ?? null,

            fechaAsignacion: asignacion.fechaAsignacion ?? new Date().toISOString().split("T")[0],

            fechaLimite: asignacion.fechaLimite ?? null,

            activa: asignacion.activa ?? true

        };

    },

    /**
     * Normaliza una lista de asignaciones.
     *
     * @param {Array} asignaciones - Lista de asignaciones.
     * @returns {Array}
     */
    normalizarLista(asignaciones) {

        if (!Array.isArray(asignaciones)) {

            return [];

        }

        return asignaciones
            .map((asignacion) => this.normalizarAsignacion(asignacion))
            .filter((asignacion) => asignacion !== null);

    },

    /**
     * Obtiene todas las asignaciones registradas.
     *
     * @returns {Array}
     */
    obtenerTodas() {

        const asignaciones = Storage.get(StorageKeys.ASIGNACIONES, []);

        return this.normalizarLista(asignaciones);

    },

    /**
     * Obtiene únicamente asignaciones activas.
     *
     * @returns {Array}
     */
    obtenerActivas() {

        return this.obtenerTodas().filter(
            (asignacion) => asignacion.activa === true
        );

    },

    /**
     * Guarda la lista completa de asignaciones.
     *
     * @param {Array} asignaciones - Lista de asignaciones.
     * @returns {boolean}
     */
    guardarTodas(asignaciones) {

        if (!Array.isArray(asignaciones)) {

            console.error("AsignacionesService: La información debe ser un arreglo.");

            return false;

        }

        return Storage.set(StorageKeys.ASIGNACIONES, asignaciones);

    },

    /**
     * Busca una asignación por ID.
     *
     * @param {number} id - ID de la asignación.
     * @returns {Object|null}
     */
    obtenerPorId(id) {

        const asignacionId = Number(id);

        return this.obtenerTodas().find(
            (asignacion) => asignacion.id === asignacionId
        ) || null;

    },

    /**
     * Obtiene asignaciones por cuestionario.
     *
     * @param {number} cuestionarioId - ID del cuestionario.
     * @returns {Array}
     */
    obtenerPorCuestionario(cuestionarioId) {

        const id = Number(cuestionarioId);

        return this.obtenerActivas().filter(
            (asignacion) => asignacion.cuestionarioId === id
        );

    },

    /**
     * Obtiene asignaciones por tipo de destino.
     *
     * @param {string} tipoDestino - USUARIO, AREA o PUESTO.
     * @returns {Array}
     */
    obtenerPorTipoDestino(tipoDestino) {

        const tipo = String(tipoDestino ?? "").toUpperCase();

        return this.obtenerActivas().filter(
            (asignacion) => asignacion.tipoDestino === tipo
        );

    },

    /**
     * Obtiene asignaciones directas de un usuario.
     *
     * @param {number} usuarioId - ID del usuario.
     * @returns {Array}
     */
    obtenerPorUsuarioId(usuarioId) {

        const id = Number(usuarioId);

        return this.obtenerActivas().filter(
            (asignacion) =>
                asignacion.tipoDestino === "USUARIO" &&
                asignacion.destinoId === id
        );

    },

    /**
     * Obtiene asignaciones realizadas a un área.
     *
     * @param {number} areaId - ID del área.
     * @returns {Array}
     */
    obtenerPorAreaId(areaId) {

        const id = Number(areaId);

        return this.obtenerActivas().filter(
            (asignacion) =>
                asignacion.tipoDestino === "AREA" &&
                asignacion.destinoId === id
        );

    },

    /**
     * Obtiene asignaciones realizadas a un puesto.
     *
     * @param {number} puestoId - ID del puesto.
     * @returns {Array}
     */
    obtenerPorPuestoId(puestoId) {

        const id = Number(puestoId);

        return this.obtenerActivas().filter(
            (asignacion) =>
                asignacion.tipoDestino === "PUESTO" &&
                asignacion.destinoId === id
        );

    },

    /**
     * Obtiene todas las asignaciones aplicables a un usuario.
     *
     * Considera asignaciones directas por usuario, por área
     * y por puesto.
     *
     * @param {Object} usuario - Usuario del sistema.
     * @returns {Array}
     */
    obtenerAsignacionesParaUsuario(usuario) {

        if (!usuario) {

            return [];

        }

        const usuarioNormalizado = typeof UsuariosService !== "undefined"
            ? UsuariosService.normalizarUsuario(usuario)
            : usuario;

        const usuarioId = Number(usuarioNormalizado.id);

        const areaId = Number(usuarioNormalizado.areaId ?? usuarioNormalizado.idArea);

        const puestoId = Number(usuarioNormalizado.puestoId ?? usuarioNormalizado.idPuesto);

        const asignaciones = this.obtenerActivas().filter((asignacion) => {

            if (asignacion.tipoDestino === "USUARIO") {

                return asignacion.destinoId === usuarioId;

            }

            if (asignacion.tipoDestino === "AREA") {

                return asignacion.destinoId === areaId;

            }

            if (asignacion.tipoDestino === "PUESTO") {

                return asignacion.destinoId === puestoId;

            }

            return false;

        });

        return this.eliminarDuplicadosPorCuestionario(asignaciones);

    },

    /**
     * Elimina asignaciones duplicadas para el mismo cuestionario.
     *
     * Esto evita que un usuario vea dos veces el mismo
     * cuestionario si está asignado por usuario y por área.
     *
     * @param {Array} asignaciones - Lista de asignaciones.
     * @returns {Array}
     */
    eliminarDuplicadosPorCuestionario(asignaciones) {

        const mapa = new Map();

        asignaciones.forEach((asignacion) => {

            if (!mapa.has(asignacion.cuestionarioId)) {

                mapa.set(asignacion.cuestionarioId, asignacion);

            }

        });

        return Array.from(mapa.values());

    },

    /**
     * Obtiene los IDs de cuestionarios asignados a un usuario.
     *
     * @param {Object} usuario - Usuario del sistema.
     * @returns {Array}
     */
    obtenerIdsCuestionariosParaUsuario(usuario) {

        return this.obtenerAsignacionesParaUsuario(usuario).map(
            (asignacion) => asignacion.cuestionarioId
        );

    },

    /**
     * Obtiene los cuestionarios asignados a un usuario.
     *
     * Requiere que CuestionariosService esté cargado.
     *
     * @param {Object} usuario - Usuario del sistema.
     * @returns {Array}
     */
    obtenerCuestionariosParaUsuario(usuario) {

        if (typeof CuestionariosService === "undefined") {

            console.warn("AsignacionesService: CuestionariosService no está definido.");

            return [];

        }

        const ids = this.obtenerIdsCuestionariosParaUsuario(usuario);

        return ids
            .map((id) => CuestionariosService.obtenerPorId(id))
            .filter((cuestionario) => cuestionario !== null);

    },

    /**
     * Verifica si un usuario tiene asignado un cuestionario.
     *
     * @param {Object} usuario - Usuario del sistema.
     * @param {number} cuestionarioId - ID del cuestionario.
     * @returns {boolean}
     */
    usuarioTieneCuestionario(usuario, cuestionarioId) {

        const id = Number(cuestionarioId);

        return this.obtenerIdsCuestionariosParaUsuario(usuario).includes(id);

    },

    /**
     * Verifica si un usuario ya respondió un cuestionario.
     *
     * @param {Object} usuario - Usuario del sistema.
     * @param {number} cuestionarioId - ID del cuestionario.
     * @returns {boolean}
     */
    usuarioYaRespondio(usuario, cuestionarioId) {

        if (!usuario) {

            return false;

        }

        const resultados = Storage.get(StorageKeys.RESULTADOS, []);

        const usuarioId = Number(usuario.id);

        const idCuestionario = Number(cuestionarioId);

        if (!Array.isArray(resultados)) {

            return false;

        }

        return resultados.some(
            (resultado) =>
                Number(resultado.usuarioId) === usuarioId &&
                Number(resultado.cuestionarioId) === idCuestionario &&
                resultado.estado === "COMPLETADO"
        );

    },

    /**
     * Obtiene cuestionarios pendientes para un usuario.
     *
     * @param {Object} usuario - Usuario del sistema.
     * @returns {Array}
     */
    obtenerCuestionariosPendientesParaUsuario(usuario) {

        const cuestionarios = this.obtenerCuestionariosParaUsuario(usuario);

        return cuestionarios.filter(
            (cuestionario) =>
                !this.usuarioYaRespondio(usuario, cuestionario.id)
        );

    },

    /**
     * Crea una nueva asignación.
     *
     * @param {Object} nuevaAsignacion - Datos de la asignación.
     * @returns {Object|null}
     */
    crear(nuevaAsignacion) {

        if (
            !nuevaAsignacion ||
            !nuevaAsignacion.cuestionarioId ||
            !nuevaAsignacion.tipoDestino ||
            !nuevaAsignacion.destinoId
        ) {

            console.error("AsignacionesService: Datos de asignación incompletos.");

            return null;

        }

        const tipoDestino = String(nuevaAsignacion.tipoDestino).toUpperCase();

        if (!["USUARIO", "AREA", "PUESTO"].includes(tipoDestino)) {

            console.error("AsignacionesService: tipoDestino no válido.");

            return null;

        }

        const asignaciones = this.obtenerTodas();

        const asignacionCreada = this.normalizarAsignacion({

            id: nuevaAsignacion.id ?? Storage.getNextId(StorageKeys.ASIGNACIONES),

            cuestionarioId: nuevaAsignacion.cuestionarioId,

            tipoDestino,

            destinoId: nuevaAsignacion.destinoId,

            asignadoPorUsuarioId: nuevaAsignacion.asignadoPorUsuarioId ?? null,

            fechaAsignacion: nuevaAsignacion.fechaAsignacion ?? new Date().toISOString().split("T")[0],

            fechaLimite: nuevaAsignacion.fechaLimite ?? null,

            activa: nuevaAsignacion.activa ?? true

        });

        asignaciones.push(asignacionCreada);

        this.guardarTodas(asignaciones);

        return asignacionCreada;

    },

    /**
     * Actualiza una asignación existente.
     *
     * @param {number} id - ID de la asignación.
     * @param {Object} datosActualizados - Datos a modificar.
     * @returns {Object|null}
     */
    actualizar(id, datosActualizados) {

        const asignacionId = Number(id);

        const asignaciones = this.obtenerTodas();

        const indice = asignaciones.findIndex(
            (asignacion) => asignacion.id === asignacionId
        );

        if (indice === -1) {

            console.warn("AsignacionesService: No se encontró la asignación a actualizar.");

            return null;

        }

        const asignacionActualizada = this.normalizarAsignacion({
            ...asignaciones[indice],
            ...datosActualizados
        });

        asignaciones[indice] = asignacionActualizada;

        this.guardarTodas(asignaciones);

        return asignacionActualizada;

    },

    /**
     * Desactiva una asignación sin eliminarla del historial.
     *
     * @param {number} id - ID de la asignación.
     * @returns {Object|null}
     */
    desactivar(id) {

        return this.actualizar(id, { activa: false });

    },

    /**
     * Elimina una asignación.
     *
     * En una versión comercial convendría desactivarla en lugar
     * de eliminarla para conservar historial.
     *
     * @param {number} id - ID de la asignación.
     * @returns {boolean}
     */
    eliminar(id) {

        const asignacionId = Number(id);

        const asignaciones = this.obtenerTodas();

        const nuevaLista = asignaciones.filter(
            (asignacion) => asignacion.id !== asignacionId
        );

        if (nuevaLista.length === asignaciones.length) {

            console.warn("AsignacionesService: No se encontró la asignación a eliminar.");

            return false;

        }

        return this.guardarTodas(nuevaLista);

    },

    /**
     * Cuenta todas las asignaciones registradas.
     *
     * @returns {number}
     */
    contar() {

        return this.obtenerTodas().length;

    },

    /**
     * Cuenta las asignaciones activas.
     *
     * @returns {number}
     */
    contarActivas() {

        return this.obtenerActivas().length;

    }

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.AsignacionesService = AsignacionesService;