const API_URL = "https://fakestoreapi.com/products";
let productos = [];
let carrito = [];

// Cargar productos desde la API y almacenarlos en la variable `productos`
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL);
    productos = await respuesta.json();
    mostrarProductos(); // Muestra los productos en el catálogo
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

// Mostrar productos en el catálogo
function mostrarProductos() {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";
  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p><strong>Precio: $${producto.price}</strong></p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      <button onclick="quitarDelCarrito(${producto.id})">Quitar del carrito</button>
    `;
    catalogo.appendChild(productoDiv);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const productoEnCarrito = carrito.find((p) => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  mostrarCarrito();
}

// Quitar producto del carrito
function quitarDelCarrito(id) {
  const productoIndex = carrito.findIndex((p) => p.id === id);
  if (productoIndex > -1) {
    carrito[productoIndex].cantidad--;
    if (carrito[productoIndex].cantidad === 0) {
      carrito.splice(productoIndex, 1); // Quitar si la cantidad es cero
    }
  }
  mostrarCarrito();
}

// Mostrar carrito
function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "<h2>Carrito de Compras</h2>";

  carrito.forEach((producto) => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <p>${producto.title} - ${producto.cantidad} x $${producto.price}</p>
    `;
    carritoDiv.appendChild(itemDiv);
  });

  // Mostrar total
  const total = carrito.reduce((acc, producto) => acc + producto.price * producto.cantidad, 0);
  carritoDiv.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Simular la compra
function procesarCompra() {
  console.log("Procesando compra...");
  setTimeout(() => {
    alert("Compra completada. Gracias por su compra!");
    carrito = []; // Vacía el carrito tras la compra
    mostrarCarrito();
  }, 5000);
}

// Inicializar carga de productos
cargarProductos();