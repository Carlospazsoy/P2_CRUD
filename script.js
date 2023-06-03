let elementos = [];

function agregarElemento() {
  const input = document.getElementById("inputText");
  const texto = input.value;
  if (texto !== "") {
    elementos.push(texto);
    input.value = "";
    input.focus();
  }
}

function mostrarElementos() {
  const lista = document.getElementById("elementos");
  lista.innerHTML = "";

  for (let i = 0; i < elementos.length; i++) {
    const elemento = document.createElement("li");
    elemento.innerText = elementos[i];

    const botonesContainer = document.createElement("div");
    botonesContainer.classList.add("botones-container");

    const editarBtn = document.createElement("button");
    editarBtn.innerText = "Editar";
    editarBtn.classList.add("editar");
    editarBtn.setAttribute("data-index", i);
    editarBtn.onclick = editarElemento;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.innerText = "Eliminar";
    eliminarBtn.classList.add("eliminar");
    eliminarBtn.setAttribute("data-index", i);
    eliminarBtn.onclick = eliminarElemento;

    botonesContainer.appendChild(editarBtn);
    botonesContainer.appendChild(eliminarBtn);

    elemento.appendChild(botonesContainer);
    lista.appendChild(elemento);
  }
}

function editarElemento() {
  const index = this.getAttribute("data-index");
  const nuevoTexto = prompt("Ingrese el nuevo texto:", elementos[index]);
  if (nuevoTexto !== null && nuevoTexto !== "") {
    elementos[index] = nuevoTexto;
    mostrarElementos();
  }
}

function eliminarElemento() {
  const index = this.getAttribute("data-index");
  elementos.splice(index, 1);
  mostrarElementos();
}
