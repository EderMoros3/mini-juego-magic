class Carta{
	#nombre			// Nombre de la carta
	#puntos			// Puntos de ataque
	
	constructor(nombre, puntos){
		this.#nombre = nombre;
		this.#puntos = puntos;
	}
	
	getNombre(){ 
		return this.#nombre;
	}
	
	getPuntos(){
		return this.#puntos;
	}
	
	/** 
	Saca por pantalla la información de la carta
	*/
	print(){
		console.log(this.#nombre + " (" + this.#puntos + " ptos)");
	}
	
	toString(){
	    return this.#nombre + " (" + this.#puntos + " ptos)";
	}
	
	
	/**
	Determina que carta pierde el combate
	@return >0 si gana la carta sobre la que se invoca el métdodo
			=0 si es un empate
			<0 si gana la carta argumento
	*/
	fight(carta){
	    console.log (this.toString() + " VS " + carta.toString());
		return this.#puntos - carta.getPuntos();
	}
	
	render(elto){
		let string= "-------------------------------- <br>";
		string += this.getNombre() + "<br>";
		string += this.getPuntos() + "<br>";
		string += "---------------------------------- <br>";
		elto.innerHTML=string;
		
	}
	
}