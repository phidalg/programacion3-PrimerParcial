import type { IUser } from "../../../types/IUser";
import { getUser, getCart, getTotalItems, removeFromCart } from "../../../utils/localStorage";
import { logout } from "../../../utils/auth";
import { getProducts } from "../../../data/data";

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
const cartTableBody = document.getElementById("cartTableBody") as HTMLElement | null;
const cartTotal = document.getElementById("cartTotal") as HTMLElement | null;
const checkoutButton = document.getElementById("checkoutButton") as HTMLButtonElement | null;
const cartTableFooter = document.querySelector("tfoot") as HTMLElement | null;

const storedUser = getUser();
if (storedUser && userInfoBox && userEmail && userRole && buttonLogout) {
  const parseUser = JSON.parse(storedUser) as IUser;
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

function formatPrecio(valor: number): string {
  return "$" + valor.toLocaleString("es-AR");
}

const renderCart = (): void => {
  if (!cartTableBody || !cartTotal) return;

  const cart = getCart();
  const products = getProducts();
  cartTableBody.innerHTML = "";

  if (!cart || cart.items.length === 0) {
    cartTableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; color: var(--muted);">
          El carrito está vacío.
        </td>
      </tr>
    `;
    if (cartTableFooter) cartTableFooter.hidden = true;
    updateCartBadge();
    return;
  }

  if (cartTableFooter) cartTableFooter.hidden = false;

  let totalPedido = 0;

  cart.items.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;

    const itemTotal = product.precio * item.quantity;
    totalPedido += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.imagen}" alt="${product.nombre}" style="max-width: 90px; height: auto; border-radius: 6px;"/></td>
      <td>${product.nombre}</td>
      <td>${product.descripcion}</td>
      <td>${item.quantity}</td>
      <td>${formatPrecio(product.precio)}</td>
      <td>${formatPrecio(itemTotal)}</td>
      <td><button class="btn-remove" data-id="${product.id}" style="padding: 6px 12px; background-color: #ff4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Eliminar</button></td>
    `;

    cartTableBody.appendChild(row);

    const removeButton = row.querySelector<HTMLButtonElement>(".btn-remove");
    removeButton?.addEventListener("click", () => {
      removeFromCart(product);
      renderCart();
    });
  });

  cartTotal.textContent = formatPrecio(totalPedido);
  if (checkoutButton) checkoutButton.disabled = cart.items.length === 0;
  updateCartBadge();
};

// Initial update
updateCartBadge();
renderCart();

