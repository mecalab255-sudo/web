/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/auth/auth.js
 * ----------------------------------------------------------
 * Descripción:
 * Módulo central de autenticación y autorización del sistema.
 * Administra la sesión activa, validación de acceso, permisos
 * por rol, filtros de información y redirecciones seguras.
 *
 * Este módulo utiliza Storage, StorageKeys y UsuariosService
 * para evitar accesos directos innecesarios a localStorage.
 * ==========================================================
 */

const Auth = (() => {

    //==========================================================
    // Inicialización segura del sistema
    //==========================================================

    const inicializarSistema = () => {

        if (typeof BootstrapService !== "undefined") {

            BootstrapService.inicializar();

        }

    };

    //==========================================================
    // Rutas seguras
    //==========================================================

    const estaEnCarpetaHTML = () => {

        return window.location.pathname.toLowerCase().includes("/html/");

    };

    const estaEnCarpetaPages = () => {

        return window.location.pathname.toLowerCase().includes("/pages/");

    };

    const getRutaLogin = () => {

        if (estaEnCarpetaHTML() || estaEnCarpetaPages()) {

            return "../index.html";

        }

        return "index.html";

    };

    const getRutaDashboard = () => {

        if (estaEnCarpetaHTML()) {

            return "dashboard.html";

        }

        if (estaEnCarpetaPages()) {

            return "../HTML/dashboard.html";

        }

        return "HTML/dashboard.html";

    };

    const redirectToLogin = () => {

        window.location.href = getRutaLogin();

    };

    const redirectToDashboard = () => {

        window.location.href = getRutaDashboard();

    };

    //==========================================================
    // Usuario activo
    //==========================================================

    const normalizarUsuario = (usuario) => {

        if (!usuario || typeof usuario !== "object") {

            return null;

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.normalizarUsuario(usuario);

        }

        return {

            ...usuario,

            rolId: usuario.rolId ?? usuario.idRol ?? null,

            areaId: usuario.areaId ?? usuario.idArea ?? null,

            puestoId: usuario.puestoId ?? usuario.idPuesto ?? null

        };

    };

    const getUser = () => {

        try {

            const key = typeof StorageKeys !== "undefined"
                ? StorageKeys.USUARIO_ACTIVO
                : "usuarioActivo";

            let usuario = null;

            if (typeof Storage !== "undefined") {

                usuario = Storage.get(key, null);

            }

            if (!usuario) {

                const raw = localStorage.getItem("usuarioActivo");

                usuario = raw ? JSON.parse(raw) : null;

            }

            return normalizarUsuario(usuario);

        } catch (error) {

            console.error("Auth: Error al obtener usuario activo:", error);

            return null;

        }

    };

    //==========================================================
    // Resolución de roles
    //==========================================================

    const obtenerRolIdPorNombre = (nombreRol) => {

        if (!nombreRol) {

            return null;

        }

        const nombre = String(nombreRol).toUpperCase();

        if (typeof RolesData !== "undefined") {

            const rol = RolesData.find(
                (item) => String(item.nombre).toUpperCase() === nombre
            );

            return rol ? rol.id : null;

        }

        const mapaRoles = {
            ADMIN: 1,
            SUPERVISOR: 2,
            EMPLEADO: 3
        };

        return mapaRoles[nombre] ?? null;

    };

    const obtenerNombreRolPorId = (rolId) => {

        const id = Number(rolId);

        if (typeof RolesData !== "undefined") {

            const rol = RolesData.find(
                (item) => Number(item.id) === id
            );

            return rol ? rol.nombre : null;

        }

        const mapaRoles = {
            1: "ADMIN",
            2: "SUPERVISOR",
            3: "EMPLEADO"
        };

        return mapaRoles[id] ?? null;

    };

    const getRoleId = (usuario = getUser()) => {

        if (!usuario) {

            return null;

        }

        if (usuario.rolId !== undefined && usuario.rolId !== null) {

            return Number(usuario.rolId);

        }

        if (usuario.idRol !== undefined && usuario.idRol !== null) {

            return Number(usuario.idRol);

        }

        if (usuario.rol) {

            return obtenerRolIdPorNombre(usuario.rol);

        }

        return null;

    };

    const getRoleName = (usuario = getUser()) => {

        if (!usuario) {

            return null;

        }

        if (usuario.rol) {

            return String(usuario.rol).toUpperCase();

        }

        const rolId = getRoleId(usuario);

        return obtenerNombreRolPorId(rolId);

    };

    const normalizarRolesPermitidos = (rolesPermitidos = []) => {

        return rolesPermitidos.map((rol) => {

            if (typeof rol === "number") {

                return rol;

            }

            if (!isNaN(Number(rol))) {

                return Number(rol);

            }

            return obtenerRolIdPorNombre(rol);

        }).filter((rol) => rol !== null);

    };

    //==========================================================
    // Autenticación base
    //==========================================================

    const requireAuth = () => {

        const usuario = getUser();

        if (!usuario || !usuario.id) {

            console.warn("Auth: No existe una sesión activa válida.");

            redirectToLogin();

            return null;

        }

        return usuario;

    };

    const requireRole = (rolesPermitidos = []) => {

        const usuario = requireAuth();

        if (!usuario) {

            return null;

        }

        const rolActual = getRoleId(usuario);

        const rolesNormalizados = normalizarRolesPermitidos(rolesPermitidos);

        if (!rolesNormalizados.includes(rolActual)) {

            console.warn("Auth: El usuario no tiene permisos para acceder a este módulo.");

            redirectToDashboard();

            return null;

        }

        return usuario;

    };

    //==========================================================
    // Helpers de rol
    //==========================================================

    const isAdmin = () => {

        return getRoleId() === 1;

    };

    const isSupervisor = () => {

        return getRoleId() === 2;

    };

    const isEmpleado = () => {

        return getRoleId() === 3;

    };

    const tieneRol = (rolesPermitidos = []) => {

        const usuario = getUser();

        if (!usuario) {

            return false;

        }

        const rolActual = getRoleId(usuario);

        const rolesNormalizados = normalizarRolesPermitidos(rolesPermitidos);

        return rolesNormalizados.includes(rolActual);

    };

    //==========================================================
    // Filtros de información
    //==========================================================

    const filtrarResultados = (resultados = []) => {

        const usuario = getUser();

        if (!usuario || !Array.isArray(resultados)) {

            return [];

        }

        const rolId = getRoleId(usuario);

        if (rolId === 1) {

            return resultados;

        }

        if (rolId === 2) {

            if (typeof ResultadosService !== "undefined") {

                return ResultadosService.obtenerPorPermisos(usuario);

            }

            return resultados.filter((resultado) => {

                if (typeof UsuariosService === "undefined") {

                    return false;

                }

                const usuarioResultado = UsuariosService.obtenerPorId(resultado.usuarioId);

                if (!usuarioResultado) {

                    return false;

                }

                return Number(usuarioResultado.areaId) === Number(usuario.areaId);

            });

        }

        if (rolId === 3) {

            return resultados.filter(
                (resultado) => Number(resultado.usuarioId) === Number(usuario.id)
            );

        }

        return [];

    };

    const filtrarCuestionarios = (cuestionarios = []) => {

        const usuario = getUser();

        if (!usuario || !Array.isArray(cuestionarios)) {

            return [];

        }

        const rolId = getRoleId(usuario);

        if (rolId === 1) {

            return cuestionarios;

        }

        if (rolId === 2) {

            return cuestionarios.filter((cuestionario) => {

                if (cuestionario.aplicaTodasLasAreas === true) {

                    return true;

                }

                if (!Array.isArray(cuestionario.areaIds)) {

                    return false;

                }

                return cuestionario.areaIds.includes(Number(usuario.areaId));

            });

        }

        if (rolId === 3) {

            if (typeof AsignacionesService !== "undefined") {

                const idsAsignados = AsignacionesService.obtenerIdsCuestionariosParaUsuario(usuario);

                return cuestionarios.filter(
                    (cuestionario) => idsAsignados.includes(Number(cuestionario.id))
                );

            }

            return cuestionarios.filter((cuestionario) => {

                if (cuestionario.aplicaTodasLasAreas === true) {

                    return true;

                }

                if (!Array.isArray(cuestionario.areaIds)) {

                    return false;

                }

                return cuestionario.areaIds.includes(Number(usuario.areaId));

            });

        }

        return [];

    };

    //==========================================================
    // Helpers para interfaz
    //==========================================================

    const ocultarSiNoTieneRol = (elemento, rolesPermitidos = []) => {

        if (!elemento) {

            return;

        }

        if (!tieneRol(rolesPermitidos)) {

            elemento.style.display = "none";

        }

    };

    const mostrarSiTieneRol = (elemento, rolesPermitidos = []) => {

        if (!elemento) {

            return;

        }

        elemento.style.display = tieneRol(rolesPermitidos)
            ? ""
            : "none";

    };

    //==========================================================
    // Sesión
    //==========================================================

    const guardarSesion = (usuario) => {

        const usuarioNormalizado = normalizarUsuario(usuario);

        if (!usuarioNormalizado) {

            return false;

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.guardarSesion(usuarioNormalizado);

        }

        if (typeof Storage !== "undefined" && typeof StorageKeys !== "undefined") {

            return Storage.set(StorageKeys.USUARIO_ACTIVO, usuarioNormalizado);

        }

        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioNormalizado)
        );

        return true;

    };

    const cerrarSesion = () => {

        if (typeof UsuariosService !== "undefined") {

            UsuariosService.cerrarSesion();

        } else if (typeof Storage !== "undefined" && typeof StorageKeys !== "undefined") {

            Storage.remove(StorageKeys.USUARIO_ACTIVO);

        } else {

            localStorage.removeItem("usuarioActivo");

        }

        redirectToLogin();

    };

    //==========================================================
    // Inicialización automática segura
    //==========================================================

    inicializarSistema();

    return {

        getUser,

        getRoleId,

        getRoleName,

        requireAuth,

        requireRole,

        isAdmin,

        isSupervisor,

        isEmpleado,

        tieneRol,

        filtrarResultados,

        filtrarCuestionarios,

        ocultarSiNoTieneRol,

        mostrarSiTieneRol,

        guardarSesion,

        cerrarSesion,

        redirectToLogin,

        redirectToDashboard

    };

})();

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.Auth = Auth;