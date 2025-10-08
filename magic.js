// Clase que representa una carta del juego
class Carta {
    // Campos privados para encapsular los datos
    #ptos_ataque;  // Puntos de ataque de la carta
    #nombre;       // Nombre de la carta

    // Constructor que inicializa una nueva carta
    constructor(nombre, ptos) {
        this.#nombre = nombre;
        this.#ptos_ataque = ptos;
    }
    
    // Método getter para obtener el nombre de la carta
    getNombre() {
        return this.#nombre;
    }

    // Método getter para obtener los puntos de ataque
    getPtos(){
        return this.#ptos_ataque;
    }

    // Método para imprimir la carta por consola
    print() {
        console.log( this.#nombre + " {" + this.#ptos_ataque + "}");
    }

    // Método para obtener representación en string de la carta
    toString() {
        return this.#nombre + " {" + this.#ptos_ataque +"}"
    }
    // Método para enfrentar dos cartas y determinar el ganador
    /* 
        Retorna:
        <0 si gana esta carta (carta1)
        0 si empatan (ambas mueren)
        >0 si gana la carta pasada como parámetro (carta2)
    */
    fight(carta) {
        let ganador;
        // Calcula la diferencia de puntos de ataque
        ganador = carta.getPtos() - this.#ptos_ataque;
    
        // Determina y muestra el resultado del combate
        if(ganador < 0){
            console.log("Ha ganado " + this.toString());
        } else if(ganador == 0) {
            console.log("Han muerto las dos cartas");
        } else {
            console.log("Ha ganado " + carta.toString());
        }
        return ganador;
    }

}


// Clase que representa un mazo de cartas
class Mazo{
    // Campos privados del mazo
    #nombre;  // Nombre identificativo del mazo
    #mazo;    // Array que contiene las cartas del mazo
    
    // Constructor que crea un mazo con nombre y genera cartas aleatorias
    constructor (nombre) {
        this.#nombre = nombre;
        this.#mazo = this.generarMazo();
    }
    
    // Métodos getter para acceder a los datos privados
    getNombre() { return this.#nombre; }
    getMazo() { return this.#mazo; }
    
    // Método que genera un mazo aleatorio con cartas únicas de la base de datos
    generarMazo(){
        let mazoGenerado = [];
        
        // Selecciona aleatoriamente cartas únicas hasta completar el mazo
        while(mazoGenerado.length < CARTAS_POR_MAZO){
            let numRandom = Math.floor(Math.random() * cartasDB.length);
            let cartaSeleccionada = cartasDB[numRandom];
            
            // Verifica si la carta ya existe en el mazo
            if (!mazoGenerado.includes(cartaSeleccionada)) {
                mazoGenerado.push(cartaSeleccionada);
            }
        }
        
        return mazoGenerado;
    }
    
    // Método para mostrar todas las cartas del mazo
    printMazo() {
        console.log(`Mazo: ${this.#nombre}`);
        for (let i = 0; i < this.#mazo.length; i++) {
            console.log(` ${i + 1}. ${this.#mazo[i].toString()}`);
        }
    }
    
    // Método para simular una pelea entre dos mazos
    peleaMazos(otroMazo) {
        console.log(`\n--- Pelea entre ${this.#nombre} y ${otroMazo.getNombre()} ---`);
        
        // Contadores de puntos para cada mazo
        let puntos1 = 0;
        let puntos2 = 0;
        
        // Pelea carta por carta hasta que se acaben las cartas de uno de los mazos
        for (let i = 0; i < Math.min(this.#mazo.length, otroMazo.getMazo().length); i++) {
            console.log(`\nRonda ${i + 1}:`);
            console.log(`Carta del ${this.#nombre}: ${this.#mazo[i].toString()}`);
            console.log(`vs`);
            console.log(`Carta del ${otroMazo.getNombre()}: ${otroMazo.getMazo()[i].toString()}`);
            
            // Ejecuta el combate entre las cartas actuales
            let resultado = this.#mazo[i].fight(otroMazo.getMazo()[i]);
            
            // Asigna puntos según el resultado del combate
            if (resultado < 0) {
                puntos1++;  // Gana carta del mazo 1
            } else if (resultado > 0) {
                puntos2++;  // Gana carta del mazo 2
            }
            // Si resultado == 0, empate, no se asignan puntos
        }
        
        // Muestra el resultado final de la pelea entre mazos
        console.log(`\n---Resultado Final---`);
        console.log(`Puntos del ${this.#nombre}: ${puntos1}`);
        console.log(`Puntos del ${otroMazo.getNombre()}: ${puntos2}`);
        
        // Determina y anuncia el ganador general
        if (puntos1 > puntos2) {
            console.log(`Ganador: ${this.#nombre}`);
        } else if (puntos2 > puntos1) {
            console.log(`Ganador: ${otroMazo.getNombre()}`);
        } else {
            console.log("Empate");
        }
    }
}

class Jugador {
    #nombre;
    #mazos;

    constructor(nombre, numMazos = 3) {
        this.#nombre = nombre;
        this.#mazos = [];

        for(let i = 0; i < numMazos; i++) {
            let nombreMazo = `${nombre} - Mazo ${i + 1}`;
            this.#mazos.push(new Mazo(nombreMazo));
        }
    }

    // Metodos getter
    getNombre() { return this.#nombre };
    getMazos() { return this.#mazos };

    //Metodo para mostrar todos los mazos del jugador
    mostrarMazos() {
        console.log(`\n--- Mazos de ${this.#nombre} ---`);
        for(let i = 0; i < this.#mazos.length; i++) {
            console.log(`\n${i + 1}. ${this.#mazos[i].getNombre()}:`);
            this.#mazos[i].printMazo();
        }
    }

    
    // Metodo para seleccionar un mazo aleatorio del jugador
    seleccionarMazoAleatorio() {
        let iRandom = Math.floor(Math.random() * this.#mazos.length);
        return this.#mazos[iRandom];
    }

    // Metodo para enfrentar a otro jugador
    enfrentarJugador(otroJugador) {
        console.log(`\n --- Enfrentamiento entre Jugadores ---`);
        console.log(`${this.#nombre} VS ${otroJugador.getNombre()}`);

        // Cada jugador selecciona un mazo aleatorio
        let mazoJugador1 = this.seleccionarMazoAleatorio();
        let mazoJugador2 = otroJugador.seleccionarMazoAleatorio();

        console.log(`\n${this.#nombre} ha seleccionado: ${mazoJugador1.getNombre()}`);
        console.log(`\n${otroJugador.getNombre()} ha seleccionado: ${mazoJugador2.getNombre()}`);

        mazoJugador1.peleaMazos(mazoJugador2);

        return { mazo1: mazoJugador1, mazo2: mazoJugador2};
    }

    añadirMazo(nombreMazo) {
        this.#mazos.push(new Mazo(nombreMazo));
    }
}

class Torneo {
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
            return null;
        }

        /*Sacar todos lo jugaddsadaores del torneo aleatorios
        []
        
            Se enfrentaria, el perdedor se saca
            [7,3,5,2,4,1,6,0]
            otro num aleatorio entre el 0 y 4
            los que pierdan se retiras
            {7,3,4,2} 
            quedan solo dos
            [7,3]
            el bucle acaba cuando solo quede 1
        */
        let iRandom = Math.floor(Math.random() * this.#jugadores.length);
        let jugadorSeleccionado = this.#jugadores.splice(iRandom, 1)[0];
        return jugadorSeleccionado;

        }

        // Enfrentar jugadores 
        enfrentarJugadores() {
            // TODO: Hacer un bucle while(jugadoresTorneo > 1)
        }

}

// Programa principal

// Base de datos de cartas disponibles para el juego
let cartasDB = [
    // ===== CRIATURAS COMUNES (1-5 puntos) =====
    new Carta("Falfa el golfo", 1),
    new Carta("Luis el descapuchado", 1),
    new Carta("Araña Venenosa", 1),
    new Carta("Goblin Explorador", 1),
    new Carta("Murciélago Nocturno", 1),
    new Carta("Rata Gigante", 1),
    
    new Carta("Numegor el emperador", 2),
    new Carta("Chorche el cornudo", 2),
    new Carta("Esqueleto Guerrero", 2),
    new Carta("Lobo Salvaje", 2),
    new Carta("Bandido Común", 2),
    
    new Carta("Nicolas el energeticas", 3),
    new Carta("Orco Berserker", 3),
    new Carta("Soldado Novato", 3),
    
    new Carta("Periplo el poppero", 4),
    new Carta("Serpiente Víbora", 4),
    
    // ===== CRIATURAS INTERMEDIAS (6-10 puntos) =====
    new Carta("Mago de Batalla", 6),
    new Carta("Arquero Élite", 6),
    new Carta("Hechicero Oscuro", 6),
    
    new Carta("Caballero Templario", 7),
    new Carta("Ninja Sombra", 7),
    
    new Carta("Troll de las Montañas", 8),
    new Carta("Paladín Sagrado", 8),
    
    new Carta("Bárbaro Feroz", 9),
    new Carta("Vampiro Ancestral", 9),
    
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
const MAZOS_POR_JUGADOR = 3;

console.log("--- Empieza el juego de cartas ---");

// Función para mostrar todas las cartas disponibles
function mostrarCartas(cartas) {
    for (let i = 0; i < cartas.length; i++) {
        console.log(cartas[i].toString());
        
    }
}

// Crear dos jugadores y sus mazos
console.log("\n --- Creando Jugadores ---");
let jugador1 = new Jugador("Mago Supremo", MAZOS_POR_JUGADOR);
let jugador2 = new Jugador("Guerrero Sombra", MAZOS_POR_JUGADOR);

// Mostrar mazos de los jugadores
jugador1.mostrarMazos();
jugador2.mostrarMazos();

// Enfrentamiento
console.log("\n --- Comienza el duelo ---");
jugador1.enfrentarJugador(jugador2);