
// Constantes de configuración del juego
const CARTAS_POR_MAZO = 10;  // Número de cartas por mazo
const MAZOS_POR_JUGADOR = 3; // Mazos que tendrá cada jugador por defecto
const JUGADORES_POR_PARTIDA = 2; // Número de jugadores en cada partida
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

let jugadoresDB = [
    new Jugador("Mago Supremo", MAZOS_POR_JUGADOR),
    new Jugador("Guerrero Sombra", MAZOS_POR_JUGADOR),
    new Jugador("Arquero Nocturno", MAZOS_POR_JUGADOR),
    new Jugador("Paladín de la Luz", MAZOS_POR_JUGADOR),
    new Jugador("Nigromante Oscuro", MAZOS_POR_JUGADOR),
    new Jugador("Cazador de Dragones", MAZOS_POR_JUGADOR),
    new Jugador("Señor de los Elementos", MAZOS_POR_JUGADOR),
    new Jugador("Asesino Silencioso", MAZOS_POR_JUGADOR)
  ];

let jugadores = [];






