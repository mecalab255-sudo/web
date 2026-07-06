/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/services/resultadosService.js
 * ----------------------------------------------------------
 * Descripción:
 * Servicio encargado de administrar resultados y respuestas
 * generadas al responder cuestionarios dentro del sistema.
 *
 * Este servicio centraliza la creación, consulta y filtrado
 * de resultados para evitar que las páginas accedan
 * directamente a localStorage.
 *
 * También permite calcular promedios generales, promedios
 * por competencia y recomendaciones de cursos con base en
 * necesidades detectadas.
 * ==========================================================
 */

const ResultadosService = Object.freeze({

    /**
     * Inicializa resultados y respuestas si aún no existen.
     * Normalmente esta operación será realizada por
     * BootstrapService, pero se conserva como respaldo.
     *
     * @returns {boolean}
     */
    inicializar() {

        if (typeof ResultadosData !== "undefined") {

            Storage.init(
                StorageKeys.RESULTADOS,
                JSON.parse(JSON.stringify(ResultadosData))
            );

        }

        if (typeof RespuestasData !== "undefined") {

            Storage.init(
                StorageKeys.RESPUESTAS,
                JSON.parse(JSON.stringify(RespuestasData))
            );

        }

        return true;

    },

    /**
     * Restaura los resultados y respuestas iniciales.
     *
     * @returns {boolean}
     */
    reiniciar() {

        if (typeof ResultadosData !== "undefined") {

            Storage.set(
                StorageKeys.RESULTADOS,
                JSON.parse(JSON.stringify(ResultadosData))
            );

        }

        if (typeof RespuestasData !== "undefined") {

            Storage.set(
                StorageKeys.RESPUESTAS,
                JSON.parse(JSON.stringify(RespuestasData))
            );

        }

        return true;

    },

    /**
     * Normaliza un resultado para mantener una estructura
     * consistente.
     *
     * @param {Object} resultado - Resultado original.
     * @returns {Object|null}
     */
    normalizarResultado(resultado) {

        if (!resultado) {

            return null;

        }

        return {

            id: Number(resultado.id),

            usuarioId: Number(resultado.usuarioId),

            cuestionarioId: Number(resultado.cuestionarioId),

            asignacionId: resultado.asignacionId !== undefined && resultado.asignacionId !== null
                ? Number(resultado.asignacionId)
                : null,

            fecha: resultado.fecha ?? new Date().toISOString().split("T")[0],

            promedioGeneral: Number(resultado.promedioGeneral ?? resultado.promedio ?? 0),

            estado: resultado.estado ?? "COMPLETADO",

            observaciones: resultado.observaciones ?? "",

            activo: resultado.activo ?? true

        };

    },

    /**
     * Normaliza una respuesta individual.
     *
     * @param {Object} respuesta - Respuesta original.
     * @returns {Object|null}
     */
    normalizarRespuesta(respuesta) {

        if (!respuesta) {

            return null;

        }

        return {

            id: Number(respuesta.id),

            resultadoId: Number(respuesta.resultadoId),

            preguntaId: Number(respuesta.preguntaId),

            valor: Number(respuesta.valor)

        };

    },

    /**
     * Normaliza una lista de resultados.
     *
     * @param {Array} resultados - Lista de resultados.
     * @returns {Array}
     */
    normalizarResultados(resultados) {

        if (!Array.isArray(resultados)) {

            return [];

        }

        return resultados
            .map((resultado) => this.normalizarResultado(resultado))
            .filter((resultado) => resultado !== null);

    },

    /**
     * Normaliza una lista de respuestas.
     *
     * @param {Array} respuestas - Lista de respuestas.
     * @returns {Array}
     */
    normalizarRespuestas(respuestas) {

        if (!Array.isArray(respuestas)) {

            return [];

        }

        return respuestas
            .map((respuesta) => this.normalizarRespuesta(respuesta))
            .filter((respuesta) => respuesta !== null);

    },

    /**
     * Obtiene todos los resultados registrados.
     *
     * @returns {Array}
     */
    obtenerTodos() {

        const resultados = Storage.get(StorageKeys.RESULTADOS, []);

        return this.normalizarResultados(resultados);

    },

    /**
     * Obtiene todas las respuestas registradas.
     *
     * @returns {Array}
     */
    obtenerTodasLasRespuestas() {

        const respuestas = Storage.get(StorageKeys.RESPUESTAS, []);

        return this.normalizarRespuestas(respuestas);

    },

    /**
     * Guarda la lista completa de resultados.
     *
     * @param {Array} resultados - Lista de resultados.
     * @returns {boolean}
     */
    guardarTodos(resultados) {

        if (!Array.isArray(resultados)) {

            console.error("ResultadosService: Los resultados deben ser un arreglo.");

            return false;

        }

        return Storage.set(StorageKeys.RESULTADOS, resultados);

    },

    /**
     * Guarda la lista completa de respuestas.
     *
     * @param {Array} respuestas - Lista de respuestas.
     * @returns {boolean}
     */
    guardarTodasLasRespuestas(respuestas) {

        if (!Array.isArray(respuestas)) {

            console.error("ResultadosService: Las respuestas deben ser un arreglo.");

            return false;

        }

        return Storage.set(StorageKeys.RESPUESTAS, respuestas);

    },

    /**
     * Busca un resultado por ID.
     *
     * @param {number} id - ID del resultado.
     * @returns {Object|null}
     */
    obtenerPorId(id) {

        const resultadoId = Number(id);

        return this.obtenerTodos().find(
            (resultado) => resultado.id === resultadoId
        ) || null;

    },

    /**
     * Obtiene resultados por usuario.
     *
     * @param {number} usuarioId - ID del usuario.
     * @returns {Array}
     */
    obtenerPorUsuario(usuarioId) {

        const id = Number(usuarioId);

        return this.obtenerTodos().filter(
            (resultado) => resultado.usuarioId === id
        );

    },

    /**
     * Obtiene resultados por cuestionario.
     *
     * @param {number} cuestionarioId - ID del cuestionario.
     * @returns {Array}
     */
    obtenerPorCuestionario(cuestionarioId) {

        const id = Number(cuestionarioId);

        return this.obtenerTodos().filter(
            (resultado) => resultado.cuestionarioId === id
        );

    },

    /**
     * Obtiene respuestas asociadas a un resultado.
     *
     * @param {number} resultadoId - ID del resultado.
     * @returns {Array}
     */
    obtenerRespuestasPorResultado(resultadoId) {

        const id = Number(resultadoId);

        return this.obtenerTodasLasRespuestas().filter(
            (respuesta) => respuesta.resultadoId === id
        );

    },

    /**
     * Obtiene el usuario asociado a un resultado.
     *
     * @param {Object} resultado - Resultado.
     * @returns {Object|null}
     */
    obtenerUsuarioDelResultado(resultado) {

        if (!resultado) {

            return null;

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerPorId(resultado.usuarioId);

        }

        const usuarios = Storage.get(StorageKeys.USUARIOS, []);

        return usuarios.find(
            (usuario) => Number(usuario.id) === Number(resultado.usuarioId)
        ) || null;

    },

    /**
     * Obtiene resultados por área del usuario evaluado.
     *
     * @param {number} areaId - ID del área.
     * @returns {Array}
     */
    obtenerPorArea(areaId) {

        const id = Number(areaId);

        return this.obtenerTodos().filter((resultado) => {

            const usuario = this.obtenerUsuarioDelResultado(resultado);

            if (!usuario) {

                return false;

            }

            const usuarioAreaId = Number(usuario.areaId ?? usuario.idArea);

            return usuarioAreaId === id;

        });

    },

    /**
     * Obtiene resultados visibles según el rol del usuario.
     *
     * Administrador: todos los resultados.
     * Supervisor: resultados de su área.
     * Empleado: solo sus propios resultados.
     *
     * @param {Object} usuarioActivo - Usuario con sesión activa.
     * @returns {Array}
     */
    obtenerPorPermisos(usuarioActivo) {

        if (!usuarioActivo) {

            return [];

        }

        const usuario = typeof UsuariosService !== "undefined"
            ? UsuariosService.normalizarUsuario(usuarioActivo)
            : usuarioActivo;

        const rolId = Number(usuario.rolId ?? usuario.idRol);

        if (rolId === 1) {

            return this.obtenerTodos();

        }

        if (rolId === 2) {

            return this.obtenerPorArea(usuario.areaId ?? usuario.idArea);

        }

        if (rolId === 3) {

            return this.obtenerPorUsuario(usuario.id);

        }

        return [];

    },

    /**
     * Calcula el promedio general de una lista de respuestas.
     *
     * @param {Array} respuestas - Lista de respuestas.
     * @returns {number}
     */
    calcularPromedioGeneral(respuestas) {

        if (!Array.isArray(respuestas) || respuestas.length === 0) {

            return 0;

        }

        const suma = respuestas.reduce((total, respuesta) => {

            return total + Number(respuesta.valor ?? 0);

        }, 0);

        return Number((suma / respuestas.length).toFixed(2));

    },

    /**
     * Registra una evaluación completa.
     *
     * Crea un resultado y sus respuestas individuales.
     *
     * @param {Object} evaluacion - Datos de la evaluación.
     * @param {number} evaluacion.usuarioId - ID del usuario.
     * @param {number} evaluacion.cuestionarioId - ID del cuestionario.
     * @param {number|null} evaluacion.asignacionId - ID de asignación.
     * @param {Array} evaluacion.respuestas - Lista de respuestas.
     * @returns {Object|null}
     */
    registrarEvaluacion(evaluacion) {

        if (
            !evaluacion ||
            !evaluacion.usuarioId ||
            !evaluacion.cuestionarioId ||
            !Array.isArray(evaluacion.respuestas) ||
            evaluacion.respuestas.length === 0
        ) {

            console.error("ResultadosService: Datos de evaluación incompletos.");

            return null;

        }

        const respuestasNormalizadas = evaluacion.respuestas.map((respuesta) => {

            return {
                preguntaId: Number(respuesta.preguntaId),
                valor: Number(respuesta.valor)
            };

        });

        const promedioGeneral = this.calcularPromedioGeneral(respuestasNormalizadas);

        const resultados = this.obtenerTodos();

        const resultadoId = evaluacion.id ?? Storage.getNextId(StorageKeys.RESULTADOS);

        const resultadoCreado = this.normalizarResultado({

            id: resultadoId,

            usuarioId: evaluacion.usuarioId,

            cuestionarioId: evaluacion.cuestionarioId,

            asignacionId: evaluacion.asignacionId ?? null,

            fecha: evaluacion.fecha ?? new Date().toISOString().split("T")[0],

            promedioGeneral,

            estado: "COMPLETADO",

            observaciones: evaluacion.observaciones ?? "",

            activo: true

        });

        resultados.push(resultadoCreado);

        this.guardarTodos(resultados);

        const respuestasActuales = this.obtenerTodasLasRespuestas();

        const siguienteRespuestaId = Storage.getNextId(StorageKeys.RESPUESTAS);

        const nuevasRespuestas = respuestasNormalizadas.map((respuesta, index) => {

            return this.normalizarRespuesta({

                id: siguienteRespuestaId + index,

                resultadoId,

                preguntaId: respuesta.preguntaId,

                valor: respuesta.valor

            });

        });

        this.guardarTodasLasRespuestas([
            ...respuestasActuales,
            ...nuevasRespuestas
        ]);

        return {
            ...resultadoCreado,
            respuestas: nuevasRespuestas
        };

    },

    /**
     * Calcula promedios por competencia para un resultado.
     *
     * @param {number} resultadoId - ID del resultado.
     * @returns {Array}
     */
    calcularPromedioPorCompetencia(resultadoId) {

        const respuestas = this.obtenerRespuestasPorResultado(resultadoId);

        const preguntas = Storage.get(StorageKeys.PREGUNTAS, []);

        const agrupado = {};

        respuestas.forEach((respuesta) => {

            const pregunta = preguntas.find(
                (item) => Number(item.id) === Number(respuesta.preguntaId)
            );

            if (!pregunta || !pregunta.competenciaId) {

                return;

            }

            const competenciaId = Number(pregunta.competenciaId);

            if (!agrupado[competenciaId]) {

                agrupado[competenciaId] = {
                    competenciaId,
                    valores: []
                };

            }

            agrupado[competenciaId].valores.push(Number(respuesta.valor));

        });

        return Object.values(agrupado).map((grupo) => {

            const promedio = this.calcularPromedioGeneral(
                grupo.valores.map((valor) => ({ valor }))
            );

            return {
                competenciaId: grupo.competenciaId,
                promedio,
                totalRespuestas: grupo.valores.length
            };

        });

    },

    /**
     * Obtiene competencias con promedio menor al umbral.
     *
     * @param {number} resultadoId - ID del resultado.
     * @param {number} umbral - Valor mínimo aceptable.
     * @returns {Array}
     */
    obtenerCompetenciasBajas(resultadoId, umbral = 3) {

        return this.calcularPromedioPorCompetencia(resultadoId).filter(
            (item) => item.promedio < umbral
        );

    },

    /**
     * Obtiene cursos recomendados con base en competencias bajas.
     *
     * @param {number} resultadoId - ID del resultado.
     * @param {number} umbral - Valor mínimo aceptable.
     * @returns {Array}
     */
    obtenerCursosRecomendados(resultadoId, umbral = 3) {

        const competenciasBajas = this.obtenerCompetenciasBajas(resultadoId, umbral);

        const cursos = Storage.get(StorageKeys.CURSOS, []);

        const competenciaIds = competenciasBajas.map(
            (item) => item.competenciaId
        );

        return cursos.filter(
            (curso) =>
                competenciaIds.includes(Number(curso.competenciaId)) &&
                curso.activo !== false
        );

    },

    /**
     * Obtiene el detalle completo de un resultado.
     *
     * @param {number} resultadoId - ID del resultado.
     * @returns {Object|null}
     */
    obtenerDetalle(resultadoId) {

        const resultado = this.obtenerPorId(resultadoId);

        if (!resultado) {

            return null;

        }

        const usuario = this.obtenerUsuarioDelResultado(resultado);

        const cuestionario = typeof CuestionariosService !== "undefined"
            ? CuestionariosService.obtenerPorId(resultado.cuestionarioId)
            : null;

        const respuestas = this.obtenerRespuestasPorResultado(resultado.id);

        const promediosPorCompetencia = this.calcularPromedioPorCompetencia(resultado.id);

        const cursosRecomendados = this.obtenerCursosRecomendados(resultado.id);

        return {
            resultado,
            usuario,
            cuestionario,
            respuestas,
            promediosPorCompetencia,
            cursosRecomendados
        };

    },

    /**
     * Elimina un resultado y sus respuestas asociadas.
     *
     * @param {number} id - ID del resultado.
     * @returns {boolean}
     */
    eliminar(id) {

        const resultadoId = Number(id);

        const resultados = this.obtenerTodos();

        const nuevaListaResultados = resultados.filter(
            (resultado) => resultado.id !== resultadoId
        );

        if (nuevaListaResultados.length === resultados.length) {

            console.warn("ResultadosService: No se encontró el resultado a eliminar.");

            return false;

        }

        this.guardarTodos(nuevaListaResultados);

        const respuestas = this.obtenerTodasLasRespuestas();

        const nuevaListaRespuestas = respuestas.filter(
            (respuesta) => respuesta.resultadoId !== resultadoId
        );

        this.guardarTodasLasRespuestas(nuevaListaRespuestas);

        return true;

    },

    /**
     * Cuenta todos los resultados registrados.
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

window.ResultadosService = ResultadosService;