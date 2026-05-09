import type { IUser } from "../../../types/IUser";
import { saveUser } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";
import { burgerRain } from "../../../utils/animation";

(window as any).togglePass = function (inputId: string, btn: HTMLButtonElement): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
    btn.setAttribute('aria-label', 'Ocultar contraseña');
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
    btn.setAttribute('aria-label', 'Mostrar contraseña');
  }
};

document.getElementById('form-login')!.addEventListener('submit', function (e: Event) {
  e.preventDefault();

  const email = (document.getElementById('email') as HTMLInputElement).value.trim();
  const pass = (document.getElementById('password') as HTMLInputElement).value;

  if (!email || !pass) {
    alert('Por favor completá todos los campos.');
    return;
  }

  const users: { email: string; password: string }[] = JSON.parse(localStorage.getItem('users') || '[]');

  const match = users.find(u => u.email === email && u.password === pass);

  if (!match) {
    alert('El correo o la contraseña son incorrectos.');
    return;
  }

  const userData: IUser = {
    email: match.email,
    loggedIn: true,
    role: 'client',
  };

  if (match.email === 'admin@foodstore.com') {
    userData.role = 'admin';
  }

  saveUser(userData);
  navigate('/src/pages/public/home/home.html');
});

document.addEventListener('DOMContentLoaded', () => {
  burgerRain();
});