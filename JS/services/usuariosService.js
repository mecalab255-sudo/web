/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/services/UsuariosService.js
 * ----------------------------------------------------------
 * Descripción:
 * Servicio encargado de administrar usuarios, autenticación
 * básica y sesión activa dentro del sistema.
 *
 * Este servicio centraliza las operaciones relacionadas con
 * usuarios para evitar que las páginas accedan directamente
 * a localStorage.
 * ==========================================================
 */

const UsuariosService = Object.freeze({

    /**
     * Inicializa la colección de usuarios si aún no existe.
     * Normalmente esta operación será realizada por
     * BootstrapService, pero se conserva como respaldo.
     *
     * @returns {boolean}
     */
    inicializar() {

        if (typeof UsuariosData === "undefined") {

            console.warn("UsuariosService: UsuariosData no está definido.");

            return false;

        }

        return Storage.init(
            StorageKeys.USUARIOS,
            JSON.parse(JSON.stringify(UsuariosData))
        );

    },

    /**
     * Restaura los usuarios iniciales del sistema.
     *
     * @returns {boolean}
     */
    reiniciar() {

        if (typeof UsuariosData === "undefined") {

            console.warn("UsuariosService: UsuariosData no está definido.");

            return false;

        }

        return Storage.set(
            StorageKeys.USUARIOS,
            JSON.parse(JSON.stringify(UsuariosData))
        );

    },

    /**
     * Normaliza un usuario para mantener compatibilidad
     * temporal con versiones anteriores del sistema.
     *
     * @param {Object} usuario - Usuario original.
     * @returns {Object|null}
     */
    normalizarUsuario(usuario) {

        if (!usuario) {

            return null;

        }

        return {
            ...usuario,

            rolId: usuario.rolId ?? usuario.idRol ?? null,

            areaId: usuario.areaId ?? usuario.idArea ?? null,

            puestoId: usuario.puestoId ?? usuario.idPuesto ?? null
        };

    },

    /**
     * Normaliza una lista de usuarios.
     *
     * @param {Array} usuarios - Lista de usuarios.
     * @returns {Array}
     */
    normalizarLista(usuarios) {

        if (!Array.isArray(usuarios)) {

            return [];

        }

        return usuarios.map((usuario) => this.normalizarUsuario(usuario));

    },

    /**
     * Obtiene todos los usuarios registrados.
     *
     * @returns {Array}
     */
    obtenerTodos() {

        const usuarios = Storage.get(StorageKeys.USUARIOS, []);

        return this.normalizarLista(usuarios);

    },

    /**
     * Guarda la lista completa de usuarios.
     *
     * @param {Array} usuarios - Lista completa de usuarios.
     * @returns {boolean}
     */
    guardarTodos(usuarios) {

        if (!Array.isArray(usuarios)) {

            console.error("UsuariosService: La información de usuarios debe ser un arreglo.");

            return false;

        }

        return Storage.set(StorageKeys.USUARIOS, usuarios);

    },

    /**
     * Busca un usuario por ID.
     *
     * @param {number} id - ID del usuario.
     * @returns {Object|null}
     */
    obtenerPorId(id) {

        const usuarioId = Number(id);

        return this.obtenerTodos().find(
            (usuario) => usuario.id === usuarioId
        ) || null;

    },

    /**
     * Busca un usuario por nombre de usuario.
     *
     * @param {string} nombreUsuario - Nombre de usuario.
     * @returns {Object|null}
     */
    obtenerPorUsuario(nombreUsuario) {

        if (!nombreUsuario) {

            return null;

        }

        return this.obtenerTodos().find(
            (usuario) => usuario.usuario === nombreUsuario
        ) || null;

    },

    /**
     * Valida credenciales de acceso.
     *
     * @param {string} nombreUsuario - Nombre de usuario.
     * @param {string} password - Contraseña.
     * @returns {Object|null}
     */
    autenticar(nombreUsuario, password) {

        if (!nombreUsuario || !password) {

            return null;

        }

        return this.obtenerTodos().find(
            (usuario) =>
                usuario.usuario === nombreUsuario &&
                usuario.password === password &&
                usuario.activo === true
        ) || null;

    },

    /**
     * Verifica si existe un nombre de usuario.
     *
     * @param {string} nombreUsuario - Nombre de usuario.
     * @returns {boolean}
     */
    existeUsuario(nombreUsuario) {

        return this.obtenerPorUsuario(nombreUsuario) !== null;

    },

    /**
     * Crea un nuevo usuario.
     *
     * @param {Object} nuevoUsuario - Datos del nuevo usuario.
     * @returns {Object|null}
     */
    crear(nuevoUsuario) {

        if (!nuevoUsuario || !nuevoUsuario.usuario) {

            console.error("UsuariosService: Datos de usuario incompletos.");

            return null;

        }

        if (this.existeUsuario(nuevoUsuario.usuario)) {

            console.warn("UsuariosService: El nombre de usuario ya existe.");

            return null;

        }

        const usuarios = this.obtenerTodos();

        const usuarioCreado = this.normalizarUsuario({

            id: nuevoUsuario.id ?? Storage.getNextId(StorageKeys.USUARIOS),

            nombre: nuevoUsuario.nombre ?? "",

            apellido: nuevoUsuario.apellido ?? "",

            usuario: nuevoUsuario.usuario,

            password: nuevoUsuario.password ?? "1234",

            correo: nuevoUsuario.correo ?? "",

            rolId: nuevoUsuario.rolId ?? nuevoUsuario.idRol ?? 3,

            areaId: nuevoUsuario.areaId ?? nuevoUsuario.idArea ?? null,

            puestoId: nuevoUsuario.puestoId ?? nuevoUsuario.idPuesto ?? null,

            activo: nuevoUsuario.activo ?? true,

            fechaRegistro: nuevoUsuario.fechaRegistro ?? new Date().toISOString().split("T")[0]

        });

        usuarios.push(usuarioCreado);

        this.guardarTodos(usuarios);

        return usuarioCreado;

    },

    /**
     * Actualiza un usuario existente.
     *
     * @param {number} id - ID del usuario.
     * @param {Object} datosActualizados - Datos a modificar.
     * @returns {Object|null}
     */
    actualizar(id, datosActualizados) {

        const usuarioId = Number(id);

        const usuarios = this.obtenerTodos();

        const indice = usuarios.findIndex(
            (usuario) => usuario.id === usuarioId
        );

        if (indice === -1) {

            console.warn("UsuariosService: No se encontró el usuario a actualizar.");

            return null;

        }

        const usuarioActualizado = this.normalizarUsuario({
            ...usuarios[indice],
            ...datosActualizados
        });

        usuarios[indice] = usuarioActualizado;

        this.guardarTodos(usuarios);

        return usuarioActualizado;

    },

    /**
     * Elimina un usuario por ID.
     *
     * @param {number} id - ID del usuario.
     * @returns {boolean}
     */
    eliminar(id) {

        const usuarioId = Number(id);

        const usuarios = this.obtenerTodos();

        const nuevaLista = usuarios.filter(
            (usuario) => usuario.id !== usuarioId
        );

        if (nuevaLista.length === usuarios.length) {

            console.warn("UsuariosService: No se encontró el usuario a eliminar.");

            return false;

        }

        return this.guardarTodos(nuevaLista);

    },

    /**
     * Activa o desactiva un usuario.
     *
     * @param {number} id - ID del usuario.
     * @param {boolean} activo - Estado del usuario.
     * @returns {Object|null}
     */
    cambiarEstado(id, activo) {

        return this.actualizar(id, { activo });

    },

    /**
     * Obtiene usuarios por rol.
     *
     * @param {number} rolId - ID del rol.
     * @returns {Array}
     */
    obtenerPorRol(rolId) {

        const id = Number(rolId);

        return this.obtenerTodos().filter(
            (usuario) => usuario.rolId === id
        );

    },

    /**
     * Obtiene usuarios por área.
     *
     * @param {number} areaId - ID del área.
     * @returns {Array}
     */
    obtenerPorArea(areaId) {

        const id = Number(areaId);

        return this.obtenerTodos().filter(
            (usuario) => usuario.areaId === id
        );

    },

    /**
     * Obtiene usuarios por puesto.
     *
     * @param {number} puestoId - ID del puesto.
     * @returns {Array}
     */
    obtenerPorPuesto(puestoId) {

        const id = Number(puestoId);

        return this.obtenerTodos().filter(
            (usuario) => usuario.puestoId === id
        );

    },

    /**
     * Devuelve el nombre completo de un usuario.
     *
     * @param {Object} usuario - Usuario.
     * @returns {string}
     */
    obtenerNombreCompleto(usuario) {

        if (!usuario) {

            return "";

        }

        return `${usuario.nombre ?? ""} ${usuario.apellido ?? ""}`.trim();

    },

    /**
     * Devuelve el nombre del rol del usuario.
     *
     * @param {Object} usuario - Usuario.
     * @returns {string}
     */
    obtenerNombreRol(usuario) {

        const usuarioNormalizado = this.normalizarUsuario(usuario);

        if (!usuarioNormalizado || typeof RolesData === "undefined") {

            return "Sin rol";

        }

        const rol = RolesData.find(
            (rol) => rol.id === usuarioNormalizado.rolId
        );

        return rol ? rol.nombre : "Sin rol";

    },

    /**
     * Devuelve el nombre del área del usuario.
     *
     * @param {Object} usuario - Usuario.
     * @returns {string}
     */
    obtenerNombreArea(usuario) {

        const usuarioNormalizado = this.normalizarUsuario(usuario);

        if (!usuarioNormalizado || typeof AreasData === "undefined") {

            return "Sin área";

        }

        const area = AreasData.find(
            (area) => area.id === usuarioNormalizado.areaId
        );

        return area ? area.nombre : "Sin área";

    },

    /**
     * Devuelve el nombre del puesto del usuario.
     *
     * @param {Object} usuario - Usuario.
     * @returns {string}
     */
    obtenerNombrePuesto(usuario) {

        const usuarioNormalizado = this.normalizarUsuario(usuario);

        if (!usuarioNormalizado || typeof PuestosData === "undefined") {

            return "Sin puesto";

        }

        const puesto = PuestosData.find(
            (puesto) => puesto.id === usuarioNormalizado.puestoId
        );

        return puesto ? puesto.nombre : "Sin puesto";

    },

    /**
     * Devuelve la cantidad total de usuarios.
     *
     * @returns {number}
     */
    contar() {

        return this.obtenerTodos().length;

    },

    /**
     * Guarda el usuario con sesión iniciada.
     *
     * @param {Object} usuario - Usuario autenticado.
     * @returns {boolean}
     */
    guardarSesion(usuario) {

        const usuarioNormalizado = this.normalizarUsuario(usuario);

        if (!usuarioNormalizado) {

            return false;

        }

        const usuarioSesion = {
            id: usuarioNormalizado.id,
            nombre: usuarioNormalizado.nombre,
            apellido: usuarioNormalizado.apellido,
            usuario: usuarioNormalizado.usuario,
            correo: usuarioNormalizado.correo,
            rolId: usuarioNormalizado.rolId,
            areaId: usuarioNormalizado.areaId,
            puestoId: usuarioNormalizado.puestoId,
            activo: usuarioNormalizado.activo
        };

        return Storage.set(
            StorageKeys.USUARIO_ACTIVO,
            usuarioSesion
        );

    },

    /**
     * Obtiene el usuario con sesión activa.
     *
     * @returns {Object|null}
     */
    obtenerUsuarioActivo() {

        const usuario = Storage.get(StorageKeys.USUARIO_ACTIVO, null);

        return this.normalizarUsuario(usuario);

    },

    /**
     * Cierra la sesión actual.
     *
     * @returns {boolean}
     */
    cerrarSesion() {

        return Storage.remove(StorageKeys.USUARIO_ACTIVO);

    }

});

//==========================================================
// Exportación global temporal.
// En futuras versiones será sustituida por módulos ES.
//==========================================================

window.UsuariosService = UsuariosService;