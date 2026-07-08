/**
 * ==========================================================
 * PROYECTO : FORMA TALENTO
 * VERSIÓN  : 1.1
 * ARCHIVO  : JS/utils/helpers.js
 * ----------------------------------------------------------
 * Descripción:
 * Conjunto de funciones auxiliares reutilizables del sistema.
 * Este archivo centraliza operaciones comunes como limpieza
 * de texto, manejo de fechas, conversión de valores,
 * cálculo de promedios y validaciones simples.
 * ==========================================================
 */

const Helpers = Object.freeze({

    limpiarTexto(texto) {

        return String(texto ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    },

    normalizarTexto(texto) {

        return String(texto ?? "").trim();

    },

    convertirANumero(valor, valorDefault = null) {

        if (valor === null || valor === undefined || valor === "") {

            return valorDefault;

        }

        const numero = Number(valor);

        return Number.isNaN(numero) ? valorDefault : numero;

    },

    obtenerFechaActual() {

        return new Date().toISOString().split("T")[0];

    },

    formatearFecha(fecha) {

        if (!fecha) {

            return "";

        }

        const fechaObjeto = new Date(fecha);

        if (Number.isNaN(fechaObjeto.getTime())) {

            return String(fecha);

        }

        return fechaObjeto.toLocaleDateString("es-MX");

    },

    calcularPromedio(valores) {

        if (!Array.isArray(valores) || valores.length === 0) {

            return 0;

        }

        const numeros = valores
            .map((valor) => Number(valor))
            .filter((valor) => !Number.isNaN(valor));

        if (numeros.length === 0) {

            return 0;

        }

        const suma = numeros.reduce((total, valor) => total + valor, 0);

        return Number((suma / numeros.length).toFixed(2));

    },

    esArreglo(valor) {

        return Array.isArray(valor);

    },

    tieneContenido(valor) {

        if (!valor) {

            return false;

        }

        if (Array.isArray(valor)) {

            return valor.length > 0;

        }

        if (typeof valor === "object") {

            return Object.keys(valor).length > 0;

        }

        return String(valor).trim() !== "";

    },

    clonar(data) {

        return JSON.parse(JSON.stringify(data));

    },

    obtenerNombreCompleto(persona) {

        if (!persona) {

            return "";

        }

        return `${persona.nombre ?? ""} ${persona.apellido ?? ""}`.trim();

    },

    obtenerValorInput(input) {

        if (!input) {

            return "";

        }

        return String(input.value ?? "").trim();

    },

    obtenerValorNumerico(elemento, valorDefault = null) {

        if (!elemento) {

            return valorDefault;

        }

        return this.convertirANumero(elemento.value, valorDefault);

    },

    obtenerValoresSelect(select) {

        if (!select) {

            return [];

        }

        if (select.multiple) {

            return Array.from(select.selectedOptions)
                .map((option) => Number(option.value))
                .filter((valor) => !Number.isNaN(valor));

        }

        const valor = Number(select.value);

        return Number.isNaN(valor) || select.value === ""
            ? []
            : [valor];

    },

    crearOption(value, text) {

        const option = document.createElement("option");

        option.value = value;

        option.textContent = text;

        return option;

    },

    llenarSelect(select, data = [], valueField = "id", textField = "nombre") {

        if (!select || !Array.isArray(data)) {

            return;

        }

        select.innerHTML = "";

        data.forEach((item) => {

            select.appendChild(
                this.crearOption(
                    item[valueField],
                    item[textField]
                )
            );

        });

    },

    generarSlug(texto) {

        return String(texto ?? "")
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    },

    obtenerParametroURL(nombre) {

        const parametros = new URLSearchParams(window.location.search);

        return parametros.get(nombre);

    },

    estaEnCarpetaHTML() {

        return window.location.pathname.toLowerCase().includes("/html/");

    },

    redireccionar(rutaDesdeHTML, rutaDesdeRaiz) {

        window.location.href = this.estaEnCarpetaHTML()
            ? rutaDesdeHTML
            : rutaDesdeRaiz;

    }

});

window.Helpers = Helpers;