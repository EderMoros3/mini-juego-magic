/*
  UI (scripts/ui.js)
  - Controla la representación en DOM de jugadores, mazos y cartas.
  - Expone funciones auxiliares para escribir en el área de `#log` y para renderizar
    listas de mazos con botones que muestran/ocultan las cartas.
  - Se integra con las APIs del core (Jugador, Mazo, Carta) mediante variables globales
    creadas en `magic.js` (ej. `jugador1`, `jugador2`).
*/

(function(){
    // Helper: obtener elemento por id
    function qs(id) { return document.getElementById(id); }

    // Escribe una línea en el área de log del DOM. Mantiene el scroll abajo.
    function log(msg) {
        const out = qs('log');
        if (!out) return;
        out.textContent += msg + '\n';
        out.scrollTop = out.scrollHeight;
    }

    // Crea un <li> para representar una carta en listas del DOM
    function createCardElement(carta) {
        const li = document.createElement('li');
        li.textContent = carta.toString();
        li.className = 'card-item';
        return li;
    }

    // Renderiza la tarjeta del jugador: título + lista de mazos con botón "Ver cartas"
    function renderJugador(jugador, containerId) {
        const cont = qs(containerId);
        if(!cont || !jugador) return;
        // Limpia y crea contenido nuevo
        cont.innerHTML = '';
        const title = document.createElement('h2');
        title.textContent = jugador.getNombre();
        cont.appendChild(title);

        const mazoList = document.createElement('ul');
        mazoList.className = 'mazo-list';

        const mazos = jugador.getMazos();
        for (let i = 0; i < mazos.length; i++) {
            const m = mazos[i];
            const li = document.createElement('li');
            li.style.marginBottom = '0.5rem';
            li.className = 'mazo-item';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = m.getNombre() + ' ';

            // Botón para alternar la visibilidad de las cartas del mazo
            const verBtn = document.createElement('button');
            verBtn.textContent = 'Ver cartas';
            verBtn.className = 'btn-ver';
            const cardsContainer = document.createElement('ul');
            cardsContainer.className = 'cards';
            cardsContainer.style.display = 'none';

            // Rellenar la lista de cartas (oculta por defecto)
            const cards = m.getMazo();
            for (let j = 0; j < cards.length; j++) {
                cardsContainer.appendChild(createCardElement(cards[j]));
            }

            // Toggle simple para mostrar/ocultar cartas
            verBtn.onclick = () => {
                cardsContainer.style.display = cardsContainer.style.display === 'none' ? 'block' : 'none';
            };

            li.appendChild(nameSpan);
            li.appendChild(verBtn);
            li.appendChild(cardsContainer);
            mazoList.appendChild(li);
        }

        cont.appendChild(mazoList);
    }

    // Refresca toda la UI (jugadores y log)
    function refreshUI() {
        if (typeof jugador1 === 'undefined' || typeof jugador2 === 'undefined') {
            console.warn('Jugadores no encontrados (asegúrate de cargar scripts en orden).');
            return;
        }
        // Limpiar log y redibujar jugadores
        qs('log').textContent = '';
        renderJugador(jugador1, 'jugador1');
        renderJugador(jugador2, 'jugador2');
        log('Mazos renderizados. Pulsa "Pelear" para enfrentar jugadores.');
    }

    // Asigna comportamiento a los botones principales
    function setupControls() {
        const btnPelear = qs('btn-pelear');
        const btnRef = qs('btn-refrescar');
        if (btnPelear) {
            btnPelear.addEventListener('click', () => {
                log('--- Empieza el duelo desde la UI ---');
                // Seleccionamos mazos para pasar una función report que escriba en el DOM
                const mazo1 = jugador1.seleccionarMazoAleatorio();
                const mazo2 = jugador2.seleccionarMazoAleatorio();
                log(`${jugador1.getNombre()} ha seleccionado: ${mazo1.getNombre()}`);
                log(`${jugador2.getNombre()} ha seleccionado: ${mazo2.getNombre()}`);
                // Ejecuta la pelea y redirecciona cada línea al log en pantalla
                mazo1.peleaMazos(mazo2, (msg) => {
                    log(msg);
                });
            });
        }
        if (btnRef) {
            btnRef.addEventListener('click', () => {
                refreshUI();
            });
        }
    }

    // Inicialización al cargar el DOM: crear #log si falta, enlazar botones y renderizar
    document.addEventListener('DOMContentLoaded', () => {
        if (!qs('log')) {
            const main = document.querySelector('main');
            const div = document.createElement('div');
            div.id = 'log';
            main.appendChild(div);
        }
        setupControls();
        setTimeout(refreshUI, 50);
    });

})();