// src/models/Factura.js
class Factura {
  constructor(cliente, productos, fecha = new Date()) {
    this.cliente = cliente; // Objeto Cliente
    this.productos = productos; // Arreglo de objetos Producto
    this.fecha = fecha;
    this.total = this.calcularTotal();
  }

  calcularTotal() {
    return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }
}

export default Factura;
