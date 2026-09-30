// PIN correcto
const PIN_CORRECTO = "2509";

// Obtener los elementos de HTML
const ruedas = document.querySelectorAll(".rueda");

const botonGirar = document.getElementById("girar");
const botonConfirmar = document.getElementById("confirmar");

const mensaje = document.getElementById("mensaje");
const numeroSeleccionado = document.getElementById("numeroSeleccionado");

const panel = document.getElementById("panel");
const carta = document.getElementById("carta");

const sobre = document.getElementById("sobre");
const candadoIcono = document.getElementById("candadoIcono");

const particulas = document.getElementById("particulas");

// Números iniciales de las cuatro rueditas
let combinacion = [0, 0, 0, 0];

// Primera ruedita seleccionada
let indiceActivo = 0;

// Seleccionar una ruedita
ruedas.forEach((rueda, indice) => {

    rueda.addEventListener("click", () => {

        // Quitar selección anterior
        ruedas.forEach((elemento) => {
            elemento.classList.remove("seleccionada");
        });

        // Marcar la ruedita elegida
        rueda.classList.add("seleccionada");

        // Guardar cuál está seleccionada
        indiceActivo = indice;

        numeroSeleccionado.textContent = indice + 1;

        mensaje.textContent = "Ahora puedes girar esta ruedita.";
        mensaje.className = "mensaje";

    });

});

// Botón para girar la ruedita seleccionada
botonGirar.addEventListener("click", () => {

    const ruedaActiva = ruedas[indiceActivo];

    // Animar la ruedita
    ruedaActiva.classList.remove("girando");

    // Reiniciar la animación
    void ruedaActiva.offsetWidth;

    ruedaActiva.classList.add("girando");

    // Cambiar al siguiente número
    combinacion[indiceActivo] =
        (combinacion[indiceActivo] + 1) % 10;

    // Mostrar el nuevo número
    ruedaActiva.textContent = combinacion[indiceActivo];

    mensaje.textContent = "La combinación está cambiando...";
    mensaje.className = "mensaje";

});

// Comprobar el PIN
botonConfirmar.addEventListener("click", () => {

    // Convertir los cuatro números en un texto
    const pinIntroducido = combinacion.join("");

    // Comprobar si el PIN es correcto
    if (pinIntroducido === PIN_CORRECTO) {

        mensaje.textContent = "¡Combinación correcta! ♥";
        mensaje.className = "mensaje exito";

        // Cambiar el candado
        candadoIcono.textContent = "🔓";

        // Animar el sobre
        sobre.style.transform = "scale(1.08) rotate(-3deg)";

        // Ocultar el panel
        panel.classList.add("oculto");

        // Mostrar la carta
        carta.classList.remove("oculto");

        // Crear partículas decorativas
        crearParticulas();

    } else {

        mensaje.textContent =
            "Esa no es la combinación correcta. Inténtalo otra vez. ♥";

        mensaje.className = "mensaje error";

        // Animar el candado
        sobre.classList.remove("temblar");

        void sobre.offsetWidth;

        sobre.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 350
            }
        );

    }

});

// Crear corazones y destellos flotantes
function crearParticulas() {

    const simbolos = ["♥", "✦", "♡", "✧"];

    for (let i = 0; i < 35; i++) {

        const particula = document.createElement("span");

        particula.className = "particula";

        particula.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        particula.style.left = Math.random() * 100 + "vw";

        particula.style.fontSize =
            (12 + Math.random() * 18) + "px";

        particula.style.animationDuration =
            (4 + Math.random() * 5) + "s";

        particula.style.animationDelay =
            (Math.random() * 2) + "s";

        particulas.appendChild(particula);

        // Eliminar la partícula al terminar
        particula.addEventListener("animationend", () => {
            particula.remove();
        });

    }

}