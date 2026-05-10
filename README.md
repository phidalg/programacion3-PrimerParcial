# Primer parcial de Programación III

Estudiante: Pedro Hidalgo - pedro.hidalgo@tupad.utn.edu.ar
Este proyecto es una continuación del Trabajo Práctico 4 (https://github.com/phidalg/Programacion3-TP4). Se agrega una barra de búsqueda de productos y se implementa el carrito de compras con persistencia en el local storage.

## Demostración de la protección de rutas:

La sección "Panel Admin" solo puede verse si se ha logueado con un usuario de tipo admin.

La página de cliente, a la que se accede desde los botones "Carrito" y "Mis Pedidos", solo puede verse si se ha logueado con un usuario de tipo client.

La página de registro de usuario asignará el rol admin al registrarse con el mail **admin@foodstore.com**

## Demostración del carrito de compras:

Puede registrarse con un usuario y guardar productos en el carrito, luego cerrar sesión e ingresar con otro usuario y guardar otros productos.
Al volver a ingresar con el primer usuario, se puede observar que sus productos siguen en el carrito.

---

## Estructura del Proyecto

```
/
├── assets/                         # Activos estáticos usados por la app
├── public/                         # Archivos públicos servidos directamente
├── src/
│   ├── css/                        # Estilos principales
│   │   └── styles.css
│   ├── data/                       # Datos de productos
│   │   ├── data.ts
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
│   │   └── store/
│   │       ├── cart/
│   │       │   ├── cart.html       # Página del carrito
│   │       │   └── cart.ts
│   │       └── home/
│   │           ├── home.html       # Página principal de la tienda
│   │           └── home.ts
│   ├── types/                      # Define interfaces y tipos
│   │   ├── category.ts
│   │   ├── ICart.ts
│   │   ├── ICartItem.ts
│   │   ├── IUser.ts
│   │   ├── product.ts
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
├── tsconfig.json                   # Configuración de TypeScript
├── vite.config.ts                  # Configuración de Vite
└── README.md                       # Este archivo
```
