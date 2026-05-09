import type { IUser } from "../../../types/IUser";
import { getUser } from "../../../utils/localStorage";
import { logout } from "../../../utils/auth";
import { guard } from "../../../main";
import { getProducts, type Producto } from "../../../data/data";

guard();

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const userInfoBox = document.getElementById("userInfoBox") as HTMLElement | null;
const userEmail = document.getElementById("userEmail") as HTMLElement | null;
const userRole = document.getElementById("userRole") as HTMLElement | null;
const productsTableBody = document.getElementById(
  "productsTableBody"
) as HTMLTableSectionElement | null;

const storedUser = getUser();
if (storedUser && userInfoBox && userEmail && userRole) {
  const parseUser = JSON.parse(storedUser) as IUser;
  userEmail.textContent = parseUser.email;
  userRole.textContent = parseUser.role;
  userInfoBox.hidden = false;
}

function formatPrecio(valor: number): string {
  return `$${valor.toLocaleString("es-AR")}`;
}

function stockClass(stock: number): string {
  if (stock <= 2) return "stock-critical";
  if (stock <= 7) return "stock-low";
  return "stock-ok";
}

function renderProducts(): void {
  if (!productsTableBody) return;

  productsTableBody.innerHTML = "";

  getProducts().forEach((producto: Producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="id-cell">#${producto.id.toString().padStart(3, "0")}</td>
      <td class="img-cell">
        <img src="${producto.imagen}" alt="${producto.nombre}" />
      </td>
      <td class="name-cell">${producto.nombre}</td>
      <td><span class="category-tag">${categoriaEmoji(producto.categoria)} ${producto.categoria}</span></td>
      <td class="price-cell">${formatPrecio(producto.precio)}</td>
      <td><span class="${stockClass(producto.stock)}">${producto.stock} unidades</span></td>
      <td>
        <div class="actions-cell">
          <a href="#" class="btn-edit">Editar</a>
          <a href="#" class="btn-del">Eliminar</a>
        </div>
      </td>
    `;
    productsTableBody.append(row);
  });
}

function categoriaEmoji(categoria: string): string {
  const mapa: Record<string, string> = {
    Hamburguesas: "🍔",
    Pizzas: "🍕",
    Bebidas: "🍺",
    "Papas Fritas": "🍟",
    Tacos: "🌮",
    Postres: "🍰",
    Ensaladas: "🥗",
  };
  return mapa[categoria] ?? "🍽️";
}

renderProducts();

