/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/login.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla el inicio de sesión de los usuarios.
 * Este archivo valida las credenciales ingresadas, crea la
 * sesión activa y redirige al usuario autenticado hacia el
 * dashboard del sistema.
 * ==========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    //======================================================
    // Inicialización del sistema
    //======================================================

    if (typeof BootstrapService !== "undefined") {

        BootstrapService.inicializar();

    }

    //======================================================
    // Referencias del DOM
    //======================================================

    const formulario = document.getElementById("loginForm");

    const inputUsuario = document.getElementById("usuario");

    const inputPassword = document.getElementById("password");

    if (!formulario || !inputUsuario || !inputPassword) {

        console.error("login.js: No se encontraron los elementos necesarios del formulario.");

        return;

    }

    //======================================================
    // Rutas
    //======================================================

    const obtenerRutaDashboard = () => {

        const path = window.location.pathname.toLowerCase();

        if (path.includes("/html/")) {

            return "dashboard.html";

        }

        return "HTML/dashboard.html";

    };

    //======================================================
    // Mensajes
    //======================================================

    const mostrarError = (mensaje) => {

        alert(mensaje);

    };

    //======================================================
    // Evento de inicio de sesión
    //======================================================

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const usuarioIngresado = inputUsuario.value.trim();

        const passwordIngresado = inputPassword.value.trim();

        if (!usuarioIngresado || !passwordIngresado) {

            mostrarError("Ingresa usuario y contraseña.");

            return;

        }

        if (typeof UsuariosService === "undefined") {

            console.error("login.js: UsuariosService no está definido.");

            mostrarError("Error interno: servicio de usuarios no disponible.");

            return;

        }

        const usuarioEncontrado = UsuariosService.autenticar(
            usuarioIngresado,
            passwordIngresado
        );

        if (!usuarioEncontrado) {

            mostrarError("Usuario o contraseña incorrectos.");

            inputPassword.value = "";

            inputPassword.focus();

            return;

        }

        if (typeof Auth !== "undefined") {

            Auth.guardarSesion(usuarioEncontrado);

        } else {

            UsuariosService.guardarSesion(usuarioEncontrado);

        }

        window.location.href = obtenerRutaDashboard();

    });

});
