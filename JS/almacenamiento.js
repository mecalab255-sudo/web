function guardarRespuesta(datos){

localStorage.setItem(

"respuestas",

JSON.stringify(datos)

);

}

function obtenerRespuestas(){

return JSON.parse(

localStorage.getItem(
"respuestas"
)

);

}