const NUM_MAZOS = 3
const NUM_PLAYERS = 2;
const CARTAS_POR_MAZO = 10;
const playersNames = ["Pablo el demonio", "Pedro el mago", "Jose el sabio", "Federico el cocas"]
const deckNames = ["Esqueletos tenebrosos", "Magos arcanos", "Zombies corruptos", "Perros toxicomanos"]
let cartaJugador1;
let cartaJugador2;
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


window.addEventListener('load', initGUI);


function createPlayer() {
  const nombre = playersNames[Math.floor(Math.random() * playersNames.length)];
  const jugador = new Jugador(nombre);
  // Crear y añadir mazos al jugador
  for (let i = 0; i < NUM_MAZOS; i++) {
    const mazo = createMazo();
    jugador.addMazo(mazo);
  }

  return jugador;
}

function createMazo() {
  // Crear un mazo con un nombre elegido aleatoriamente del array deckNames
  const nombre = deckNames[Math.floor(Math.random() * deckNames.length)];
  const mazo = new Mazo(nombre, CARTAS_POR_MAZO);
  // Rellenar el mazo con cartas aleatorias (añadimos CARTAS_POR_MAZO cartas)
  for (let i = 0; i < CARTAS_POR_MAZO; i++) {
    const cartaIdx = Math.floor(Math.random() * cartasDB.length);
    // original usaba un índice; mantenemos el mismo comportamiento
    mazo.devolverCarta(cartasDB[cartaIdx]);
  }
  return mazo;
}

function fightCards() {
  let resultado = cartaJugador1.fight(cartaJugador2);

  if (resultado > 0) {
    console.log("Ha ganado la carta " + cartaJugador1);
    return cartaJugador1;
  } else if (resultado === 0) {
    console.log("Han empatado");
    return null;
  } else {
    console.log("Ha ganado la carta " + cartaJugador2);
    return cartaJugador2;
  }

}

function initGUI() {

  const player0info = document.getElementById('player0-info');
  const player1info = document.getElementById('player1-info');

  const player0deck = document.getElementById('player0-deck');
  const player1deck = document.getElementById('player1-deck');

  const buttonPlayer0 = document.getElementById('button-player0-zone');
  const buttonPlayer1 = document.getElementById('button-player1-zone');
  const buttonFight = document.getElementById('button-fight');

  const player0card = document.getElementById('player0-card');
  const player1card = document.getElementById('player1-card');

  const resultFight = document.getElementById('results');

  let jugador1 = createPlayer()
  jugador1.render(player0info);

  let jugador2 = createPlayer()
  jugador2.render(player1info);

  let mazoJugador1 = jugador1.getMazoElegido();
  mazoJugador1.render(player0deck);

  let mazoJugador2 = jugador2.getMazoElegido();
  mazoJugador2.render(player1deck);

  cartaJugador1 = null;
  cartaJugador2 = null;

  buttonPlayer0.addEventListener('click', function() {
    if (cartaJugador1 === null) {
      cartaJugador1 = mazoJugador1.sacarCarta();

      console.log(jugador1.getNombre() + " saca carta: " + cartaJugador1.getNombre());
      cartaJugador1.render(player0card);
    }
  });

  buttonPlayer1.addEventListener('click', function() {
    if (cartaJugador2 === null) {
      cartaJugador2 = jugador2.sacarCarta();


      console.log(jugador2.getNombre() + " saca carta: " + cartaJugador2.getNombre());
      cartaJugador2.render(player1card);
    }
  });

  buttonFight.addEventListener('click', fightCards);

}