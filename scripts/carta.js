/*
  Clase Carta
  - Representa una carta con nombre y puntos de ataque.
  - Provee getters, representación en texto y un método simple de combate.
  Contrato corto:
  - constructor(nombre:string, ptos:number)
  - getNombre():string, getPtos():number
  - toString():string
  - fight(otraCarta): number  (negativo = gana esta, 0 = empate, positivo = gana otra)
*/
class Carta {
    // Campos privados: nombre y puntos de ataque
    #ptos_ataque;  // Puntos de ataque de la carta
    #nombre;       // Nombre de la carta

    // Inicializa la carta con un nombre y puntos
    constructor(nombre, ptos) {
        this.#nombre = nombre;
        this.#ptos_ataque = ptos;
    }
    
    // Devuelve el nombre (lectura segura)
    getNombre() {
        return this.#nombre;
    }

    // Devuelve los puntos de ataque
    getPtos(){
        return this.#ptos_ataque;
    }

    // Imprime la carta en consola (útil para debugging)
    print() {
        console.log( this.#nombre + " {" + this.#ptos_ataque + "}");
    }

    // Representación legible de la carta
    toString() {
        return (
            "-------------------------" +
            "\n| " + this.#nombre +
            "\n| Puntos de ataque: " + this.#ptos_ataque +
            "\n-------------------------"
        )
    }

    /*
        Enfrenta esta carta contra otra.
        Retorna: <0 si gana esta, 0 empate, >0 si gana la carta pasada.
        También escribe un mensaje en consola sobre el resultado.
    */
    fight(carta) {
        let ganador;
        // Diferencia simple: puntos de la carta rival menos los de esta
        ganador = carta.getPtos() - this.#ptos_ataque;
    
        // Mensaje de resultado (debug)
        if(ganador < 0){
            console.log("Ha ganado " + this.toString());
        } else if(ganador == 0) {
            console.log("Han muerto las dos cartas");
        } else {
            console.log("Ha ganado " + carta.toString());
        }
        return ganador;
    }

    renderCarta(zona) {
        const cont = document.getElementById(zona);
        cont.innerHTML = this.toString();
    }
}