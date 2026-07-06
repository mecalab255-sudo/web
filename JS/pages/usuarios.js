/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/usuarios.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla la administración de usuarios del sistema.
 * Permite consultar, crear, actualizar visualmente la tabla
 * y eliminar usuarios utilizando UsuariosService.
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

        console.error("usuarios.js: Auth no está definido.");

        window.location.href = "../index.html";

        return;

    }

    const usuarioActivo = Auth.requireRole(["ADMIN"]);

    if (!usuarioActivo) {

        return;

    }

    //======================================================
    // Referencias del DOM
    //======================================================

    const tablaUsuarios = document.getElementById("tablaUsuarios");

    const formularioUsuario = document.getElementById("formUsuario");

    const inputNombre = document.getElementById("nombre");

    const inputApellido = document.getElementById("apellido");

    const inputUsuario = document.getElementById("usuario");

    const inputPassword = document.getElementById("password");

    const inputCorreo = document.getElementById("correo");

    const selectRol = document.getElementById("rol");

    const selectArea = document.getElementById("area");

    const selectPuesto = document.getElementById("puesto");

    //======================================================
    // Helpers
    //======================================================

    const limpiarTexto = (texto) => {

        return String(texto ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    };

    const limpiarFormulario = () => {

        if (formularioUsuario) {

            formularioUsuario.reset();

        } else {

            if (inputNombre) inputNombre.value = "";
            if (inputApellido) inputApellido.value = "";
            if (inputUsuario) inputUsuario.value = "";
            if (inputPassword) inputPassword.value = "";
            if (inputCorreo) inputCorreo.value = "";

        }

    };

    const obtenerValorNumerico = (elemento, valorDefault = null) => {

        if (!elemento || elemento.value === "") {

            return valorDefault;

        }

        const valor = Number(elemento.value);

        return Number.isNaN(valor) ? valorDefault : valor;

    };

    //======================================================
    // Cargar selectores
    //======================================================

    const cargarRoles = () => {

        if (!selectRol || typeof RolesData === "undefined") {

            return;

        }

        selectRol.innerHTML = "";

        RolesData.forEach((rol) => {

            const option = document.createElement("option");

            option.value = rol.id;

            option.textContent = rol.nombre;

            selectRol.appendChild(option);

        });

    };

    const cargarAreas = () => {

        if (!selectArea || typeof AreasData === "undefined") {

            return;

        }

        selectArea.innerHTML = "";

        AreasData.forEach((area) => {

            const option = document.createElement("option");

            option.value = area.id;

            option.textContent = area.nombre;

            selectArea.appendChild(option);

        });

    };

    const cargarPuestos = () => {

        if (!selectPuesto || typeof PuestosData === "undefined") {

            return;

        }

        const areaSeleccionada = obtenerValorNumerico(selectArea, null);

        selectPuesto.innerHTML = "";

        const puestosFiltrados = PuestosData.filter((puesto) => {

            if (!areaSeleccionada) {

                return puesto.activo !== false;

            }

            return puesto.areaId === areaSeleccionada && puesto.activo !== false;

        });

        puestosFiltrados.forEach((puesto) => {

            const option = document.createElement("option");

            option.value = puesto.id;

            option.textContent = puesto.nombre;

            selectPuesto.appendChild(option);

        });

    };

    //======================================================
    // Renderizar tabla
    //======================================================

    const renderUsuarios = () => {

        if (!tablaUsuarios) {

            console.error("usuarios.js: No se encontró #tablaUsuarios.");

            return;

        }

        if (typeof UsuariosService === "undefined") {

            console.error("usuarios.js: UsuariosService no está definido.");

            return;

        }

        const usuarios = UsuariosService.obtenerTodos();

        tablaUsuarios.innerHTML = "";

        usuarios.forEach((usuario) => {

            const nombreCompleto = UsuariosService.obtenerNombreCompleto(usuario);

            const rolNombre = UsuariosService.obtenerNombreRol(usuario);

            const areaNombre = UsuariosService.obtenerNombreArea(usuario);

            const puestoNombre = UsuariosService.obtenerNombrePuesto(usuario);

            const estado = usuario.activo === true
                ? "Activo"
                : "Inactivo";

            tablaUsuarios.innerHTML += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${limpiarTexto(nombreCompleto)}</td>
                    <td>${limpiarTexto(usuario.usuario)}</td>
                    <td>${limpiarTexto(rolNombre)}</td>
                    <td>${limpiarTexto(areaNombre)}</td>
                    <td>${limpiarTexto(puestoNombre)}</td>
                    <td>${estado}</td>
                    <td>
                        <button type="button" onclick="eliminarUsuario(${usuario.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;

        });

    };

    //======================================================
    // Crear usuario
    //======================================================

    const crearUsuario = () => {

        if (typeof UsuariosService === "undefined") {

            console.error("usuarios.js: UsuariosService no está definido.");

            return;

        }

        const nombre = inputNombre?.value.trim() ?? "";

        const apellido = inputApellido?.value.trim() ?? "";

        const nombreUsuario = inputUsuario?.value.trim() ?? "";

        const password = inputPassword?.value.trim() ?? "";

        const correo = inputCorreo?.value.trim() ?? "";

        const rolId = obtenerValorNumerico(selectRol, 3);

        const areaId = obtenerValorNumerico(selectArea, null);

        const puestoId = obtenerValorNumerico(selectPuesto, null);

        if (!nombre || !nombreUsuario || !password) {

            alert("Completa al menos nombre, usuario y contraseña.");

            return;

        }

        const nuevoUsuario = UsuariosService.crear({

            nombre,

            apellido,

            usuario: nombreUsuario,

            password,

            correo,

            rolId,

            areaId,

            puestoId,

            activo: true

        });

        if (!nuevoUsuario) {

            alert("No se pudo crear el usuario. Verifica que el nombre de usuario no exista.");

            return;

        }

        limpiarFormulario();

        cargarPuestos();

        renderUsuarios();

        alert("Usuario creado correctamente.");

    };

    //======================================================
    // Eliminar usuario
    //======================================================

    const eliminarUsuario = (id) => {

        const usuarioId = Number(id);

        if (usuarioId === Number(usuarioActivo.id)) {

            alert("No puedes eliminar tu propio usuario mientras tienes la sesión activa.");

            return;

        }

        const confirmar = confirm("¿Seguro que deseas eliminar este usuario?");

        if (!confirmar) {

            return;

        }

        const eliminado = UsuariosService.eliminar(usuarioId);

        if (!eliminado) {

            alert("No se pudo eliminar el usuario.");

            return;

        }

        renderUsuarios();

    };

    //======================================================
    // Eventos
    //======================================================

    if (formularioUsuario) {

        formularioUsuario.addEventListener("submit", (event) => {

            event.preventDefault();

            crearUsuario();

        });

    }

    if (selectArea) {

        selectArea.addEventListener("change", () => {

            cargarPuestos();

        });

    }

    //======================================================
    // Exponer funciones para botones con onclick
    //======================================================

    window.crearUsuario = crearUsuario;

    window.eliminarUsuario = eliminarUsuario;

    window.renderUsuarios = renderUsuarios;

    //======================================================
    // Inicialización de página
    //======================================================

    cargarRoles();

    cargarAreas();

    cargarPuestos();

    renderUsuarios();

});