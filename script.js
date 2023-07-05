console.log("Entro al script.js");

const nombreInput = document.getElementById("nombre");
const lista = document.getElementById("lista");
/* dentro de la variable nombres se guardara un arreglo: si el parametro nombres (se esta referenciando asi mismo) existe, se tranforma en objeto JS , sino se devuelve arreglo vacio */
let nombres = localStorage.getItem("nombres") ? JSON.parse(localStorage.getItem("nombres")) : [];
/* valor predeterminado para variable editando y nombre_actual */
/* Estas variables se utilizan para rastrear si se está editando un nombre existente y almacenar el nombre anterior antes de la edición. */
let editando = false;
/* limpia el campo del input */
let nombre_actual = "";


function agregarNombre() {
    if (nombreInput.value === "") {
      return alert('Ingrese un nombre'); // Salir de la función si el campo de entrada está vacío
    }
  if (editando) { // si editando es true (significa que hay un nombre existente) entonces busca el nombre_actual en el arreglo 'nombres'
    const indice = nombres.indexOf(nombre_actual);
    /* indexOf devuleve el indice del arreglo o -1 si no lo encuentra */
    if (indice !== -1) {
      /* Se modifica(actualiza) con splice al arreglo nombres en esa posicion, se guarda en el local storage y se actualiza la lista visible*/
      /* splice sintax(posicion, elementosamodificar, reemplazo) */
      nombres.splice(indice, 1, nombreInput.value);
      localStorage.setItem("nombres", JSON.stringify(nombres));
      /* despues de haber agregado el nombre se vacia el input se restablece el valor de let editando y se actualiza la lista */
      nombreInput.value = "";
      editando = false; 
      actualizarLista();
    }
  } else {
    /* si editando es falso se trata de un nuevo nombre */
    const nombre = nombreInput.value;
    /* el valor que se haya escrito en el input se pushea en el arrego nombres */
    nombres.push(nombre);
    /* se guarda en el localstorage */
    localStorage.setItem("nombres", JSON.stringify(nombres));
    /* terminada la operacion se borra el espacio del input y se actualiza la lista visible */
    nombreInput.value = "";
    actualizarLista();
  }
}
/* Funcionalidad extra : ejecutar la funcion con enter cuando se esta dentro del input*/
/* Se extrae el dato */
const nombreInputEnter = document.getElementById("nombreInput");
/* sintax addEventListener(evento, funcion) */
nombreInputEnter.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    agregarNombre();
  }
});

function actualizarLista() {
  /* aseguramos que el innerHTML del elemento ul este vacio */
  lista.innerHTML = "";
  /* creacion del elemento li con JS */
  nombres.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;
    /* Creacion de boton eliminar con JS , aignacion de clase y asignacion de funcion*/
    /* danger es rojo */
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");

    btnEliminar.addEventListener("click", () => deleteIndividual(nombre));
    btnEliminar.textContent = "Eliminar";
    li.appendChild(btnEliminar);
     /* Creacion de boton eliminar con JS , aignacion de clase y asignacion de funcion*/
    /* warning es amarillo */
    const btnEdit = document.createElement("button");
    btnEdit.textContent = "Editar";
    btnEdit.classList.add("btn", "btn-warning", "mr-2");
    btnEdit.addEventListener("click", () => editar(nombre));
    li.appendChild(btnEdit);
    /* Creacion del contenedor de eestos botones */
    const botonesContainer = document.createElement("div");
    botonesContainer.classList.add("botones-container");
    botonesContainer.appendChild(btnEliminar);
    botonesContainer.appendChild(btnEdit);
    /* Asignacion de su ubicacion en el html */
    li.appendChild(botonesContainer);
        /* ul class = 'lista' */
    lista.appendChild(li);
  });
}

function deleteIndividual(nombre) {
  /* crea nuevo arreglo que excluya el nombre a eliminar */
  nombres = nombres.filter(n => n !== nombre); /* escanea cada elemento y devuelve todos menos el qeu coincdia con el nombre  */
  /* se actualizza el arreglo del local storage */
  localStorage.setItem("nombres", JSON.stringify(nombres));
  actualizarLista();
}

function limpiarStorage() {
  localStorage.clear();
  nombres = [];
  /* se cambian los elemento del arreglo nombres por un arreglo vacio */
  actualizarLista();
}

function editar(nombre) {
  editando = true;
  nombre_actual = nombre;
  nombreInput.value = nombre;
  nombreInput.select();
}

actualizarLista();


