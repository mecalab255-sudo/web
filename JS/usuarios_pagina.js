// ==========================
// PROTECCIÓN
// ==========================

const usuario = Auth.requireRole([
    "ADMIN",
    "SUPERVISOR"
]);

if (!usuario) {

    throw new Error(
        "Acceso denegado"
    );

}

// ==========================
// MOSTRAR USUARIO
// ==========================

document.getElementById(
    "usuarioInfo"
).innerHTML = `

    <strong>

        ${usuario.nombre}

    </strong>

    <span>

        ${usuario.rol}

    </span>

`;

// ==========================
// RESTRICCIONES SUPERVISOR
// ==========================

if (
    usuario.rol ===
    "SUPERVISOR"
) {

    const btnNuevo =
    document.getElementById(
        "btnNuevoUsuario"
    );

    if (btnNuevo) {

        btnNuevo.style.display =
        "none";

    }

    document
    .querySelectorAll(
        ".editar, .eliminar"
    )
    .forEach(

        boton => {

            boton.style.display =
            "none";

        }

    );

}

// ==========================
// CERRAR SESIÓN
// ==========================

function cerrarSesion() {

    localStorage.removeItem(
        "usuarioActivo"
    );

    window.location.href =
    "index.html";

}