/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/cuestionarioResponder.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla la página para responder cuestionarios.
 * Carga el cuestionario activo, muestra sus preguntas en
 * escala Likert de 0 a 5 y guarda la evaluación mediante
 * ResultadosService.
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    //======================================================
    // Inicialización y protección
    //======================================================

    if (typeof BootstrapService !== "undefined") {

        BootstrapService.inicializar();

    }

    if (typeof Auth === "undefined") {

        console.error("cuestionarioResponder.js: Auth no está definido.");

        window.location.href = "../index.html";

        return;

    }

    const usuarioActivo = Auth.requireAuth();

    if (!usuarioActivo) {

        return;

    }

    //======================================================
    // Constantes y referencias del DOM
    //======================================================

    const CUESTIONARIO_ACTIVO_KEY = "cuestionarioActivo";

    const tituloCuestionario = document.getElementById("tituloCuestionario");

    const descripcionCuestionario = document.getElementById("descripcionCuestionario");

    const contenedorPreguntas = document.getElementById("contenedorPreguntas");

    const formRespuestas = document.getElementById("formRespuestas");

    if (
        !tituloCuestionario ||
        !descripcionCuestionario ||
        !contenedorPreguntas ||
        !formRespuestas
    ) {

        console.error("cuestionarioResponder.js: Faltan elementos necesarios en el HTML.");

        return;

    }

    //======================================================
    // Helpers
    //======================================================

    const obtenerRutaCuestionarios = () => {

        const path = window.location.pathname.toLowerCase();

        if (path.includes("/html/")) {

            return "cuestionarios.html";

        }

        return "HTML/cuestionarios.html";

    };

    const limpiarTexto = (texto) => {

        return String(texto ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    };

    const obtenerCuestionarioActivoId = () => {

        if (typeof Storage !== "undefined") {

            return Number(Storage.get(CUESTIONARIO_ACTIVO_KEY, null));

        }

        return Number(localStorage.getItem(CUESTIONARIO_ACTIVO_KEY));

    };

    const limpiarCuestionarioActivo = () => {

        if (typeof Storage !== "undefined") {

            Storage.remove(CUESTIONARIO_ACTIVO_KEY);

            return;

        }

        localStorage.removeItem(CUESTIONARIO_ACTIVO_KEY);

    };

    const obtenerAsignacionDelUsuario = (cuestionarioId) => {

        if (typeof AsignacionesService === "undefined") {

            return null;

        }

        const asignaciones = AsignacionesService.obtenerAsignacionesParaUsuario(usuarioActivo);

        return asignaciones.find(
            (asignacion) => Number(asignacion.cuestionarioId) === Number(cuestionarioId)
        ) || null;

    };

    const usuarioPuedeResponder = (cuestionarioId) => {

        const rolId = Auth.getRoleId(usuarioActivo);

        if (rolId === 1 || rolId === 2) {

            return true;

        }

        if (rolId === 3 && typeof AsignacionesService !== "undefined") {

            return AsignacionesService.usuarioTieneCuestionario(
                usuarioActivo,
                cuestionarioId
            );

        }

        return false;

    };

    //======================================================
    // Cargar cuestionario
    //======================================================

    const idCuestionario = obtenerCuestionarioActivoId();

    if (!idCuestionario) {

        alert("No hay un cuestionario seleccionado.");

        window.location.href = obtenerRutaCuestionarios();

        return;

    }

    if (typeof CuestionariosService === "undefined") {

        console.error("cuestionarioResponder.js: CuestionariosService no está definido.");

        alert("No se puede cargar el cuestionario.");

        window.location.href = obtenerRutaCuestionarios();

        return;

    }

    const cuestionario = CuestionariosService.obtenerConPreguntas(idCuestionario);

    if (!cuestionario) {

        alert("No se encontró el cuestionario.");

        window.location.href = obtenerRutaCuestionarios();

        return;

    }

    if (!usuarioPuedeResponder(cuestionario.id)) {

        alert("No tienes asignado este cuestionario.");

        window.location.href = obtenerRutaCuestionarios();

        return;

    }

    if (!Array.isArray(cuestionario.preguntas) || cuestionario.preguntas.length === 0) {

        alert("Este cuestionario no tiene preguntas registradas.");

        window.location.href = obtenerRutaCuestionarios();

        return;

    }

    //======================================================
    // Render de información general
    //======================================================

    tituloCuestionario.textContent =
        cuestionario.titulo || cuestionario.nombre || "Sin título";

    descripcionCuestionario.textContent =
        cuestionario.descripcion || "";

    //======================================================
    // Render de preguntas
    //======================================================

    const renderPreguntas = () => {

        contenedorPreguntas.innerHTML = "";

        cuestionario.preguntas.forEach((pregunta, index) => {

            const div = document.createElement("div");

            div.classList.add("pregunta");

            let opciones = "";

            for (let i = 0; i <= 5; i++) {

                opciones += `
                    <label>
                        <input
                            type="radio"
                            name="pregunta_${pregunta.id}"
                            value="${i}"
                            required>
                        ${i}
                    </label>
                `;

            }

            div.innerHTML = `
                <h3>${index + 1}. ${limpiarTexto(pregunta.afirmacion || pregunta)}</h3>

                <div class="escala">
                    ${opciones}
                </div>
            `;

            contenedorPreguntas.appendChild(div);

        });

    };

    //======================================================
    // Obtener respuestas capturadas
    //======================================================

    const obtenerRespuestasCapturadas = () => {

        const respuestas = [];

        for (const pregunta of cuestionario.preguntas) {

            const input = document.querySelector(
                `input[name="pregunta_${pregunta.id}"]:checked`
            );

            if (!input) {

                return null;

            }

            respuestas.push({

                preguntaId: Number(pregunta.id),

                valor: Number(input.value)

            });

        }

        return respuestas;

    };

    //======================================================
    // Guardar evaluación
    //======================================================

    formRespuestas.addEventListener("submit", (event) => {

        event.preventDefault();

        const respuestas = obtenerRespuestasCapturadas();

        if (!respuestas) {

            alert("Responde todas las preguntas antes de enviar.");

            return;

        }

        if (typeof ResultadosService === "undefined") {

            console.error("cuestionarioResponder.js: ResultadosService no está definido.");

            alert("No se pueden guardar las respuestas.");

            return;

        }

        const asignacion = obtenerAsignacionDelUsuario(cuestionario.id);

        const resultado = ResultadosService.registrarEvaluacion({

            usuarioId: usuarioActivo.id,

            cuestionarioId: cuestionario.id,

            asignacionId: asignacion ? asignacion.id : null,

            respuestas,

            observaciones: ""

        });

        if (!resultado) {

            alert("No se pudo guardar la evaluación.");

            return;

        }

        limpiarCuestionarioActivo();

        alert("Respuestas guardadas correctamente.");

        window.location.href = obtenerRutaCuestionarios();

    });

    //======================================================
    // Inicialización de página
    //======================================================

    renderPreguntas();

});