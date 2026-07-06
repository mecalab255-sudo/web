/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/pages/crearCuestionario.js
 * ----------------------------------------------------------
 * Descripción:
 * Controla la creación de nuevos cuestionarios.
 * Permite capturar información general del cuestionario,
 * agregar preguntas dinámicamente y guardar la información
 * utilizando CuestionariosService.
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

        console.error("crearCuestionario.js: Auth no está definido.");

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

    const contenedorPreguntas = document.getElementById("contenedorPreguntas");

    const btnAgregarPregunta = document.getElementById("btnAgregarPregunta");

    const btnGuardarCuestionario = document.getElementById("btnGuardarCuestionario");

    const inputNombre = document.getElementById("nombreCuestionario");

    const inputDescripcion = document.getElementById("descripcionCuestionario");

    const selectCategoria =
        document.getElementById("categoria") ||
        document.getElementById("categoriaId") ||
        document.getElementById("selectCategoria");

    const selectPrioridad =
        document.getElementById("prioridad") ||
        document.getElementById("prioridadId") ||
        document.getElementById("selectPrioridad");

    const selectArea =
        document.getElementById("area") ||
        document.getElementById("areaId") ||
        document.getElementById("selectArea");

    const selectCompetencia =
        document.getElementById("competencia") ||
        document.getElementById("competenciaId") ||
        document.getElementById("selectCompetencia");

    const checkTodasLasAreas =
        document.getElementById("aplicaTodasLasAreas") ||
        document.getElementById("todasLasAreas");

    let numeroPregunta = 0;

    //======================================================
    // Validación inicial
    //======================================================

    if (
        !contenedorPreguntas ||
        !btnAgregarPregunta ||
        !btnGuardarCuestionario ||
        !inputNombre ||
        !inputDescripcion
    ) {

        console.error("crearCuestionario.js: Faltan elementos necesarios en el HTML.");

        return;

    }

    //======================================================
    // Helpers
    //======================================================

    const limpiarTexto = (texto) => {

        return String(texto ?? "").trim();

    };

    const obtenerFechaActual = () => {

        return new Date().toISOString().split("T")[0];

    };

    const obtenerValorNumerico = (elemento, valorDefault = null) => {

        if (!elemento || elemento.value === "") {

            return valorDefault;

        }

        const valor = Number(elemento.value);

        return Number.isNaN(valor) ? valorDefault : valor;

    };

    const obtenerValoresNumericos = (elemento) => {

        if (!elemento) {

            return [];

        }

        if (elemento.multiple) {

            return Array.from(elemento.selectedOptions)
                .map((option) => Number(option.value))
                .filter((valor) => !Number.isNaN(valor));

        }

        const valor = obtenerValorNumerico(elemento, null);

        return valor ? [valor] : [];

    };

    const obtenerRutaCuestionarios = () => {

        const path = window.location.pathname.toLowerCase();

        if (path.includes("/html/")) {

            return "cuestionarios.html";

        }

        return "HTML/cuestionarios.html";

    };

    const generarOpcionesCompetencias = () => {

        if (typeof CompetenciasData === "undefined") {

            return `<option value="">Sin competencia específica</option>`;

        }

        let opciones = `<option value="">Selecciona una competencia</option>`;

        CompetenciasData
            .filter((competencia) => competencia.activa !== false)
            .forEach((competencia) => {

                opciones += `
                    <option value="${competencia.id}">
                        ${competencia.nombre}
                    </option>
                `;

            });

        return opciones;

    };

    //======================================================
    // Cargar selectores opcionales
    //======================================================

    const cargarCategorias = () => {

        if (!selectCategoria || typeof CategoriasData === "undefined") {

            return;

        }

        if (selectCategoria.options.length > 0) {

            return;

        }

        selectCategoria.innerHTML = "";

        CategoriasData.forEach((categoria) => {

            const option = document.createElement("option");

            option.value = categoria.id;

            option.textContent = categoria.nombre;

            selectCategoria.appendChild(option);

        });

    };

    const cargarPrioridades = () => {

        if (!selectPrioridad || typeof PrioridadesData === "undefined") {

            return;

        }

        if (selectPrioridad.options.length > 0) {

            return;

        }

        selectPrioridad.innerHTML = "";

        PrioridadesData.forEach((prioridad) => {

            const option = document.createElement("option");

            option.value = prioridad.id;

            option.textContent = prioridad.nombre;

            selectPrioridad.appendChild(option);

        });

    };

    const cargarAreas = () => {

        if (!selectArea || typeof AreasData === "undefined") {

            return;

        }

        if (selectArea.options.length > 0) {

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

    const cargarCompetencias = () => {

        if (!selectCompetencia || typeof CompetenciasData === "undefined") {

            return;

        }

        if (selectCompetencia.options.length > 0) {

            return;

        }

        selectCompetencia.innerHTML = "";

        CompetenciasData
            .filter((competencia) => competencia.activa !== false)
            .forEach((competencia) => {

                const option = document.createElement("option");

                option.value = competencia.id;

                option.textContent = competencia.nombre;

                selectCompetencia.appendChild(option);

            });

    };

    //======================================================
    // Preguntas dinámicas
    //======================================================

    const agregarPregunta = () => {

        numeroPregunta++;

        const div = document.createElement("div");

        div.classList.add("pregunta");

        div.innerHTML = `

            <label>
                Pregunta ${numeroPregunta}
            </label>

            <input
                type="text"
                class="textoPregunta"
                placeholder="Escriba la afirmación">

            <label>
                Competencia relacionada
            </label>

            <select class="competenciaPregunta">
                ${generarOpcionesCompetencias()}
            </select>

            <span class="info-likert">
                Escala Likert:
                0 = Totalmente en desacuerdo
                | 5 = Totalmente de acuerdo
            </span>

            <button type="button" class="btnEliminarPregunta">
                Eliminar pregunta
            </button>

        `;

        const btnEliminar = div.querySelector(".btnEliminarPregunta");

        btnEliminar.addEventListener("click", () => {

            div.remove();

            renumerarPreguntas();

        });

        contenedorPreguntas.appendChild(div);

    };

    const renumerarPreguntas = () => {

        const preguntas = contenedorPreguntas.querySelectorAll(".pregunta");

        preguntas.forEach((pregunta, index) => {

            const label = pregunta.querySelector("label");

            if (label) {

                label.textContent = `Pregunta ${index + 1}`;

            }

        });

        numeroPregunta = preguntas.length;

    };

    const obtenerPreguntasCapturadas = (categoriaId, prioridadId, competenciaIdsGenerales) => {

        const preguntasDOM = contenedorPreguntas.querySelectorAll(".pregunta");

        const preguntas = [];

        preguntasDOM.forEach((preguntaDiv, index) => {

            const inputPregunta = preguntaDiv.querySelector(".textoPregunta");

            const selectCompetenciaPregunta = preguntaDiv.querySelector(".competenciaPregunta");

            const afirmacion = limpiarTexto(inputPregunta?.value);

            if (!afirmacion) {

                return;

            }

            const competenciaPreguntaId = obtenerValorNumerico(
                selectCompetenciaPregunta,
                competenciaIdsGenerales[0] ?? null
            );

            preguntas.push({

                afirmacion,

                competenciaId: competenciaPreguntaId,

                categoriaId,

                prioridadId,

                orden: index + 1,

                activa: true

            });

        });

        return preguntas;

    };

    //======================================================
    // Guardar cuestionario
    //======================================================

    const guardarCuestionario = () => {

        if (typeof CuestionariosService === "undefined") {

            console.error("crearCuestionario.js: CuestionariosService no está definido.");

            alert("No se puede guardar el cuestionario porque el servicio no está disponible.");

            return;

        }

        const titulo = limpiarTexto(inputNombre.value);

        const descripcion = limpiarTexto(inputDescripcion.value);

        if (!titulo) {

            alert("Debe capturar el nombre del cuestionario.");

            inputNombre.focus();

            return;

        }

        const categoriaId = obtenerValorNumerico(selectCategoria, 13);

        const prioridadId = obtenerValorNumerico(selectPrioridad, 2);

        const areaIds = obtenerValoresNumericos(selectArea);

        const competenciaIdsGenerales = obtenerValoresNumericos(selectCompetencia);

        const preguntas = obtenerPreguntasCapturadas(
            categoriaId,
            prioridadId,
            competenciaIdsGenerales
        );

        if (preguntas.length === 0) {

            alert("Debe agregar al menos una pregunta.");

            return;

        }

        const competenciaIdsPreguntas = preguntas
            .map((pregunta) => pregunta.competenciaId)
            .filter((id) => id !== null && id !== undefined);

        const competenciaIds = Array.from(
            new Set([
                ...competenciaIdsGenerales,
                ...competenciaIdsPreguntas
            ])
        );

        const aplicaTodasLasAreas = checkTodasLasAreas
            ? checkTodasLasAreas.checked
            : areaIds.length === 0;

        const cuestionarioCreado = CuestionariosService.crear({

            titulo,

            descripcion,

            categoriaId,

            prioridadId,

            areaIds,

            competenciaIds,

            aplicaTodasLasAreas,

            activo: true,

            fechaCreacion: obtenerFechaActual(),

            preguntas

        });

        if (!cuestionarioCreado) {

            alert("No se pudo crear el cuestionario.");

            return;

        }

        alert("Cuestionario creado correctamente.");

        window.location.href = obtenerRutaCuestionarios();

    };

    //======================================================
    // Eventos
    //======================================================

    btnAgregarPregunta.addEventListener("click", agregarPregunta);

    btnGuardarCuestionario.addEventListener("click", guardarCuestionario);

    //======================================================
    // Exponer funciones globales por compatibilidad
    //======================================================

    window.agregarPregunta = agregarPregunta;

    window.guardarCuestionario = guardarCuestionario;

    //======================================================
    // Inicialización de página
    //======================================================

    cargarCategorias();

    cargarPrioridades();

    cargarAreas();

    cargarCompetencias();

    agregarPregunta();

});