/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/cuestionarios.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla la vista de cuestionarios disponibles.
 * Muestra cuestionarios según el rol del usuario activo y
 * permite iniciar, crear o eliminar cuestionarios de acuerdo
 * con los permisos del sistema.
 * ==========================================================
 */

//==========================================================
// Estado global de la página
//==========================================================

let usuarioActivo = null;

let cuestionarios = [];

let cuestionariosDisponibles = [];

let contenedorCuestionarios = null;

const CUESTIONARIO_ACTIVO_KEY = "cuestionarioActivo";

//==========================================================
// Inicio seguro
//==========================================================

document.addEventListener("DOMContentLoaded", () => {

    if (typeof BootstrapService !== "undefined") {

        BootstrapService.inicializar();

    }

    if (typeof Auth === "undefined") {

        console.error("cuestionarios.js: Auth no está definido.");

        window.location.href = "../index.html";

        return;

    }

    usuarioActivo = Auth.requireAuth();

    if (!usuarioActivo) {

        return;

    }

    iniciarPaginaCuestionarios();

    configurarBotonCrear();

});

//==========================================================
// Inicializador principal
//==========================================================

function iniciarPaginaCuestionarios() {

    renderUsuarioActivo();

    contenedorCuestionarios = document.getElementById("listaCuestionarios");

    if (!contenedorCuestionarios) {

        console.error("cuestionarios.js: No se encontró #listaCuestionarios.");

        return;

    }

    cargarCuestionarios();

    renderCuestionarios();

}

//==========================================================
// Información del usuario activo
//==========================================================

function renderUsuarioActivo() {

    const usuarioInfo = document.getElementById("usuarioInfo");

    if (!usuarioInfo) {

        return;

    }

    const nombreCompleto = typeof UsuariosService !== "undefined"
        ? UsuariosService.obtenerNombreCompleto(usuarioActivo)
        : `${usuarioActivo.nombre ?? ""} ${usuarioActivo.apellido ?? ""}`.trim();

    const nombreRol = typeof Auth !== "undefined"
        ? Auth.getRoleName(usuarioActivo) ?? "Sin rol"
        : "Sin rol";

    const nombreArea = typeof UsuariosService !== "undefined"
        ? UsuariosService.obtenerNombreArea(usuarioActivo)
        : "Sin área";

    usuarioInfo.innerHTML = `
        <strong>${limpiarTexto(nombreCompleto)}</strong>
        <span>${limpiarTexto(nombreRol)}</span>
        <small>${limpiarTexto(nombreArea)}</small>
    `;

}

//==========================================================
// Carga de cuestionarios
//==========================================================

function cargarCuestionarios() {

    if (typeof CuestionariosService === "undefined") {

        console.error("cuestionarios.js: CuestionariosService no está definido.");

        cuestionarios = [];

        cuestionariosDisponibles = [];

        return;

    }

    cuestionarios = CuestionariosService.obtenerActivos();

    const rolId = Auth.getRoleId(usuarioActivo);

    if (rolId === 1) {

        cuestionariosDisponibles = cuestionarios;

        return;

    }

    if (rolId === 2) {

        cuestionariosDisponibles = Auth.filtrarCuestionarios(cuestionarios);

        return;

    }

    if (rolId === 3) {

    if (typeof AsignacionesService !== "undefined") {

        cuestionariosDisponibles = AsignacionesService.obtenerCuestionariosParaUsuario(usuarioActivo);

        return;

    }

    cuestionariosDisponibles = Auth.filtrarCuestionarios(cuestionarios);

    return;

}
}

//==========================================================
// Render principal
//==========================================================

function renderCuestionarios() {

    if (!contenedorCuestionarios) {

        return;

    }

    contenedorCuestionarios.innerHTML = "";

    if (!cuestionariosDisponibles.length) {

        contenedorCuestionarios.innerHTML = `
            <div class="sin-cuestionarios">
                <h3>No hay cuestionarios disponibles</h3>
                <p>Actualmente no tienes cuestionarios asignados o visibles.</p>
            </div>
        `;

        return;

    }

    cuestionariosDisponibles.forEach((cuestionario) => {

        const preguntas = obtenerPreguntasDelCuestionario(cuestionario.id);

        const estado = obtenerEstadoCuestionario(cuestionario);

        const puedeEliminar = Auth.isAdmin();

        contenedorCuestionarios.innerHTML += `
            <div class="card-cuestionario">

                <span class="estado ${estado.clase}">
                    ${limpiarTexto(estado.texto)}
                </span>

                <h3>${limpiarTexto(cuestionario.titulo || "Sin título")}</h3>

                <p>${limpiarTexto(cuestionario.descripcion || "")}</p>

                <p>Preguntas: ${preguntas.length}</p>

                <div class="acciones-cuestionario">

                    <button type="button" onclick="iniciarCuestionario(${cuestionario.id})">
                        Iniciar
                    </button>

                    ${
                        puedeEliminar
                            ? `<button type="button" onclick="eliminarCuestionario(${cuestionario.id})">
                                Eliminar
                               </button>`
                            : ""
                    }

                </div>

            </div>
        `;

    });

}

//==========================================================
// Helpers de cuestionarios
//==========================================================

function obtenerPreguntasDelCuestionario(cuestionarioId) {

    if (typeof CuestionariosService === "undefined") {

        return [];

    }

    return CuestionariosService.obtenerPreguntas(cuestionarioId);

}

function obtenerEstadoCuestionario(cuestionario) {

    if (
        typeof ResultadosService !== "undefined" &&
        usuarioActivo &&
        ResultadosService.obtenerPorUsuario(usuarioActivo.id).some(
            (resultado) => Number(resultado.cuestionarioId) === Number(cuestionario.id)
        )
    ) {

        return {
            texto: "Respondido",
            clase: "respondido"
        };

    }

    return {
        texto: "Disponible",
        clase: "disponible"
    };

}

function limpiarTexto(texto) {

    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}

function obtenerRutaResponder() {

    const path = window.location.pathname.toLowerCase();

    if (path.includes("/html/")) {

        return "cuestionario_responder.html";

    }

    return "HTML/cuestionario_responder.html";

}

function obtenerRutaCrear() {

    const path = window.location.pathname.toLowerCase();

    if (path.includes("/html/")) {

        return "crear_cuestionario.html";

    }

    return "HTML/crear_cuestionario.html";

}

//==========================================================
// Acciones
//==========================================================

function iniciarCuestionario(id) {

    const cuestionarioId = Number(id);

    const cuestionario = CuestionariosService.obtenerPorId(cuestionarioId);

    if (!cuestionario) {

        alert("No se encontró el cuestionario seleccionado.");

        return;

    }

    const rolId = Auth.getRoleId(usuarioActivo);

    if (
        rolId === 3 &&
        typeof AsignacionesService !== "undefined" &&
        !AsignacionesService.usuarioTieneCuestionario(usuarioActivo, cuestionarioId)
    ) {

        alert("No tienes asignado este cuestionario.");

        return;

    }

    if (typeof Storage !== "undefined") {

        Storage.set(CUESTIONARIO_ACTIVO_KEY, cuestionarioId);

    } else {

        localStorage.setItem(CUESTIONARIO_ACTIVO_KEY, String(cuestionarioId));

    }

    window.location.href = obtenerRutaResponder();

}

function eliminarCuestionario(id) {

    if (!Auth.isAdmin()) {

        alert("No tienes permisos para eliminar cuestionarios.");

        return;

    }

    const cuestionarioId = Number(id);

    const confirmar = confirm("¿Seguro que deseas eliminar este cuestionario? También se eliminarán sus preguntas asociadas.");

    if (!confirmar) {

        return;

    }

    const eliminado = CuestionariosService.eliminar(cuestionarioId);

    if (!eliminado) {

        alert("No se pudo eliminar el cuestionario.");

        return;

    }

    cargarCuestionarios();

    renderCuestionarios();

}

//==========================================================
// Botón crear cuestionario
//==========================================================

function configurarBotonCrear() {

    const btnNuevoCuestionario = document.getElementById("btnNuevoCuestionario");

    if (!btnNuevoCuestionario) {

        return;

    }

    if (!Auth.isAdmin()) {

        btnNuevoCuestionario.style.display = "none";

        return;

    }

    btnNuevoCuestionario.addEventListener("click", () => {

        window.location.href = obtenerRutaCrear();

    });

}

//==========================================================
// Exportación global para eventos onclick
//==========================================================

window.iniciarCuestionario = iniciarCuestionario;

window.eliminarCuestionario = eliminarCuestionario;