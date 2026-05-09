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
};

export const categorias = [
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

export const productos = [
  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    descripcion: "Carne angus, lechuga, tomate, pickles y nuestra salsa secreta en pan brioche tostado. Incluye papas regulares.",
    precio: 10000,
    categoria: "Hamburguesas",
    imagen: burguerImage
  },
  {
    id: 2,
    nombre: "Pizza Margherita",
    descripcion: "Salsa de tomate artesanal, mozzarella fresca y hojas de albahaca. Masa fina y crocante.",
    precio: 12500,
    categoria: "Pizzas",
    imagen: pizzaImage
  },
  {
    id: 3,
    nombre: "Cerveza Corona",
    descripcion: "Cerveza Corona 710 CC.",
    precio: 7000,
    categoria: "Bebidas",
    imagen: coronaImage
  },
  {
    id: 4,
    nombre: "Papas Regulares",
    descripcion: "Papas fritas tamaño regular.",
    precio: 3000,
    categoria: "Papas Fritas",
    imagen: papasImage
  },
  {
    id: 5,
    nombre: "Tacos de Pollo",
    descripcion: "Tortillas de maíz, pollo a la plancha, guacamole, salsa pico de gallo.",
    precio: 11000,
    categoria: "Hamburguesas",
    imagen: tacosImage
  },
  {
    id: 6,
    nombre: "Tiramisú",
    descripcion: "Postre italiano tradicional con crema de mascarpone y café.",
    precio: 8000,
    categoria: "Postres",
    imagen: tiramisuImage
  }
];