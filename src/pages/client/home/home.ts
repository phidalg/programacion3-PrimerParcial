import type { IUser } from "../../../types/IUser";
import { getUser } from "../../../utils/localStorage";
import { logout } from "../../../utils/auth";
import { getTotalItems } from "../../../utils/localStorage";

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

// Initial update
updateCartBadge();

