const productos = [{ id: 1, nombre: "DobleCheddar", precio: 7500, descripcion: "Hamburguesa con doble cheddar, lechuga, tomate, pepinillos y salsa especial.", categoria: "Hamburguesas", img: "../img/doblecheddar.png", stock: "255" },
{ id: 2, nombre: "DobleTocino", precio: 8000, descripcion: "Hamburguesa con doble tocino, lechuga, tomate, ají y salsa picante cheddar.", categoria: "Hamburguesas", img: "../img/dobleTocino.png", stock: "255" },
{ id: 3, nombre: "DibuHevos", precio: 18000, descripcion: "Hamburguesa  doble carne bien gruesa  y triple huevos, lechuga, tomate, cebolla, ají y salsa picante cheddar.", categoria: "Hamburguesas", img: "../img/h-huevo.png", stock: "255" },
{ id: 4, nombre: "Cebollona Llorona", precio: 5000, descripcion: "Hamburguesa  simple, lechuga, tomate, cebolla y tocino.", categoria: "Hamburguesas", img: "../img/simple-cebolla.png", stock: "255" },
{ id: 5, nombre: "Alucinogena", precio: 15000, descripcion: "Pizza de hongos de muy buena cosecha, vas a flashear (guiño, guiño).", categoria: "Pizzas", img: "../img/pizza-loca.png", stock: "255" },
{ id: 6, nombre: "Hot", precio: 10000, descripcion: "Pizza altamente picante, receta mexicana, imperdibleeee.", categoria: "Pizzas", img: "../img/pizza-hot.png", stock: "255" },
{ id: 7, nombre: "Vegana", precio: 6000, descripcion: "Pizza vegana, recomenda.", categoria: "Pizzas", img: "../img/pizza-vegana.png", stock: "255" },
{ id: 8, nombre: "Fanta Naranja", precio: 2000, descripcion: "Bebida sin alcohol, sabor naranja.", categoria: "Bebidas", img: "../img/fanta.png", stock: "255" },
{ id: 9, nombre: "Coca Cola", precio: 2000, descripcion: "Bebida sin alcohol, sabor cola.", categoria: "Bebidas", img: "../img/coca.png", stock: "255" },
{ id: 10, nombre: "Pack Cola", precio: 10000, descripcion: "Bebida sin alcohol, sabor cola.", categoria: "Bebidas", img: "../img/coca-pack.png", stock: "3000" },
{ id: 11, nombre: "Terno", precio: 4500, descripcion: "Bebida sin alcohol.", categoria: "Bebidas", img: "../img/pack.png", stock: "500" },
{ id: 12, nombre: "Brahama", precio: 3000, descripcion: "Bebida con alcohol de 1 lt.", categoria: "Bebidas", img: "../img/cerveza-brahma.png", stock: "255" },
{ id: 13, nombre: "Santa Fe", precio: 2800, descripcion: "Bebida con alcohol de 1 lt.", categoria: "Bebidas", img: "../img/cerveza-santafe.png", stock: "255" },
{ id: 14, nombre: "Torre", precio: 16000, descripcion: "Doble carne, huevo, tomate y cheddar.", categoria: "Hamburguesas", img: "../img/torre.png", stock: "100" },
{ id: 15, nombre: "Zombie", precio: 20000, descripcion: "30% de coción 70% cruda <br> ¿Te animas a probarla?", categoria: "Hamburguesas", img: "../img/zombie.png", stock: "10" },
{ id: 16, nombre: "Torre de Tocino", precio: 22000, descripcion: "Cuadruple medallon, queso, tocino.", categoria: "Hamburguesas", img: "../img/torreTocino.png", stock: "10" },
{ id: 17, nombre: "Nave", precio: 5000, descripcion: "Simple, cebolla, ají, cheddar.", categoria: "Hamburguesas", img: "../img/nave.png", stock: "300" },
{ id: 18, nombre: "Super Zombie", precio: 30000, descripcion: "30% de coción 70% cruda <br> ¿Te animas a probarla?", categoria: "Hamburguesas", img: "../img/superZombie.png", stock: "255" },
{ id: 19, nombre: "Mix", precio: 8000, descripcion: "50% de pollo 50% de carne, bañada en cheddar", categoria: "Hamburguesas", img: "../img/mix.png", stock: "500" },
{ id: 20, nombre: "Quilmes", precio: 1800, descripcion: "Bebida con alcohol .", categoria: "Bebidas", img: "../img/quilmes.png", stock: "1000" },
{ id: 21, nombre: "Pepsi", precio: 1500, descripcion: "Bebida sin alcohol.", categoria: "Bebidas", img: "../img/pepsi.png", stock: "2000" },
{ id: 22, nombre: "Tridente", precio: 3000, descripcion: "Bebida sin  alcohol por 3 unidades .", categoria: "Bebidas", img: "../img/tridente.png", stock: "255" },
{ id: 23, nombre: "Pepe", precio: 18000, descripcion: "Pizza de pepperoni picante", categoria: "Pizzas", img: "../img/peperoni.png", stock: "300" },
];

const contenedorProductos = document.getElementById("producto-contenedor");
let carrito = JSON.parse(localStorage.getItem("carritoAltaHambres")) || [];

if (contenedorProductos) {
    mostrarProductos(["Hamburguesas", "Pizzas", "Bebidas"]);
}

function mostrarProductos(categorias) {
    contenedorProductos.innerHTML = "";

    const productosFiltrados = productos.filter((producto) => categorias.includes(producto.categoria));

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = "<p>No hay productos en esta categoría.</p>";
        return;
    }
    productosFiltrados.forEach((producto) => {
        const nuevosProductos = document.createElement("div");
        nuevosProductos.classList.add("producto");
        nuevosProductos.innerHTML = `
                <div class="producto-tarjeta">
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Stock ${producto.stock}</p>
                <p>$${producto.precio}</p>
                <div><button class="boton" onclick="agregarCarrito(${producto.id})">Agregar</button></div>
            </div>`
        contenedorProductos.appendChild(nuevosProductos);
    });

}

function agregarCarrito(id) {
    const producto = productos.find(item => item.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (producto.stock > 0) {
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        producto.stock--
        localStorage.setItem("carritoAltaHambres", JSON.stringify(carrito));
        localStorage.setItem("productosAltas", JSON.stringify(productos));
        actualizarCarrito();
    } else {
        Swal.fire({
            title: "Sin Stock",
            text: "Elija otro producto de nuestro menú",
            icon: "warning",
        });
    }
}
function actualizarCarrito() {
    const cuentaCarrito = document.getElementById("cuenta-carrito");
    const TotalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cuentaCarrito.innerText = TotalUnidades;
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
})

function mostrarOcultar() {
    let nav = document.getElementById('nav');
    nav.classList.toggle('responsive');
}

function seleccionar() {
    document.getElementById("nav").classList = ""
    menuVisible = false
}
