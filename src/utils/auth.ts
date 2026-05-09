import type { IUser } from "../types/IUser";
import type { Rol } from "../types/Rol";
import { getUser, removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const checkAuthUser = (
  redireccion: string,
  rol: Rol
) => {

  const user = getUser();

  if (!user) {
    navigate(redireccion);
    return;
  } else {
    const parseUser: IUser = JSON.parse(user);
    if (parseUser.role !== rol) {
      alert("No tienes autorización para acceder a esta página.");
      navigate(redireccion);
      return;
    }
  }
};

export const logout = () => {
  removeUser();
  window.location.reload();
};
