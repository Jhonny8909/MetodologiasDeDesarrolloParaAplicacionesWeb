// Instrucción 1
let productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalones", precio: 25, stock: 8 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Sombrero", precio: 10, stock: 20 },
  ];
  
  // Instrucción 2
  let carrito = [];
  
  function agregarAlCarrito(productoNombre, cantidad) {
    for (let producto of productos) {
      if (producto.nombre === productoNombre) {
        if (producto.stock >= cantidad) {
          let itemEnCarrito = carrito.find((item) => item.nombre === productoNombre);
          if (itemEnCarrito) {
            itemEnCarrito.cantidad += cantidad;
          } else {
            carrito.push({
              nombre: productoNombre,
              cantidad: cantidad,
              precio: producto.precio,
            });
          }
          producto.stock -= cantidad;
          console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
        } else {
          console.error(`No hay suficiente stock de ${productoNombre}`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no existe.`);
  }
  
  // Reto adicional 1
  function eliminarDelCarrito(productoNombre, cantidad) {
    for (let i = 0; i < carrito.length; i++) {
      let producto = carrito[i];
      if (producto.nombre === productoNombre) {
        if (producto.cantidad >= cantidad) {
          producto.cantidad -= cantidad;
          if (producto.cantidad === 0) {
            carrito.splice(i, 1);
          }
          console.info(`${cantidad} ${productoNombre}(s) eliminado(s) del carrito`);
        } else {
          console.error(`Solo hay ${producto.cantidad} ${productoNombre}(s) en el carrito`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no existe en el carrito.`);
  }
  
  // Instrucción 3
  function calcularTotal() {
    let total = 0;
    for (let item of carrito) {
      total += item.precio * item.cantidad;
    }
    return total;
  }
  
  // Instrucción 4
  function aplicarDescuento(total) {
    if (total > 100) {
      // Aplica un 10% de descuento
      return total * 0.9;
    }
    return total;
  }
  
  // Instrucción 5
  function procesarCompra() {
    console.log("Procesando compra...");
    setTimeout(function () {
      let total = calcularTotal();
      total = aplicarDescuento(total);
      console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    }, 3000);
  }

  // Reto adicional 2
  function mostrarTiempoRestante(segundos) {
    let contador = segundos;
  
    let intervalo = setInterval(() => {
      if (contador > 0) {
        console.log(`Compra confirmada en ${contador}...`);
        contador--;
      } else {
        clearInterval(intervalo);
        console.log("Compra confirmada.");
        let total = calcularTotal();
        total = aplicarDescuento(total);
        console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
      }
    }, 1000);
  }
  
  // Instrucción 6
  agregarAlCarrito("Pantalones", 3);
  agregarAlCarrito("Pantalones", 4);
  agregarAlCarrito("Pantalones", 4);
  agregarAlCarrito("Zapatos", 2);
  agregarAlCarrito("Camisetas", 3); 
  agregarAlCarrito("Camiseta", 3);
  agregarAlCarrito("Pantalones", 2);
  console.log(carrito);
  eliminarDelCarrito("Pantalones", 8);
  console.log(carrito);
  
  //procesarCompra();
  mostrarTiempoRestante(3);