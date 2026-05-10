import { getCategories, getProducts } from "../../../data/data";
import { getUser } from "../../../utils/localStorage";
import { logout } from "../../../utils/auth";
import { addToCart, getTotalItems } from "../../../utils/localStorage";
import type { ICategory } from "../../../types/category";
import type { Product } from "../../../types/product";

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

// Update cart badge
const updateCartBadge = () => {
  const cartBadge = document.getElementById("cartBadge") as HTMLElement | null;
  if (cartBadge) {
    const totalItems = getTotalItems();
    if (totalItems > 0) {
      cartBadge.textContent = totalItems.toString();
      cartBadge.style.display = "inline-block";
    } else {
      cartBadge.style.display = "none";
    }
  }
};

// Initial update
updateCartBadge();

// ─── Estado global de filtros ────────────────────────────────────────────────

/** Categoría activa actualmente (null = todas). */
let categoriaActiva: string | null = null;

/** Texto de búsqueda activo. */
let textoBusqueda: string = "";

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Formatea un número como precio en pesos argentinos.
 * Ej: 10000 → "$10.000"
 */
function formatPrecio(valor: number): string {
  return "$" + valor.toLocaleString("es-AR");
}

// ─── Búsqueda ────────────────────────────────────────────────────────────────

/**
 * Inicializa el input de búsqueda y escucha los cambios del usuario.
 * Aplica el filtro por nombre en tiempo real (debounce de 200 ms).
 */
function iniciarBuscador(): void {
  const input = document.getElementById("buscador-productos") as HTMLInputElement | null;
  if (!input) return;

  let debounceTimer: ReturnType<typeof setTimeout>;

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      textoBusqueda = input.value.trim().toLowerCase();
      cargarProductos(categoriaActiva);
    }, 200);
  });
}

// ─── Categorías ──────────────────────────────────────────────────────────────

/**
 * Renderiza el listado de categorías en el <ul id="lista-categorias">.
 * La categoría "Todo" queda activa por defecto.
 */
function cargarCategorias(): void {
  const lista = document.getElementById("lista-categorias") as HTMLUListElement | null;
  if (!lista) return;

  // Opción "Todo" para mostrar todos los productos sin filtro de categoría.
  const todoLi = document.createElement("li");
  const todoLink = document.createElement("a");
  todoLink.href = "#";
  todoLink.classList.add("active");
  todoLink.innerHTML = `<span class="cat-icon">📝</span> Todo`;
  todoLink.addEventListener("click", (e) => {
    e.preventDefault();
    lista.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
    todoLink.classList.add("active");
    categoriaActiva = null;
    cargarProductos(categoriaActiva);
  });
  todoLi.appendChild(todoLink);
  lista.appendChild(todoLi);

  getCategories().forEach((categoria: ICategory) => {
    const li = document.createElement("li");
    const a  = document.createElement("a");
    a.href = "#";
    a.innerHTML = `<span class="cat-icon">${categoria.emoji}</span> ${categoria.nombre}`;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      lista.querySelectorAll("a").forEach((link) => link.classList.remove("active"));
      a.classList.add("active");
      categoriaActiva = categoria.nombre;
      cargarProductos(categoriaActiva);
    });
    li.appendChild(a);
    lista.appendChild(li);
  });
}

// ─── Productos ───────────────────────────────────────────────────────────────

/**
 * Renderiza las tarjetas de productos en #contenedor-productos.
 * Aplica simultáneamente el filtro de categoría y el de búsqueda por nombre.
 *
 * @param {string|null} categoriaFiltro - Nombre de la categoría a mostrar,
 *                                        o null / "Todo" para mostrar todas.
 */
function cargarProductos(categoriaFiltro: string | null = null): void {
  const contenedor = document.getElementById("contenedor-productos") as HTMLElement | null;
  if (!contenedor) return;
  contenedor.innerHTML = ""; // limpiar antes de re-renderizar

  // Filtrar por categoría
  let lista = categoriaFiltro
    ? getProducts().filter((p) => p.disponible && p.categorias.some((c) => c.nombre === categoriaFiltro))
    : getProducts().filter((p) => p.disponible);

  // Filtrar por texto de búsqueda (nombre del producto, case-insensitive)
  if (textoBusqueda) {
    lista = lista.filter((p) =>
      p.nombre.toLowerCase().includes(textoBusqueda)
    );
  }

  // Actualizar título de sección
  const titulo = document.querySelector(".section-title");
  if (titulo) {
    if (textoBusqueda) {
      titulo.textContent = `Resultados para "${textoBusqueda}"`;
    } else {
      titulo.textContent = categoriaFiltro ? categoriaFiltro : "Todos los productos";
    }
  }

  // Mensaje si no hay productos
  if (lista.length === 0) {
    contenedor.innerHTML = `<p style="color:var(--muted);grid-column:1/-1">
      No se encontraron productos${textoBusqueda ? ` para "${textoBusqueda}"` : " en esta categoría"}.
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

function agregarAlCarrito(producto: Product): void {
  if (!getUser()) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }
  addToCart(producto);
  updateCartBadge();
}

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  iniciarBuscador();
  cargarCategorias();
  cargarProductos();
});