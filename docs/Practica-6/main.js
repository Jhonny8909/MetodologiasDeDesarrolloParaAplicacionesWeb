// Productos disponibles
let productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalones", precio: 25, stock: 8 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Sombrero", precio: 10, stock: 20 },
  ];
  
  // Carrito de compras
  let carrito = [];
  
  // Mostrar productos en la tienda
  function mostrarProductos() {
    const productosLista = document.getElementById('productos-lista');
    productosLista.innerHTML = ''; // Limpiar la lista
  
    productos.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
        <span>${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})</span>
        <button onclick="agregarAlCarrito(${index})">+</button>
        <button onclick="eliminarDelCarrito(${index})">-</button>
      `;
      productosLista.appendChild(productoDiv);
    });
  }
  
  // Actualizar carrito
  function mostrarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const totalDiv = document.getElementById('total');
    carritoLista.innerHTML = ''; // Limpiar carrito
  
    let total = 0;
  
    carrito.forEach((item) => {
      const carritoItem = document.createElement('div');
      carritoItem.classList.add('item-carrito');
      carritoItem.innerHTML = `
        <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
      `;
      carritoLista.appendChild(carritoItem);
      total += item.precio * item.cantidad;
    });
  
    totalDiv.innerText = `Total: $${total}`;
  }
  
  // Agregar producto al carrito
  function agregarAlCarrito(index) {
    const producto = productos[index];
    if (producto.stock > 0) {
      const itemEnCarrito = carrito.find(item => item.nombre === producto.nombre);
      if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
      } else {
        carrito.push({
          nombre: producto.nombre,
          cantidad: 1,
          precio: producto.precio
        });
      }
      producto.stock--;
    } else {
      alert('No hay suficiente stock');
    }
    mostrarProductos();
    mostrarCarrito();
  }
  
  // Eliminar producto del carrito
  function eliminarDelCarrito(index) {
    const producto = productos[index];
    const itemEnCarrito = carrito.find(item => item.nombre === producto.nombre);
  
    if (itemEnCarrito) {
      if (itemEnCarrito.cantidad > 1) {
        itemEnCarrito.cantidad--;
      } else {
        carrito = carrito.filter(item => item.nombre !== producto.nombre);
      }
      producto.stock++;
    }
  
    mostrarProductos();
    mostrarCarrito();
  }
  
  // Procesar la compra con un loader de 5 segundos
  function procesarCompra() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';  // Mostrar loader
    setTimeout(() => {
      loader.style.display = 'none'; // Ocultar loader después de 5s
      alert('Compra completada');
      carrito = []; // Vaciar carrito
      mostrarProductos();
      mostrarCarrito();
    }, 5000);
  }
  
  // Inicializar tienda
  document.getElementById('procesarCompra').addEventListener('click', procesarCompra);
  mostrarProductos();
  mostrarCarrito();