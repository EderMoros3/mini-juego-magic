/*
  Clase Jugador
  - Mantiene varios mazos y actúa como cliente para seleccionar mazos y enfrentar a otro jugador.
  - Contrato mínimo:
    constructor(nombre:string, numMazos:number)
    getNombre(), getMazos(), mostrarMazos(), seleccionarMazoAleatorio(), enfrentarJugador(otroJugador)
*/
class Jugador {
    #nombre;
    #mazos;

    // Crea `numMazos` mazos para el jugador
    constructor(nombre, numMazos = 3) {
        this.#nombre = nombre;
        this.#mazos = [];

        for(let i = 0; i < numMazos; i++) {
            let nombreMazo = `${nombre} - Mazo ${i + 1}`;
            this.#mazos.push(new Mazo(nombreMazo));
        }
    }

    // Getters simples
    getNombre() { return this.#nombre };
    getMazos() { return this.#mazos };

    // Imprime en consola todos los mazos y sus cartas (debug)
    mostrarMazos() {
        console.log(`\n--- Mazos de ${this.#nombre} ---`);
        for(let i = 0; i < this.#mazos.length; i++) {
            console.log(`\n${i + 1}. ${this.#mazos[i].getNombre()}:`);
            this.#mazos[i].printMazo();
        }
    }

    // Selecciona un mazo al azar y lo devuelve
    seleccionarMazoAleatorio() {
        let iRandom = Math.floor(Math.random() * this.#mazos.length);
        return this.#mazos[iRandom];
    }

    /*
      Enfrenta a `otroJugador` eligiendo cada uno un mazo aleatorio
      - Imprime información en consola usando los métodos de Mazo
      - Devuelve los mazos seleccionados para uso posterior (UI/reportes)
    */
    enfrentarJugador(otroJugador) {
        console.log(`\n --- Enfrentamiento entre Jugadores ---`);
        console.log(`${this.#nombre} VS ${otroJugador.getNombre()}`);

        // Elegir mazos aleatorios
        let mazoJugador1 = this.seleccionarMazoAleatorio();
        let mazoJugador2 = otroJugador.seleccionarMazoAleatorio();

        console.log(`\n${this.#nombre} ha seleccionado: ${mazoJugador1.getNombre()}`);
        console.log(`\n${otroJugador.getNombre()} ha seleccionado: ${mazoJugador2.getNombre()}`);

        // Ejecuta la pelea (usa console.log internamente si no se pasa report)
        mazoJugador1.peleaMazos(mazoJugador2);

        return { mazo1: mazoJugador1, mazo2: mazoJugador2};
    }

    // Añade un nuevo mazo personalizado
    añadirMazo(nombreMazo) {
        this.#mazos.push(new Mazo(nombreMazo));
    }
}
