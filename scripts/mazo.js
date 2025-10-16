/*
  Clase Mazo
  - Representa un conjunto (array) de cartas tomado de la base `cartasDB`.
  - Genera mazos aleatorios sin duplicados y permite simular peleas entre mazos.
  Contrato corto:
  - constructor(nombre:string)
  - getNombre():string, getMazo():Carta[]
  - generarMazo():Carta[]  (aleatorio, sin repeticiones)
  - printMazo():void
  - peleaMazos(otroMazo, report=console.log):{puntos1,puntos2,ganador}
*/
class Mazo{
    // Campos privados: nombre y array de cartas
    #nombre;  // Nombre identificativo del mazo
    #mazo;    // Array que contiene las cartas del mazo
    
    // Crea un mazo y lo poblamos con cartas aleatorias únicas
    constructor (nombre) {
        this.#nombre = nombre;
        this.#mazo = this.generarMazo();
    }
    
    // Getters simples
    getNombre() { return this.#nombre; }
    getMazo() { return this.#mazo; }
    
    // Genera un mazo aleatorio seleccionando cartas de `cartasDB` sin duplicados
    generarMazo(){
        let mazoGenerado = [];
        
        // Repetir hasta completar el número de cartas configurado
        while(mazoGenerado.length < CARTAS_POR_MAZO){
            let numRandom = Math.floor(Math.random() * cartasDB.length);
            let cartaSeleccionada = cartasDB[numRandom];
            
            // Evitar duplicados por referencia
            if (!mazoGenerado.includes(cartaSeleccionada)) {
                mazoGenerado.push(cartaSeleccionada);
            }
        }
        
        return mazoGenerado;
    }
    
    // Debug: imprimir todas las cartas del mazo en consola
    printMazo() {
        console.log(`Mazo: ${this.#nombre}`);
        for (let i = 0; i < this.#mazo.length; i++) {
            console.log(` ${i + 1}. ${this.#mazo[i].toString()}`);
        }
    }
    
    /*
      Simula una pelea carta a carta entre este mazo y `otroMazo`.
      - report: función para recibir las líneas de salida (por defecto console.log).
      - Devuelve objeto con puntos y ganador.
      Nota: compara cartas por índice y utiliza Carta.fight para decidir cada ronda.
    */
    peleaMazos(otroMazo, report = console.log) {
        report(`\n--- Pelea entre ${this.#nombre} y ${otroMazo.getNombre()} ---`);
        
        let puntos1 = 0;
        let puntos2 = 0;
        
        // Recorre hasta la longitud mínima entre ambos mazos
        for (let i = 0; i < Math.min(this.#mazo.length, otroMazo.getMazo().length); i++) {
            report(`\nRonda ${i + 1}:`);
            report(`Carta del ${this.#nombre}: ${this.#mazo[i].toString()}`);
            report(`vs`);
            report(`Carta del ${otroMazo.getNombre()}: ${otroMazo.getMazo()[i].toString()}`);
            
            // Resultado numérico del enfrentamiento entre dos cartas
            let resultado = this.#mazo[i].fight(otroMazo.getMazo()[i]);
            
            if (resultado < 0) {
                puntos1++;
            } else if (resultado > 0) {
                puntos2++;
            }
        }
        
        // Resumen y determinación del ganador
        report(`\n---Resultado Final---`);
        report(`Puntos del ${this.#nombre}: ${puntos1}`);
        report(`Puntos del ${otroMazo.getNombre()}: ${puntos2}`);
        
        let ganador = "Empate";
        if (puntos1 > puntos2) ganador = this.#nombre;
        else if (puntos2 > puntos1) ganador = otroMazo.getNombre();
        report(`Ganador: ${ganador}`);

        return { puntos1, puntos2, ganador };
    }
}
