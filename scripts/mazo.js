class Mazo {
  #cartas; // Colección de cartas del mazo
  #numeroCartas; // Numero de cartas del mazo
  #nombre; // Identificador del mazo
  #propietario; // Nombre del jugador que posee el mazo

  constructor(nombre, numeroCartas) {
    this.#nombre = nombre;
    this.#numeroCartas = numeroCartas;
    this.#cartas = [];
    this.#propietario = "";
  }

  /**
   * Devuelve el identificador del mazo
   */
  getNombre() {
    return this.#nombre;
  }

  getNumeroCartas() {
    return this.#cartas.length();
  }

  /**
	Establece el propietario del mazo
	*/
  setPropietario(nombreJugador) {
    this.#propietario = nombreJugador;
  }

  getPropietario() {
    return this.#propietario;
  }

  /**
   * Saca la primera carta del mazo
   */
  sacarCarta() {
    if (this.#cartas.length > 0) {
      return this.#cartas.shift();
    } else {
      return null;
    }
  }

  /**
   * Introduce una carta en la parte inferior del mazo
   */
  devolverCarta(carta) {
    this.#cartas.push(carta);
  }

  cartasRestantes() {
    return this.#cartas.length;
  }

  /**
   * Devuelve false si quedan cartas en el mazo, true si el mazo no contiene cartas
   */
  estaVacio() {
    return this.#cartas.length === 0;
  }

  /**
   * Devuelve una copia del mazo
   */

  copy() {
    let copia = new Mazo(this.#nombre, this.#numeroCartas);
    for (let i = 0; i < this.#cartas.length; i++) {
      copia.devolverCarta(this.#cartas[i]);
    }

    return copia;
  }

  /**
   * Muestra el contenido del mazo
   */
  print() {
    console.log("--------- " + this.getNombre() + " ---------");

    for (let i = 0; i < this.#cartas.length; i++) {
      console.log(this.#cartas[i].toString());
    }

    console.log("--------- FIN ---------");
  }

  /*
	Métodos para dibujar el mazo en pantalla
	*/
  render(zone) {
    let str = "/----------------\\\n";
    str += "|////////////////|\n";
    str += "|////////////////|\n";
    str += "|////////////////|\n";
    str += "|////////////////|\n";
    str += "|////////////////|\n";
    str += "|////////////////|\n";
    str += "\\----------------/\n";

    zone.innerText = str;
    return;
  }
}
