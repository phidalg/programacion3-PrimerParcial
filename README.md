# Trabajo Práctico 4 de Programación III

Estudiante: Pedro Hidalgo - pedro.hidalgo@tupad.utn.edu.ar
Este proyecto es un fork del proyecto "Protección de Rutas" https://github.com/chiro45/proteger_rutas del profesor Luciano Chiroli.

## Demostración de la protección de rutas:

La sección "Panel Admin" solo puede verse si se ha logueado con un usuario de tipo admin.

La página de cliente, a la que se accede desde los botones "Carrito" y "Mis Pedidos" solo puede verse si se ha logueado con un usuario de tipo client

La página de registro de usuario asignará el rol admin al registrarse con el mail **admin@foodstore.com**

---

## Estructura del Proyecto

```
/
├── assets/                         # Activos estáticos usados por la app
├── public/                         # Archivos públicos servidos directamente
├── src/
│   ├── css/                        # Estilos principales
│   │   └── styles.css
│   ├── pages/                      # Contiene las páginas de la aplicación
│   │   ├── admin/
│   │   │   └── home/
│   │   │       ├── home.html       # Panel de administración
│   │   │       └── home.ts
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.html      # Página de inicio de sesión
│   │   │   │   └── login.ts
│   │   │   └── registro/
│   │   │       ├── registro.html   # Página de registro de usuarios
│   │   │       └── registro.ts
│   │   ├── client/
│   │   │   └── home/
│   │   │       ├── home.html       # Página privada del cliente 
│   │   │       └── home.ts
│   │   └── public/
│   │       └── home/
│   │           ├── data.ts         # Datos de los productos
│   │           ├── home.html       # Página principal de la tienda
│   │           └── home.ts
│   ├── types/                      # Define interfaces y tipos
│   │   ├── IUser.ts
│   │   └── Rol.ts
│   ├── utils/                      # Lógica reutilizable
│   │   ├── animation.ts
│   │   ├── auth.ts
│   │   ├── localStorage.ts
│   │   └── navigate.ts
│   ├── main.ts                     # Entrada principal de Vite
│   └── vite-env.d.ts               # Tipos globales de Vite
├── index.html                      # Documento HTML principal
├── package.json                    # Dependencias y scripts
├── pnpm-lock.yaml                  # Lockfile de pnpm
├── tsconfig.json                   # Configuración de TypeScript
├── vite.config.ts                  # Configuración de Vite
└── README.md                       # Este archivo
```
