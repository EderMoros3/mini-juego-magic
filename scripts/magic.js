




/*class Torneo {
    #nombre;
    #jugadores;


    constructor(nombre, numJugadores = 8) {
        this.#nombre = nombre;
        this.#jugadores = [];

        for (let i = i; i < numJugadores; i++) {
            let nombreJugador = "Jugador " + (i + 1);
            this.#jugadores.push(new Jugador(nombreJugador));
        }
    }

        // Getters
        getNombre() { return this.#nombre };
        getJugadores() { return this.#jugadores };

        printJugador() {
        for (let i = 0; i < this.#jugadores.length; i++) {
            console.log(` ${i + 1}. ${this.#jugadores[i].toString()}`);
        }
    }
        //Mostrar los jugadores del torneo
        mostrarJugadores() {
            console.log(`\n --- Jugadores del torneo: ${this.#nombre} ---`);
            for(let i = 0; i < this.#jugadores.length; i++) {
                console.log(`\n${i + 1}: ${this.#jugadores[i].getNombre}:`);
                this.#jugadores[i].printJugador();
            }
        }

        seleccionarJugadorAleatorio() {
        if (this.#jugadores.length === 0) {
            /*
              Archivo principal de datos y flujo inicial del juego (magic.js)
              - Define la base de cartas (`cartasDB`) y constantes de configuración.
              - Crea dos jugadores y sus mazos, muestra mazos y lanza un duelo inicial (debug).
            */

            // Base de datos de cartas disponibles para el juego (instancias de Carta)
            let cartasDB = [
    
    new Carta("Josete el padre borracho", 10),
    new Carta("Gigante de Piedra", 10),
    
    // ===== CRIATURAS PODEROSAS (11-15 puntos) =====
    new Carta("Fénix Ardiente", 11),
    new Carta("Golem de Acero", 11),
    new Carta("Elemental de Fuego", 11),
    
    new Carta("Dragón Joven", 12),
    new Carta("Ángel Vengador", 12),
    
    new Carta("Liche Supremo", 13),
    new Carta("Demonio Mayor", 13),
    
    new Carta("Kraken Abismal", 14),
    new Carta("Rey Esqueleto", 14),
    
    new Carta("Hydra Tricéfala", 15),
    
    // ===== CARTAS LEGENDARIAS (16+ puntos) =====
    new Carta("Maestro del Tiempo", 16),
    new Carta("Arcángel Supremo", 17),
    new Carta("Dragón Anciano", 18),
    new Carta("Leviatán Cósmico", 19),
    new Carta("Reyes el omnico", 20),
    new Carta("Emperador Lich", 21),
    new Carta("Titán Primordial", 22),
    new Carta("Señor de las Sombras", 24),
    new Carta("Dios de la Guerra", 25),
    new Carta("Avatar de la Destrucción", 28),
    new Carta("Dragón del Apocalipsis", 30)
];

// Constantes de configuración del juego
const CARTAS_POR_MAZO = 10;  // Número de cartas por mazo
const MAZOS_POR_JUGADOR = 3; // Mazos que tendrá cada jugador por defecto

console.log("--- Empieza el juego de cartas ---");

// Función auxiliar para listar cartas en consola (debug)
function mostrarCartas(cartas) {
    for (let i = 0; i < cartas.length; i++) {
        console.log(cartas[i].toString());
    }
}

// Crear dos jugadores y sus mazos (instancias globales usadas por UI)
console.log("\n --- Creando Jugadores ---");
let jugador1 = new Jugador("Mago Supremo", MAZOS_POR_JUGADOR);
let jugador2 = new Jugador("Guerrero Sombra", MAZOS_POR_JUGADOR);

// Mostrar mazos en consola (solo debug)
jugador1.mostrarMazos();
jugador2.mostrarMazos();

// Ejecutar un duelo inicial para comprobar la lógica (debug)
console.log("\n --- Comienza el duelo ---");
jugador1.enfrentarJugador(jugador2);