// URL de la API
const API_URL = "https://fakestoreapi.com/products";

// Función para cargar los productos
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL); // Realiza la solicitud
    if (!respuesta.ok) {
      throw new Error("Error al obtener los productos");
    }
    const productos = await respuesta.json(); // Convierte la respuesta a JSON

    mostrarProductos(productos); // Llama a la función para mostrarlos en el DOM
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = ""; // Limpia el contenedor del catálogo

  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    productoDiv.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>${producto.description.slice(0, 10000)}</p>
      <p><strong>Precio: $${producto.price}</strong></p>
    `;

    catalogo.appendChild(productoDiv); // Añade cada producto al catálogo
  });
}

// Llamada para cargar los productos al iniciar la página
cargarProductos();