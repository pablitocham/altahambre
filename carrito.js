const productosCarrito = document.getElementById("productos-carrito");
const preciofinal = document.getElementById("subTotal");
const unidades = document.getElementById("unidades");

let carrito = JSON.parse(localStorage.getItem("carritoAltaHambres")) || [];
let productos = JSON.parse(localStorage.getItem("productosAltas")) || [];

function mostrarCarrito() {
    productosCarrito.innerHTML = "";

    if (carrito.length > 0) {
        carrito.forEach(producto => {
            const productoCarrito = document.createElement("div");
            productoCarrito.classList.add("productos-carrito");
            productoCarrito.innerHTML = ` 
            <div class="producto-tarjeta-carrito">
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Stock ${producto.stock}</p>
                <p>Precio: $${producto.precio}</p>
                <div class="btn">
                <button onclick="modificarCantidad(${producto.id}, 1)">+</button>
                <button onclick="modificarCantidad(${producto.id}, -1)">-</button>
                </div>
            </div>`;
            productosCarrito.appendChild(productoCarrito);
        });
    } else {
        productosCarrito.innerHTML = `<p class="text">El carrito está vacío.</p>`;
    }

    actualizarTotales();
}

function modificarCantidad(id, cantidad) {
    const producto = carrito.find(item => item.id === id);
    const productoAmodificar = productos.find(item => item.id === id);

    if (producto && productoAmodificar) {

        if (cantidad > 0 && productoAmodificar.stock < cantidad) {
            Swal.fire({
                title: "Sin Stock",
                text: "Elija otro producto de nuestro menú",
                icon: "warning",
            });
            return
        }

        producto.cantidad += cantidad
        if (producto.cantidad < 0) {
            carrito = carrito.filter(item => item.id !== id);
        } else {
            productoAmodificar.stock -= cantidad;
        }

        actualizarLocalStorage();
        mostrarCarrito();
        actualizarCarrito();
    }
}

document.getElementById("confirmar").addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: "Compra Confirmada",
            text: "Gracias por su compra",
            icon: "success",
            confirmButtonText: "Aceptar",
           
        }).then (() => {
            carrito = [];
            actualizarLocalStorage();
            mostrarCarrito();
            actualizarCarrito();
            window.location.href = "index.html";
    })
    } else {
        Swal.fire({
            title: "Sin Productos",
            text: "Debe agregar productos de nuestro menú",
            icon: "warning",
        });
    }
});

document.getElementById("reiniciar").addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: "Reiniciar Carrito",
            text: "¿Está seguro que desea reiniciar el pedido?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, deseo reiniciar el pedido",
            cancelButtonText: "Cancelar",
        }).then((result)=>{
            if(result.isConfirmed){
                carrito.forEach(producto => {
                    const productoAmodificar = productos.find(item => item.id === producto.id);
                    if (productoAmodificar) {
                        productoAmodificar.stock += producto.cantidad;
                    }
                });
                carrito = [];
                actualizarLocalStorage();
                mostrarCarrito();
                actualizarCarrito();

                swal.fire({
                    title: "Pedido Reiniciado",
                    text: "El pedido ha sido reiniciado correctamente",
                    icon: "success",
                })
            }
        })

    } else {
        Swal.fire({
            title: "Carrito Vacío",
            text: "Debe agregar productos de nuestro menú",
            icon: "warning",
        });
    }
});

function actualizarTotales() {
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrecio = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    unidades.innerText = totalUnidades;
    preciofinal.innerText = `$${totalPrecio}`;
}

function actualizarCarrito() {
    const cuentaCarrito = document.getElementById("cuenta-carrito");
    const TotalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cuentaCarrito.innerText = TotalUnidades;
}

function actualizarLocalStorage() {
    localStorage.setItem("carritoAltaHambres", JSON.stringify(carrito));
    localStorage.setItem("productosAltas", JSON.stringify(productos));
}

mostrarCarrito();
actualizarCarrito();
