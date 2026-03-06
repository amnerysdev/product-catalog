async function obtenerProductos(){
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok){
            throw new Error("Error al obtener los productos");
        }

        const productos = await response.json();
        
        return productos;
    }catch (error){
        console.error("Error:", error);
        return [];
    }
}

function mostrarCatalogo(productos){
    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";
    catalogo.innerHTML += `<h2 class="my-4">Catálogo de Productos</h2>`;

    const fila = document.createElement("div");
    fila.className = "row";

    productos.forEach(producto => {
        const columna  = document.createElement("div");
        columna.className = "col-md-3 mb-4";
         columna.innerHTML = `
                <div class="card h-100">
                <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text fw-bold mt-auto text-success">$${producto.price}</p>
                    <button class="btn btn-primary mt-auto w-100" onclick="mostrarDetalles(${producto.id})" data-bs-toggle="modal" data-bs-target="#modalDetalles">
                    Ver detalles
                    </button>
                </div>
                </div>
                            `;

        fila.appendChild(columna);
    });
    catalogo.appendChild(fila);
}

function mostrarOfertas(productos){
    const ofertas = document.getElementById("ofertas");
    ofertas.innerHTML = "";
    ofertas.innerHTML += `<h2 class="my-4">Ofertas Especiales</h2>`;

    const fila  = document.createElement("div");
    fila.className = "row";

    const indiceOfertas = [0, 3, 6];
   // indiceOfertas[0];
   // indiceOfertas[3];
   // indiceOfertas[6];
    const productosOfertas = indiceOfertas.map(indice => productos[indice]);

    productosOfertas.forEach(producto => {
        const columna  = document.createElement("div");
            columna.className = "col-md-4 mb-4";
            columna.innerHTML = `
                <div class="card h-100 border border-danger ">
                <img src="${producto.image}" class="card-img-top img-ofertas" alt="${producto.title}">
                <span class="badge bg-danger badge-oferta">Oferta</span>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text fw-bold mt-auto text-danger ">$${producto.price}</p>
                    <button class="btn btn-danger mt-auto w-100" onclick="mostrarDetalles(${producto.id})" data-bs-toggle="modal" data-bs-target="#modalDetalles">
                    Ver detalles
                    </button>
                </div>
                </div>
                            `;

        fila.appendChild(columna);
    });
    ofertas.appendChild(fila);
}

function mostrarCarrusel(productos) {
        const carrusel = document.getElementById("carrusel");
        carrusel.innerHTML = "";
        carrusel.innerHTML += `<h2 class="my-5">Productos destacados</h2>`;

        // Seleccionar 3 productos al azar
        const productosAleatorios = productos
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        // Crear estructura del carrusel
        const carousel = document.createElement("div");
        carousel.id = "carouselProductos";
        carousel.className = "carousel slide";
        carousel.setAttribute("data-bs-ride", "carousel");

        const inner = document.createElement("div");
        inner.className = "carousel-inner";

        // Crear slides con flexbox
        productosAleatorios.forEach((producto, index) => {
            const item = document.createElement("div");
            item.className = "carousel-item" + (index === 0 ? " active" : "");

            item.innerHTML = `
            <div class="container">
                <div class="row align-items-center justify-content-center" style="min-height:350px;">
                    
                    <div class="col-md-6 text-center">
                        <img src="${producto.image}" 
                            class="img-fluid" 
                            alt="${producto.title}" 
                            style="max-height:250px;">
                    </div>

                    <div class="col-md-6 text-md-start text-center">
                        <h4>${producto.title}</h4>
                        <p class="text-primary fs-4 fw-bold">$${producto.price}</p>

                        <button class="btn btn-primary"
                                onclick="mostrarDetalles(${producto.id})"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDetalles">
                            Ver Más Detalles
                        </button>
                    </div>

                </div>
            </div>
        `;

            inner.appendChild(item);
        });

        // Controles del carrusel
        const prevBtn = `
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselProductos" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            </button>
        `;
        const nextBtn = `
            <button class="carousel-control-next" type="button" data-bs-target="#carouselProductos" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
            </button>
        `;

        carousel.appendChild(inner);
        carousel.insertAdjacentHTML("beforeend", prevBtn + nextBtn);

        carrusel.appendChild(carousel);
}


async function mostrarDetalles(idProducto){
    try{
        const producto = await fetch("https://fakestoreapi.com/products/" + idProducto);

        if (!producto.ok){
            throw new Error("Error al obtener los detalles del producto");
        }
         
        const detalles = await producto.json();

        const modalDetalles = document.getElementById("modalDetalles");
        modalDetalles.innerHTML = "";
        modalDetalles.innerHTML = `
             <div class="modal-dialog">
                 <div class="modal-content">
                     <div class="modal-header">
                         <h5 class="modal-title">Detalles del Producto</h5>
                         <button type="button" class="btn-close" data-bs-dismiss="modal"></button>

                     </div>
                  <div class="modal-body">
                        <img src="${detalles.image}" class="card-img-top" alt="${detalles.title}">
                        <h5 class="fw-bold">Nombre del producto: ${detalles.title}</h5>
                        <p><strong>Descripción:</strong> ${detalles.description}</p>
                        <p class="text-muted"><strong>Categoría:</strong> ${detalles.category}</p>
                        <p class="fw-bold text-success"><strong>Precio:</strong> $${detalles.price}</p>
                        <p class="text-muted"><strong>Calificación:</strong> ${detalles.rating.rate}</p>
                  </div>
            </div>
        </div>`;
    
    }
    catch (error){
        console.error("Error al mostrar detalles:", error);
    }
}

document.addEventListener("DOMContentLoaded", inicializar);

async function inicializar(){
    try{ 
        const productos = await obtenerProductos();
        mostrarCatalogo(productos);
        mostrarOfertas(productos);
        mostrarCarrusel(productos);

    }catch (error){
        console.error("Error al inicializar la tienda:", error);
    }

    
}

inicializar();