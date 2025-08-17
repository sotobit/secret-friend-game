// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Function add friend in Array
let amigos = [];
function agregarAmigo(){
    let input = document.getElementById("amigo");
    let amigoDuplicado = amigos.find(amigo => amigo.toLowerCase() === input.value.toLowerCase());

    if (input.value === "") {
        mostrarToast("No se ha ingresado un nombre.", "error");
    }else if(input.value === amigoDuplicado){
        mostrarToast("Este amigo ya ha sido agregado.", "error");
    }else {
       amigos.push(input.value);
       mostrarToast(`Amigo agregado: ${input.value}`, "success");
       input.value = "";
       actualizarLista();
    }
}

//Function update list in HTML
function actualizarLista(){
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    for (let i = 0; i < amigos.length; i++) {
        lista.innerHTML += `<li>${amigos[i]}</li>`;
    }
}

//Function restart game (empty fields)
function reiniciarJuego(){
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("amigo").value = "";
    mostrarToast("Juego reiniciado.", "info");
}

//Function to draw friend in Array
function sortearAmigo(){
    if (amigos.length === 0) {
        mostrarToast("No hay amigos para sortear.", "error");
        return;
    }
    let amigo = amigos[Math.floor(Math.random() * amigos.length)];
    mostrarToast(`El amigo secreto es: ${amigo}`, "success");
}

//Function show/hide list
let botonAlternar  = document.getElementById('toggle-list');
let lista = document.getElementById('listaAmigos');
if (botonAlternar && lista) {
    botonAlternar.addEventListener('click', () => {
    let estaOculto = lista.hasAttribute('hidden');

    if (estaOculto) {
      lista.removeAttribute('hidden');
      botonAlternar.setAttribute('aria-expanded', 'true');
      botonAlternar.textContent = 'Ocultar lista';
    } else {
      lista.setAttribute('hidden', '');        // to hide
      botonAlternar.setAttribute('aria-expanded', 'false');
      botonAlternar.textContent = 'Mostrar lista';
    }
  });
}

//Function show menssages Toast
function mostrarToast(text, type = 'info', ms = 2500) {
  const root = document.getElementById('toast-root') || (() => {
    const d = document.createElement('div');
    d.id = 'toast-root'; d.className = 'toast-root';
    document.body.appendChild(d);
    return d;
  })();

  const icons = {
    success: '✓', info: 'ℹ', warn: '⚠', error: '⨯'
  };

  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `
    <span class="icon">${icons[type] || 'ℹ'}</span>
    <span class="text">${text}</span>
    <button class="close" aria-label="Cerrar">&times;</button>
  `;

  el.querySelector('.close').addEventListener('click', () => removeToast(el));
  root.appendChild(el);

  const hideTimer = setTimeout(() => removeToast(el), ms);
  el.addEventListener('mouseenter', () => clearTimeout(hideTimer)); // pausa al pasar el mouse

  function removeToast(node){
    node.classList.add('is-leaving');
    node.addEventListener('animationend', () => node.remove(), { once:true });
  }
}
