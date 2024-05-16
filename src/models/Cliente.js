class Cliente {
  constructor(nombre, apellido, dni, tipo, descuento = 0, card = false, limit = 0) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.tipo = tipo;
    this.descuento = descuento;
    this.card = card;
    this.limit = limit;
  }
}

export default Cliente;
