/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/dashboard.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla la vista principal del dashboard.
 * Valida la sesión activa, muestra información del usuario
 * autenticado y ajusta las opciones visibles de acuerdo con
 * el rol del usuario.
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

        console.error("dashboard.js: Auth no está definido.");

        window.location.href = "../index.html";

        return;

    }

    const usuario = Auth.requireAuth();

    if (!usuario) {

        return;

    }

    //======================================================
    // Referencias del DOM
    //======================================================

    const usuarioInfo = document.getElementById("usuarioInfo");

    const menuUsuarios = document.getElementById("menu-usuarios");

    const totalUsuarios = document.getElementById("totalUsuarios");

    const totalCuestionarios = document.getElementById("totalCuestionarios");

    const totalResultados = document.getElementById("totalResultados");

    const totalPendientes = document.getElementById("totalPendientes");

    //======================================================
    // Helpers
    //======================================================

    const obtenerNombreCompleto = () => {

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerNombreCompleto(usuario);

        }

        return `${usuario.nombre ?? ""} ${usuario.apellido ?? ""}`.trim();

    };

    const obtenerNombreRol = () => {

        if (typeof Auth !== "undefined") {

            return Auth.getRoleName(usuario) ?? "Sin rol";

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerNombreRol(usuario);

        }

        return "Sin rol";

    };

    const obtenerNombreArea = () => {

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerNombreArea(usuario);

        }

        return "Sin área";

    };

    const obtenerNombrePuesto = () => {

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerNombrePuesto(usuario);

        }

        return "Sin puesto";

    };

    const colocarTexto = (elemento, texto) => {

        if (elemento) {

            elemento.textContent = texto;

        }

    };

    //======================================================
    // Información del usuario activo
    //======================================================

    if (usuarioInfo) {

        usuarioInfo.innerHTML = `
            <strong>${obtenerNombreCompleto()}</strong>
            <span>${obtenerNombreRol()}</span>
            <small>${obtenerNombreArea()} · ${obtenerNombrePuesto()}</small>
        `;

    }

    //======================================================
    // Indicadores generales del dashboard
    //======================================================

    if (totalUsuarios && typeof UsuariosService !== "undefined") {

        colocarTexto(
            totalUsuarios,
            UsuariosService.contar()
        );

    }

    if (totalCuestionarios && typeof CuestionariosService !== "undefined") {

        const cuestionariosVisibles = Auth.filtrarCuestionarios(
            CuestionariosService.obtenerActivos()
        );

        colocarTexto(
            totalCuestionarios,
            cuestionariosVisibles.length
        );

    }

    if (totalResultados && typeof ResultadosService !== "undefined") {

        const resultadosVisibles = ResultadosService.obtenerPorPermisos(usuario);

        colocarTexto(
            totalResultados,
            resultadosVisibles.length
        );

    }

    if (totalPendientes && typeof AsignacionesService !== "undefined") {

        const pendientes = AsignacionesService.obtenerCuestionariosPendientesParaUsuario(usuario);

        colocarTexto(
            totalPendientes,
            pendientes.length
        );

    }

    //======================================================
    // Permisos visuales por rol
    //======================================================

    if (menuUsuarios) {

        Auth.mostrarSiTieneRol(
            menuUsuarios,
            ["ADMIN"]
        );

    }

    const elementosSoloAdmin = document.querySelectorAll("[data-rol-admin]");

    elementosSoloAdmin.forEach((elemento) => {

        Auth.mostrarSiTieneRol(
            elemento,
            ["ADMIN"]
        );

    });

    const elementosAdminSupervisor = document.querySelectorAll("[data-rol-admin-supervisor]");

    elementosAdminSupervisor.forEach((elemento) => {

        Auth.mostrarSiTieneRol(
            elemento,
            ["ADMIN", "SUPERVISOR"]
        );

    });

    const elementosSoloEmpleado = document.querySelectorAll("[data-rol-empleado]");

    elementosSoloEmpleado.forEach((elemento) => {

        Auth.mostrarSiTieneRol(
            elemento,
            ["EMPLEADO"]
        );

    });


    const contenedorCursosDashboard = document.getElementById("contenedorCursosDashboard");

const renderCursosDashboard = () => {

    if (!contenedorCursosDashboard) {

        return;

    }

    if (typeof Storage === "undefined" || typeof StorageKeys === "undefined") {

        return;

    }

    const cursos = Storage.get(StorageKeys.CURSOS, []);

    contenedorCursosDashboard.innerHTML = "";

    if (!Array.isArray(cursos) || cursos.length === 0) {

        contenedorCursosDashboard.innerHTML = `
            <div class="tarjeta">
                <h3>Sin cursos disponibles</h3>
                <p>0</p>
            </div>
        `;

        return;

    }

    cursos
        .filter((curso) => curso.activo !== false)
        .slice(0, 6)
        .forEach((curso) => {

            contenedorCursosDashboard.innerHTML += `
                <div class="curso-card-dashboard">
                    <h3>${curso.nombre}</h3>
                    <p>${curso.descripcion}</p>
                    <small>${curso.nivel} · ${curso.duracion}</small>
                    <a href="${curso.url}" target="_blank">
                        Ver curso
                    </a>
                </div>
            `;

        });

};

renderCursosDashboard();

});

//==========================================================
// Cerrar sesión
//==========================================================

function cerrarSesion() {

    if (typeof Auth !== "undefined") {

        Auth.cerrarSesion();

        return;

    }

    localStorage.removeItem("usuarioActivo");

    window.location.href = "../index.html";

}