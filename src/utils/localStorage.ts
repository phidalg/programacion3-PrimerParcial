import type { IUser } from "../types/IUser";
import type { ICart } from "../types/ICart";
import type { Product } from "../types/product";

export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUser = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};

export const addToCart = (product: Product) => {
  const userData = getUser();
  if (!userData) return; 

  const user: IUser = JSON.parse(userData);
  const existingItem = user.cart.items.find(item => item.productId === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    user.cart.items.push({ productId: product.id, quantity: 1 });
  }

  saveUser(user);
  persistUserCart();
};

export const removeFromCart = (product: Product) => {
  const userData = getUser();
  if (!userData) return;

  const user: IUser = JSON.parse(userData);
  const itemIndex = user.cart.items.findIndex(item => item.productId === product.id);

  if (itemIndex !== -1) {
    const item = user.cart.items[itemIndex];
    item.quantity -= 1;
    if (item.quantity <= 0) {
      user.cart.items.splice(itemIndex, 1);
    }
    saveUser(user);
    persistUserCart();
  }
};

export const persistUserCart = () => {
  const userData = getUser();
  if (!userData) return;

  const user: IUser = JSON.parse(userData);
  const users: { email: string; password: string; cart: ICart }[] = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex(u => u.email === user.email);

  if (userIndex !== -1) {
    users[userIndex].cart = user.cart;
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const getCart = (): ICart | null => {
  const userData = getUser();
  if (!userData) return null;

  const user: IUser = JSON.parse(userData);
  return user.cart;
};

export const getTotalItems = (): number => {
  const cart = getCart();
  if (!cart) return 0;
  return cart.items.reduce((total, item) => total + item.quantity, 0);
};

