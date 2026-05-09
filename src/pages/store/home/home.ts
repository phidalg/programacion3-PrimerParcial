import { getCategories, getProducts } from "../../../data/data";
import { getUser } from "../../../utils/localStorage";
import { logout } from "../../../utils/auth";

type Categoria = {
  nombre: string;
  emoji: string;
};

type Producto = {
  id: number | string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
};


const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement | null;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const userInfoBox = document.getElementById("userInfoBox") as HTMLElement | null;
const userEmail = document.getElementById("userEmail") as HTMLElement | null;
const userRole = document.getElementById("userRole") as HTMLElement | null;
const loginLink = document.getElementById("loginLink") as HTMLElement | null;

const storedUser = getUser();
if (storedUser && userInfoBox && userEmail && userRole && buttonLogout) {
  const parseUser = JSON.parse(storedUser) as { email: string; role: string };
  userEmail.textContent = parseUser.email;
  userRole.textContent = parseUser.role;
  userInfoBox.hidden = false;
  buttonLogout.hidden = false;
  if (loginLink) loginLink.hidden = true;
} else {
  if (buttonLogout) buttonLogout.hidden = true;
  if (loginLink) loginLink.hidden = false;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Formatea un número como precio en pesos argentinos.
 * Ej: 10000 → "$10.000"
 */
function formatPrecio(valor: number): string {
  return "$" + valor.toLocaleString("es-AR");
}

// ─── Categorías ──────────────────────────────────────────────────────────────

/**
 * Renderiza el listado de categorías en el <ul id="lista-categorias">.
 * La categoría "Todo" queda activa por defecto.
 */
function cargarCategorias(): void {
  const lista = document.getElementById("lista-categorias") as HTMLUListElement | null;
  if (!lista) return;

  getCategories().forEach((categoria: Categoria, index: number) => {
    // Crear elementos
    const li = document.createElement("li");
    const a  = document.createElement("a");

    // Atributos y contenido
    a.href = "#";
    if (index === 0) a.classList.add("active"); // "Todo" activo al inicio

    a.innerHTML = `<span class="cat-icon">${categoria.emoji}</span> ${categoria.nombre}`;

    // Evento: filtrar productos al hacer clic
    a.addEventListener("click", (e) => {
      e.preventDefault();

      // Actualizar clase activa
      lista.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
      a.classList.add("active");

      // Filtrar y re-renderizar productos
      const filtro: string | null = categoria.nombre === "Todo" ? null : categoria.nombre;
      cargarProductos(filtro);
    });

    // Inyectar en el DOM
    li.appendChild(a);
    lista.appendChild(li);
  });
}

// ─── Productos ───────────────────────────────────────────────────────────────

/**
 * Renderiza las tarjetas de productos en #contenedor-productos.
 * @param {string|null} categoriaFiltro - Nombre de la categoría a mostrar,
 *                                        o null / "Todo" para mostrar todo.
 */
function cargarProductos(categoriaFiltro: string | null = null): void {
  const contenedor = document.getElementById("contenedor-productos") as HTMLElement | null;
  if (!contenedor) return;
  contenedor.innerHTML = ""; // limpiar antes de re-renderizar

  const lista = categoriaFiltro
    ? getProducts().filter((p) => p.categoria === categoriaFiltro)
    : getProducts();

  // Actualizar título de sección
  const titulo = document.querySelector(".section-title");
  if (titulo) {
    titulo.textContent = categoriaFiltro ? categoriaFiltro : "Todos los productos";
  }

  // Mensaje si no hay productos en la categoría
  if (lista.length === 0) {
    contenedor.innerHTML = `<p style="color:var(--muted);grid-column:1/-1">
      No hay productos en esta categoría.
    </p>`;
    return;
  }

  lista.forEach(producto => {
    const article = document.createElement("article");
    article.classList.add("product-card");

    article.innerHTML = `
      <div class="product-img-wrap">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
      </div>
      <div class="product-info">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="product-footer">
          <strong>${formatPrecio(producto.precio)}</strong>
          <button class="btn-add" data-id="${producto.id}">+ Agregar</button>
        </div>
      </div>
    `;

    // Evento del botón "Agregar"
    const addButton = article.querySelector<HTMLButtonElement>(".btn-add");
    addButton?.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

    contenedor.appendChild(article);
  });
}

// ─── Carrito (base) ──────────────────────────────────────────────────────────

/**
 * Agrega un producto al carrito (lógica base).
 * Reemplazá esta función cuando implementes el carrito completo.
 */
function agregarAlCarrito(producto: Producto): void {
  // TODO: implementar lógica completa del carrito
  alert(`✅ "${producto.nombre}" agregado al carrito.`);
}

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  cargarCategorias();
  cargarProductos();
});