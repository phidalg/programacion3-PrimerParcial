import burguerImage from "../../assets/burguer.jpg";
import pizzaImage from "../../assets/pizza.jpg";
import coronaImage from "../../assets/corona.jpg";
import papasImage from "../../assets/papas.jpg";
import tacosImage from "../../assets/tacos.jpg";
import tiramisuImage from "../../assets/tiramisu.jpg";

export type Categoria = {
  nombre: string;
  emoji: string;
};

export type Producto = {
  id: number | string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  stock: number;
};

const categorias = [
    {
        "nombre": "Todo",
        "emoji": "🍽️"
    },
    {
        "nombre": "Pizzas",
        "emoji": "🍕"
    },
    {
        "nombre": "Hamburguesas",
        "emoji": "🍔"
    },
    {
        "nombre": "Papas Fritas",
        "emoji": "🍟"
    },
    {
        "nombre": "Ensaladas",
        "emoji": "🥗"
    },
    {
        "nombre": "Postres",
        "emoji": "🍰"
    },
    {
        "nombre": "Bebidas",
        "emoji": "🍺"
    }
];

export function getCategories(): Categoria[] {
  return categorias.map((categoria) => ({ ...categoria }));
}

const productos = [
  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    descripcion: "Carne angus, lechuga, tomate, pickles y nuestra salsa secreta en pan brioche tostado. Incluye papas regulares.",
    precio: 10000,
    categoria: "Hamburguesas",
    imagen: burguerImage,
    stock: 42
  },
  {
    id: 2,
    nombre: "Pizza Margherita",
    descripcion: "Salsa de tomate artesanal, mozzarella fresca y hojas de albahaca. Masa fina y crocante.",
    precio: 12500,
    categoria: "Pizzas",
    imagen: pizzaImage,
    stock: 18
  },
  {
    id: 3,
    nombre: "Cerveza Corona",
    descripcion: "Cerveza Corona 710 CC.",
    precio: 7000,
    categoria: "Bebidas",
    imagen: coronaImage,
    stock: 5
  },
  {
    id: 4,
    nombre: "Papas Regulares",
    descripcion: "Papas fritas tamaño regular.",
    precio: 3000,
    categoria: "Papas Fritas",
    imagen: papasImage,
    stock: 30
  },
  {
    id: 5,
    nombre: "Tacos de Pollo",
    descripcion: "Tortillas de maíz, pollo a la plancha, guacamole, salsa pico de gallo.",
    precio: 11000,
    categoria: "Tacos",
    imagen: tacosImage,
    stock: 2
  },
  {
    id: 6,
    nombre: "Tiramisú",
    descripcion: "Postre italiano tradicional con crema de mascarpone y café.",
    precio: 8000,
    categoria: "Postres",
    imagen: tiramisuImage,
    stock: 7
  }
];

export function getProducts(): Producto[] {
  return productos.map((producto) => ({ ...producto }));
}
