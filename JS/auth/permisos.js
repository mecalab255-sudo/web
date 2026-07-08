/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/auth/permisos.js
 * ----------------------------------------------------------
 * Descripción:
 * Módulo auxiliar para la validación de permisos del sistema.
 * Define las acciones permitidas para cada rol y centraliza
 * las reglas de acceso a módulos, botones y operaciones.
 *
 * Este archivo complementa a JS/auth/auth.js.
 * ==========================================================
 */

const Permisos = Object.freeze({

    //======================================================
    // Roles oficiales del sistema
    //======================================================

    ROLES: Object.freeze({
        ADMIN: 1,
        SUPERVISOR: 2,
        EMPLEADO: 3
    }),

    //======================================================
    // Acciones generales del sistema
    //======================================================

    ACCIONES: Object.freeze({

        // Usuarios
        VER_USUARIOS: "VER_USUARIOS",
        CREAR_USUARIOS: "CREAR_USUARIOS",
        EDITAR_USUARIOS: "EDITAR_USUARIOS",
        ELIMINAR_USUARIOS: "ELIMINAR_USUARIOS",

        // Cuestionarios
        VER_CUESTIONARIOS: "VER_CUESTIONARIOS",
        CREAR_CUESTIONARIOS: "CREAR_CUESTIONARIOS",
        EDITAR_CUESTIONARIOS: "EDITAR_CUESTIONARIOS",
        ELIMINAR_CUESTIONARIOS: "ELIMINAR_CUESTIONARIOS",
        RESPONDER_CUESTIONARIOS: "RESPONDER_CUESTIONARIOS",

        // Resultados
        VER_RESULTADOS: "VER_RESULTADOS",
        VER_RESULTADOS_PROPIOS: "VER_RESULTADOS_PROPIOS",
        VER_RESULTADOS_AREA: "VER_RESULTADOS_AREA",
        ELIMINAR_RESULTADOS: "ELIMINAR_RESULTADOS",
        LIMPIAR_RESULTADOS: "LIMPIAR_RESULTADOS",

        // Catálogos
        VER_CATALOGOS: "VER_CATALOGOS",
        EDITAR_CATALOGOS: "EDITAR_CATALOGOS",

        // Sistema
        ACCEDER_DASHBOARD: "ACCEDER_DASHBOARD"

    }),

    //======================================================
    // Matriz de permisos por rol
    //======================================================

    PERMISOS_POR_ROL: Object.freeze({

        1: Object.freeze([
            "ACCEDER_DASHBOARD",

            "VER_USUARIOS",
            "CREAR_USUARIOS",
            "EDITAR_USUARIOS",
            "ELIMINAR_USUARIOS",

            "VER_CUESTIONARIOS",
            "CREAR_CUESTIONARIOS",
            "EDITAR_CUESTIONARIOS",
            "ELIMINAR_CUESTIONARIOS",
            "RESPONDER_CUESTIONARIOS",

            "VER_RESULTADOS",
            "VER_RESULTADOS_PROPIOS",
            "VER_RESULTADOS_AREA",
            "ELIMINAR_RESULTADOS",
            "LIMPIAR_RESULTADOS",

            "VER_CATALOGOS",
            "EDITAR_CATALOGOS"
        ]),

        2: Object.freeze([
            "ACCEDER_DASHBOARD",

            "VER_CUESTIONARIOS",
            "RESPONDER_CUESTIONARIOS",

            "VER_RESULTADOS",
            "VER_RESULTADOS_PROPIOS",
            "VER_RESULTADOS_AREA",

            "VER_CATALOGOS"
        ]),

        3: Object.freeze([
            "ACCEDER_DASHBOARD",

            "VER_CUESTIONARIOS",
            "RESPONDER_CUESTIONARIOS",

            "VER_RESULTADOS_PROPIOS"
        ])

    }),

    //======================================================
    // Normalización de usuario y rol
    //======================================================

    normalizarUsuario(usuario) {

        if (!usuario) {

            return null;

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.normalizarUsuario(usuario);

        }

        return {
            ...usuario,
            rolId: usuario.rolId ?? usuario.idRol ?? this.obtenerRolIdPorNombre(usuario.rol),
            areaId: usuario.areaId ?? usuario.idArea ?? null,
            puestoId: usuario.puestoId ?? usuario.idPuesto ?? null
        };

    },

    obtenerRolId(usuario = null) {

        const usuarioBase = usuario || (
            typeof Auth !== "undefined"
                ? Auth.getUser()
                : null
        );

        const usuarioNormalizado = this.normalizarUsuario(usuarioBase);

        if (!usuarioNormalizado) {

            return null;

        }

        if (usuarioNormalizado.rolId !== undefined && usuarioNormalizado.rolId !== null) {

            return Number(usuarioNormalizado.rolId);

        }

        if (usuarioNormalizado.idRol !== undefined && usuarioNormalizado.idRol !== null) {

            return Number(usuarioNormalizado.idRol);

        }

        if (usuarioNormalizado.rol) {

            return this.obtenerRolIdPorNombre(usuarioNormalizado.rol);

        }

        return null;

    },

    obtenerRolIdPorNombre(nombreRol) {

        if (!nombreRol) {

            return null;

        }

        const nombre = String(nombreRol).toUpperCase();

        const mapaRoles = {
            ADMIN: this.ROLES.ADMIN,
            SUPERVISOR: this.ROLES.SUPERVISOR,
            EMPLEADO: this.ROLES.EMPLEADO
        };

        return mapaRoles[nombre] ?? null;

    },

    obtenerNombreRol(rolId) {

        const id = Number(rolId);

        const mapaRoles = {
            1: "ADMIN",
            2: "SUPERVISOR",
            3: "EMPLEADO"
        };

        return mapaRoles[id] ?? "SIN_ROL";

    },

    //======================================================
    // Validación base de permisos
    //======================================================

    tienePermiso(usuario, accion) {

        if (!usuario || !accion) {

            return false;

        }

        const rolId = this.obtenerRolId(usuario);

        if (!rolId) {

            return false;

        }

        const permisos = this.PERMISOS_POR_ROL[rolId] || [];

        return permisos.includes(accion);

    },

    usuarioActualTienePermiso(accion) {

        if (typeof Auth === "undefined") {

            return false;

        }

        const usuario = Auth.getUser();

        return this.tienePermiso(usuario, accion);

    },

    tieneRol(usuario, rolesPermitidos = []) {

        if (!usuario) {

            return false;

        }

        const roles = Array.isArray(rolesPermitidos)
            ? rolesPermitidos
            : [rolesPermitidos];

        const rolUsuario = this.obtenerRolId(usuario);

        const rolesNormalizados = roles.map((rol) => {

            if (typeof rol === "number") {

                return rol;

            }

            if (!isNaN(Number(rol))) {

                return Number(rol);

            }

            return this.obtenerRolIdPorNombre(rol);

        });

        return rolesNormalizados.includes(rolUsuario);

    },

    usuarioActualTieneRol(rolesPermitidos = []) {

        if (typeof Auth === "undefined") {

            return false;

        }

        return this.tieneRol(
            Auth.getUser(),
            rolesPermitidos
        );

    },

    //======================================================
    // Helpers específicos por módulo
    //======================================================

    puedeAccederDashboard(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.ACCEDER_DASHBOARD
        );

    },

    puedeVerUsuarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.VER_USUARIOS
        );

    },

    puedeCrearUsuarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.CREAR_USUARIOS
        );

    },

    puedeEditarUsuarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.EDITAR_USUARIOS
        );

    },

    puedeEliminarUsuarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.ELIMINAR_USUARIOS
        );

    },

    puedeVerCuestionarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.VER_CUESTIONARIOS
        );

    },

    puedeCrearCuestionarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.CREAR_CUESTIONARIOS
        );

    },

    puedeEditarCuestionarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.EDITAR_CUESTIONARIOS
        );

    },

    puedeEliminarCuestionarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.ELIMINAR_CUESTIONARIOS
        );

    },

    puedeResponderCuestionarios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.RESPONDER_CUESTIONARIOS
        );

    },

    puedeVerResultados(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.VER_RESULTADOS
        );

    },

    puedeVerResultadosPropios(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.VER_RESULTADOS_PROPIOS
        );

    },

    puedeVerResultadosArea(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.VER_RESULTADOS_AREA
        );

    },

    puedeEliminarResultados(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.ELIMINAR_RESULTADOS
        );

    },

    puedeLimpiarResultados(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.LIMPIAR_RESULTADOS
        );

    },

    puedeVerCatalogos(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.VER_CATALOGOS
        );

    },

    puedeEditarCatalogos(usuario) {

        return this.tienePermiso(
            usuario,
            this.ACCIONES.EDITAR_CATALOGOS
        );

    },

    //======================================================
    // Helpers para interfaz
    //======================================================

    ocultarSiNoTienePermiso(elemento, accion) {

        if (!elemento) {

            return;

        }

        if (!this.usuarioActualTienePermiso(accion)) {

            elemento.style.display = "none";

        }

    },

    mostrarSiTienePermiso(elemento, accion) {

        if (!elemento) {

            return;

        }

        elemento.style.display = this.usuarioActualTienePermiso(accion)
            ? ""
            : "none";

    },

    aplicarPermisosVisuales() {

        const usuario = typeof Auth !== "undefined"
            ? Auth.getUser()
            : null;

        if (!usuario) {

            return;

        }

        const elementosSoloAdmin = document.querySelectorAll("[data-rol-admin]");

        elementosSoloAdmin.forEach((elemento) => {

            elemento.style.display = this.tieneRol(usuario, ["ADMIN"])
                ? ""
                : "none";

        });

        const elementosAdminSupervisor = document.querySelectorAll("[data-rol-admin-supervisor]");

        elementosAdminSupervisor.forEach((elemento) => {

            elemento.style.display = this.tieneRol(usuario, ["ADMIN", "SUPERVISOR"])
                ? ""
                : "none";

        });

        const elementosSoloEmpleado = document.querySelectorAll("[data-rol-empleado]");

        elementosSoloEmpleado.forEach((elemento) => {

            elemento.style.display = this.tieneRol(usuario, ["EMPLEADO"])
                ? ""
                : "none";

        });

        const elementosConPermiso = document.querySelectorAll("[data-permiso]");

        elementosConPermiso.forEach((elemento) => {

            const accion = elemento.dataset.permiso;

            this.mostrarSiTienePermiso(
                elemento,
                accion
            );

        });

    }

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.Permisos = Permisos;

//==========================================================
// Aplicación automática de permisos visuales
//==========================================================

document.addEventListener("DOMContentLoaded", () => {

    if (typeof Permisos !== "undefined") {

        Permisos.aplicarPermisosVisuales();

    }

});