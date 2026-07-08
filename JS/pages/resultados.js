/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/resultados.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla la vista de resultados del sistema.
 * Muestra los resultados visibles de acuerdo con el rol del
 * usuario activo y permite consultar información general de
 * evaluaciones, respuestas, promedios y cursos recomendados.
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

        console.error("resultados.js: Auth no está definido.");

        window.location.href = "../index.html";

        return;

    }

    const usuarioActivo = Auth.requireAuth();

    if (!usuarioActivo) {

        return;

    }

    //======================================================
    // Referencias del DOM
    //======================================================

    const usuarioInfo = document.getElementById("usuarioInfo");

    const contenedorResultados = document.getElementById("contenedorResultados");

    const btnLimpiarResultados = document.getElementById("btnLimpiarResultados");

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

    const obtenerNombreUsuario = (usuario) => {

        if (!usuario) {

            return "Usuario no encontrado";

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerNombreCompleto(usuario);

        }

        return `${usuario.nombre ?? ""} ${usuario.apellido ?? ""}`.trim();

    };

    const obtenerNombreRol = (usuario) => {

        if (!usuario) {

            return "Sin rol";

        }

        if (typeof UsuariosService !== "undefined") {

            return UsuariosService.obtenerNombreRol(usuario);

        }

        if (typeof Auth !== "undefined") {

            return Auth.getRoleName(usuario) ?? "Sin rol";

        }

        return "Sin rol";

    };

    const obtenerNombreCuestionario = (cuestionario, resultado) => {

        if (cuestionario) {

            return cuestionario.titulo ?? cuestionario.nombre ?? "Cuestionario sin título";

        }

        return resultado.cuestionario ?? "Cuestionario no encontrado";

    };

    const obtenerClasePromedio = (promedio) => {

        const valor = Number(promedio);

        if (valor < 3) {

            return "bajo";

        }

        if (valor < 4) {

            return "medio";

        }

        return "alto";

    };

    //======================================================
    // Información del usuario activo
    //======================================================

    const renderUsuarioActivo = () => {

        if (!usuarioInfo) {

            return;

        }

        const nombre = obtenerNombreUsuario(usuarioActivo);

        const rol = Auth.getRoleName(usuarioActivo) ?? "Sin rol";

        usuarioInfo.innerHTML = `
            <strong>${limpiarTexto(nombre)}</strong>
            <span>${limpiarTexto(rol)}</span>
        `;

    };

    //======================================================
    // Obtener resultados visibles
    //======================================================

    const obtenerResultadosVisibles = () => {

        if (typeof ResultadosService === "undefined") {

            console.error("resultados.js: ResultadosService no está definido.");

            return [];

        }

        return ResultadosService.obtenerPorPermisos(usuarioActivo);

    };

    //======================================================
    // Render de cursos recomendados
    //======================================================

    const renderCursosRecomendados = (cursos = []) => {

        if (!Array.isArray(cursos) || cursos.length === 0) {

            return `
                <p><strong>Cursos recomendados:</strong> Sin recomendaciones críticas.</p>
            `;

        }

        const listaCursos = cursos.map((curso) => {

            return `
                <li>
                    <a href="${limpiarTexto(curso.url)}" target="_blank">
                        ${limpiarTexto(curso.nombre)}
                    </a>
                    <small>${limpiarTexto(curso.nivel)} · ${limpiarTexto(curso.duracion)}</small>
                </li>
            `;

        }).join("");

        return `
            <div class="cursos-recomendados">
                <strong>Cursos recomendados:</strong>
                <ul>
                    ${listaCursos}
                </ul>
            </div>
        `;

    };

    //======================================================
    // Render de promedios por competencia
    //======================================================

    const renderPromediosCompetencia = (promedios = []) => {

        if (!Array.isArray(promedios) || promedios.length === 0) {

            return `
                <p><strong>Competencias:</strong> Sin datos suficientes.</p>
            `;

        }

        const competencias = Storage.get(StorageKeys.COMPETENCIAS, []);

        const lista = promedios.map((item) => {

            const competencia = competencias.find(
                (comp) => Number(comp.id) === Number(item.competenciaId)
            );

            const nombreCompetencia = competencia
                ? competencia.nombre
                : `Competencia ${item.competenciaId}`;

            return `
                <li>
                    ${limpiarTexto(nombreCompetencia)}:
                    <strong>${item.promedio}</strong>
                </li>
            `;

        }).join("");

        return `
            <div class="promedios-competencia">
                <strong>Promedio por competencia:</strong>
                <ul>
                    ${lista}
                </ul>
            </div>
        `;

    };

    //======================================================
    // Render principal
    //======================================================

    const renderResultados = () => {

        if (!contenedorResultados) {

            console.error("resultados.js: No se encontró #contenedorResultados.");

            return;

        }

        const resultados = obtenerResultadosVisibles();

        contenedorResultados.innerHTML = "";

        if (resultados.length === 0) {

            contenedorResultados.innerHTML = `
                <div class="sin-resultados">
                    <h3>No hay resultados disponibles</h3>
                    <p>Aún no existen evaluaciones visibles para tu usuario.</p>
                </div>
            `;

            return;

        }

        resultados.forEach((resultado) => {

            const detalle = ResultadosService.obtenerDetalle(resultado.id);

            const usuarioResultado = detalle?.usuario ?? ResultadosService.obtenerUsuarioDelResultado(resultado);

            const cuestionario = detalle?.cuestionario ?? null;

            const respuestas = detalle?.respuestas ?? ResultadosService.obtenerRespuestasPorResultado(resultado.id);

            const promediosPorCompetencia = detalle?.promediosPorCompetencia ?? [];

            const cursosRecomendados = detalle?.cursosRecomendados ?? [];

            const nombreUsuario = obtenerNombreUsuario(usuarioResultado);

            const nombreRol = obtenerNombreRol(usuarioResultado);

            const nombreCuestionario = obtenerNombreCuestionario(cuestionario, resultado);

            const promedio = Number(resultado.promedioGeneral ?? 0).toFixed(2);

            const clasePromedio = obtenerClasePromedio(promedio);

            contenedorResultados.innerHTML += `
                <div class="card-resultado">

                    <div class="resultado-header">
                        <h3>${limpiarTexto(nombreCuestionario)}</h3>
                        <span class="promedio ${clasePromedio}">
                            Promedio: ${promedio}
                        </span>
                    </div>

                    <p><strong>Usuario:</strong> ${limpiarTexto(nombreUsuario)}</p>

                    <p><strong>Rol:</strong> ${limpiarTexto(nombreRol)}</p>

                    <p><strong>Fecha:</strong> ${limpiarTexto(resultado.fecha)}</p>

                    <p><strong>Estado:</strong> ${limpiarTexto(resultado.estado)}</p>

                    <p><strong>Respuestas:</strong> ${respuestas.length}</p>

                    ${
                        resultado.observaciones
                            ? `<p><strong>Observaciones:</strong> ${limpiarTexto(resultado.observaciones)}</p>`
                            : ""
                    }

                    ${renderPromediosCompetencia(promediosPorCompetencia)}

                    ${renderCursosRecomendados(cursosRecomendados)}

                    ${
                        Auth.isAdmin()
                            ? `<button type="button" onclick="eliminarResultado(${resultado.id})">
                                Eliminar resultado
                               </button>`
                            : ""
                    }

                </div>
            `;

        });

    };

    //======================================================
    // Eliminar un resultado
    //======================================================

    const eliminarResultado = (id) => {

        if (!Auth.isAdmin()) {

            alert("No tienes permisos para eliminar resultados.");

            return;

        }

        const confirmar = confirm("¿Seguro que deseas eliminar este resultado? También se eliminarán sus respuestas.");

        if (!confirmar) {

            return;

        }

        const eliminado = ResultadosService.eliminar(Number(id));

        if (!eliminado) {

            alert("No se pudo eliminar el resultado.");

            return;

        }

        renderResultados();

    };

    //======================================================
    // Limpiar resultados
    //======================================================

    const limpiarResultados = () => {

        if (!Auth.isAdmin()) {

            alert("No tienes permisos para limpiar resultados.");

            return;

        }

        const confirmar = confirm(
            "¿Eliminar todos los resultados y respuestas? Esta acción es solo recomendable durante pruebas."
        );

        if (!confirmar) {

            return;

        }

        Storage.set(StorageKeys.RESULTADOS, []);

        Storage.set(StorageKeys.RESPUESTAS, []);

        renderResultados();

    };

    //======================================================
    // Eventos
    //======================================================

    if (btnLimpiarResultados) {

        if (!Auth.isAdmin()) {

            btnLimpiarResultados.style.display = "none";

        } else {

            btnLimpiarResultados.addEventListener("click", limpiarResultados);

        }

    }

    //======================================================
    // Exportación global para botones onclick
    //======================================================

    window.eliminarResultado = eliminarResultado;

    window.renderResultados = renderResultados;

    //======================================================
    // Inicialización de página
    //======================================================

    renderUsuarioActivo();

    renderResultados();

});