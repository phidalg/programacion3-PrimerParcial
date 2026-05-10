import type { ICart } from "../../../types/ICart";
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
}


document.getElementById('form-registro')!.addEventListener('submit', function (e: Event) {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const pass = (document.getElementById('password') as HTMLInputElement).value;
    const pass2 = (document.getElementById('password2') as HTMLInputElement).value;

    if (!email || !pass || !pass2) {
        alert('Por favor completá todos los campos.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Ingresá un correo electrónico válido.'); return;
    }
    if (pass.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.'); return;
    }
    if (pass !== pass2) {
        alert('Las contraseñas no coinciden.'); return;
    }

    const users: { email: string; password: string; cart: ICart }[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.email === email)) {
        alert('Ya existe una cuenta con ese correo.'); return;
    }

    const cart = { items: [] };

    users.push({ email, password: pass, cart });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cuenta creada con éxito. ¡Bienvenido a FoodStore!');
});

document.addEventListener('DOMContentLoaded', () => {
    burgerRain();
});