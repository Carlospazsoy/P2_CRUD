console.log("Entro al script.js");

const nombreInput = document.getElementById("nombre");
const lista = document.getElementById("lista");
let nombres = localStorage.getItem("nombres") ? JSON.parse(localStorage.getItem("nombres")) : [];
let editando = false;
let nombre_previo = "";

function agregarNombre() {
  if (editando) {
    const indice = nombres.indexOf(nombre_previo);
    if (indice !== -1) {
      nombres.splice(indice, 1, nombreInput.value);
      localStorage.setItem("nombres", JSON.stringify(nombres));
      nombreInput.value = "";
      actualizarLista();
      editando = false;
    }
  } else {
    const nombre = nombreInput.value;
    nombres.push(nombre);
    localStorage.setItem("nombres", JSON.stringify(nombres));
    nombreInput.value = "";
    actualizarLista();
  }
}

function actualizarLista() {
  lista.innerHTML = "";
  nombres.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.addEventListener("click", () => deleteIndividual(nombre));
    btnEliminar.textContent = "Eliminar";
    li.appendChild(btnEliminar);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-warning", "mr-2");
    btnEdit.addEventListener("click", () => editar(nombre));
    btnEdit.textContent = "Editar";
    li.appendChild(btnEdit);

    const botonesContainer = document.createElement("div");
    botonesContainer.classList.add("botones-container");
    botonesContainer.appendChild(btnEliminar);
    botonesContainer.appendChild(btnEdit);
    li.appendChild(botonesContainer);

    lista.appendChild(li);
  });
}

function deleteIndividual(nombre) {
  nombres = nombres.filter(n => n !== nombre);
  localStorage.setItem("nombres", JSON.stringify(nombres));
  actualizarLista();
}

function limpiarStorage() {
  localStorage.clear();
  nombres = [];
  actualizarLista();
}

function editar(nombre) {
  editando = true;
  nombre_previo = nombre;
  nombreInput.value = nombre;
}

actualizarLista();
