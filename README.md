# MercApp - Catálogo de Productos SPA + API propia

## Datos del estudiante

- Nombre: Martin Ortiz
- Universidad: Universidad Politécnica Salesiana
- Asignatura: Aplicaciones Web
- Unidad: Unidad 3 - Programación del lado del cliente
- Actividad: Desarrollo de una aplicación web para el Catálogo de Productos SPA + API propia

---

## Descripción del proyecto

MercApp es una aplicación web de una sola página, desarrollada con **Vue 3 + Vite**, que consume una **API REST propia** construida con **Node.js y Express**.

El proyecto permite gestionar un catálogo de productos con búsqueda, filtro por categoría, detalle de producto, creación, edición, eliminación y manejo de un carrito simple con persistencia en `localStorage`.

Esta actividad corresponde a la Unidad 3, enfocada en la programación del lado del cliente mediante componentes, rutas, reactividad, propiedades computadas, comunicación por props/eventos, composables, consumo asíncrono de datos y lazy loading de vistas.

---

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- CORS
- Nodemon
- API REST
- Persistencia mediante archivo JSON

### Frontend

- Vue 3
- Vite
- Vue Router
- Composition API
- Single File Components
- JavaScript
- CSS
- LocalStorage

---

## Estructura del proyecto

```text
Actividad3-MercApp/
├── backend/
│   ├── data/
│   │   ├── categories.json
│   │   └── products.json
│   ├── routes/
│   │   ├── categories.js
│   │   └── products.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProductCard.vue
│   │   ├── composables/
│   │   │   ├── useApi.js
│   │   │   ├── useCart.js
│   │   │   └── useProducts.js
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── views/
│   │   │   ├── AboutView.vue
│   │   │   ├── CartView.vue
│   │   │   ├── HomeView.vue
│   │   │   ├── NotFoundView.vue
│   │   │   ├── ProductDetailView.vue
│   │   │   └── ProductFormView.vue
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── readme.txt

```

---

## Funcionalidades implementadas

### Backend

- API REST propia con Express.
- Endpoint principal de prueba.
- Consulta de todos los productos.
- Consulta de producto por ID.
- Consulta de categorías.
- Creación de productos.
- Edición completa de productos.
- Actualización parcial de productos.
- Eliminación de productos.
- Validación básica de campos obligatorios.
- Manejo de errores HTTP:
  - `400` para datos inválidos.
  - `404` para rutas o productos no encontrados.
  - `500` para errores internos.
- Persistencia de productos mediante archivo JSON.
- Uso de datos semilla para productos y categorías.

### Frontend

- Aplicación SPA creada con Vue 3 y Vite.
- Configuración de Vue Router.
- Vista principal de catálogo.
- Vista de detalle de producto.
- Vista de carrito.
- Vista de acerca de.
- Vista 404 para rutas no encontradas.
- Componente reutilizable `ProductCard`.
- Comunicación entre componentes mediante props y eventos personalizados.
- Búsqueda de productos por nombre o descripción.
- Filtro de productos por categoría.
- Consumo asíncrono de datos desde la API propia.
- Estados de carga y error.
- Formulario para crear productos.
- Formulario para editar productos.
- Validación de formulario con `v-model`.
- Eliminación de productos desde la interfaz.
- Carrito con:
  - Agregar productos.
  - Quitar productos.
  - Aumentar cantidad.
  - Disminuir cantidad.
  - Vaciar carrito.
  - Total calculado.
  - Persistencia en `localStorage`.
- Composables:
  - `useApi`
  - `useProducts`
  - `useCart`
- Lazy loading en vistas `/cart` y `/about`.
- Uso de `<Suspense>` con fallback de carga.
- Diseño visual responsivo.

---

## Modelos de datos

### Product

```json
{
  "id": 1,
  "name": "Laptop Lenovo IdeaPad",
  "description": "Laptop para estudio y trabajo con buen rendimiento para tareas diarias.",
  "price": 750,
  "imageUrl": "https://ejemplo.com/imagen.jpg",
  "categoryId": 1,
  "stock": 8
}
```

### Category

```json
{
  "id": 1,
  "name": "Tecnología"
}
```

---

## Endpoints del API

### Productos

```text
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
PATCH /api/products/:id
DELETE /api/products/:id
```

### Categorías

```text
GET /api/categories
```

---

## Rutas del frontend

```text
/                    Catálogo de productos
/product/new         Crear nuevo producto
/product/:id         Detalle de producto
/product/:id/edit    Editar producto
/cart                Carrito
/about               Acerca de
/:pathMatch          Página 404
```

---

## Instalación y ejecución del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Martin0989/Actividad3-MercApp.git
cd Actividad3-MercApp
```

---

### 2. Ejecutar el backend

Desde la carpeta principal del proyecto:

```bash
cd backend
npm install
npm run dev
```

El backend se ejecuta en:

```text
http://localhost:3000
```

Rutas principales para probar el backend:

```text
http://localhost:3000
http://localhost:3000/api/products
http://localhost:3000/api/products/1
http://localhost:3000/api/categories
```

---

### 3. Ejecutar el frontend

Abrir otra terminal desde la carpeta principal del proyecto:

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecuta normalmente en:

```text
http://localhost:5173
```

---

## Pruebas realizadas

Se verificó el funcionamiento de:

- Carga del catálogo de productos.
- Búsqueda por nombre y descripción.
- Filtro por categoría.
- Visualización del detalle de producto.
- Creación de nuevos productos.
- Edición de productos existentes.
- Eliminación de productos.
- Agregar productos al carrito.
- Aumentar y disminuir cantidades del carrito.
- Eliminar productos del carrito.
- Cálculo del total del carrito.
- Persistencia del carrito en `localStorage`.
- Navegación entre rutas.
- Página 404.
- Consumo correcto del backend desde el frontend.

---

## Comandos Git utilizados

```bash
git init
git add .
git commit -m "Primer Commit: Estructura inicial con API y Vue"
git commit -m "Commit 2: implementacion de rutas catalogo busqueda y detalle"
git commit -m "Commit 3: completar CRUD carrito composables y documentacion"
git push
```

---

## Historial de commits

El proyecto fue trabajado en tres commits principales:

1. **Primer Commit: Estructura inicial con API y Vue**
   - Creación de la estructura base del proyecto.
   - Configuración inicial del backend.
   - Creación de productos y categorías en JSON.
   - Implementación de endpoints iniciales.
   - Creación del frontend con Vue 3 y Vite.

2. **Commit 2: implementacion de rutas catalogo busqueda y detalle**
   - Configuración de Vue Router.
   - Creación de vistas principales.
   - Implementación del catálogo.
   - Consumo del API desde Vue.
   - Búsqueda y filtro por categoría.
   - Vista de detalle del producto.
   - Componente ProductCard.

3. **Commit 3: completar CRUD carrito composables y documentacion**
   - CRUD completo de productos.
   - Formulario de creación y edición.
   - Validaciones.
   - Implementación del carrito.
   - Persistencia con localStorage.
   - Composables.
   - Lazy loading.
   - Suspense.
   - Documentación final.

---

## Repositorio de GitHub

```text
https://github.com/Martin0989/Actividad3-MercApp.git
```

---

## Archivo readme.txt

El archivo `readme.txt` ubicado en la carpeta principal contiene la URL del repositorio de GitHub

Contenido del archivo:

```text
URL del repositorio de GitHub:

https://github.com/Martin0989/Actividad3-MercApp.git
```

---


## Observaciones

Para ejecutar correctamente la aplicación es necesario mantener corriendo al mismo tiempo:

1. El backend en `http://localhost:3000`.
2. El frontend en `http://localhost:5173`.

El frontend consume la información desde la API REST propia, por lo tanto, si el backend no está activo, el catálogo no podrá cargar los productos.