import type { ICart } from "./ICart";
import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  loggedIn: boolean;
  role: Rol;
  cart: ICart;
}
