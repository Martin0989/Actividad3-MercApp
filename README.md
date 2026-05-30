# MercApp - Actividad Unidad 4

## Datos del estudiante

- **Estudiante:** Martin Ortiz
- **Universidad:** Universidad Politécnica Salesiana
- **Asignatura:** Aplicaciones Web
- **Unidad:** Unidad 4 - Despliegue y publicación de aplicaciones
- **Proyecto:** MercApp

---

## Descripción del proyecto

MercApp es una aplicación web tipo SPA desarrollada con **Vue 3 + Vite** en el frontend y una **API REST propia con Node.js + Express** en el backend.

El sistema permite visualizar un catálogo de productos, consultar productos, filtrar por categorías y realizar operaciones básicas de gestión como creación, actualización y eliminación de productos.

En la Unidad 4 se realizó el despliegue completo del proyecto desarrollado en la Unidad 3, integrando servicios en la nube para base de datos, backend, frontend y documentación pública.

---

## Arquitectura de despliegue

La aplicación fue desplegada utilizando la siguiente arquitectura:

- **Frontend:** Vue 3 + Vite desplegado en Netlify.
- **Backend:** Node.js + Express desplegado en Railway.
- **Base de datos:** MongoDB Atlas.
- **Micrositio:** GitHub Pages.
- **Control de versiones:** GitHub.

Flujo general:

```txt
Usuario
  ↓
Frontend Netlify
  ↓
API Backend Railway
  ↓
Base de datos MongoDB Atlas
```

---

## Enlaces públicos

### Repositorio GitHub

https://github.com/Martin0989/Actividad3-MercApp

### Frontend publicado en Netlify

https://bespoke-palmier-fee753.netlify.app

### Backend publicado en Railway

https://actividad3-mercapp-production.up.railway.app

### Micrositio publicado en GitHub Pages

https://martin0989.github.io/Actividad3-MercApp/

---

## Tecnologías utilizadas

### Frontend

- Vue 3
- Vite
- JavaScript
- HTML5
- CSS3
- Consumo de API mediante `fetch`
- Variables de entorno `VITE_*`

### Backend

- Node.js
- Express
- CORS
- Dotenv
- Mongoose
- API REST

### Base de datos

- MongoDB Atlas
- MongoDB Compass
- Base de datos: `mercapp`
- Colecciones:
  - `products`
  - `categories`

### Despliegue

- Railway para el backend.
- Netlify para el frontend.
- GitHub Pages para el micrositio.
- GitHub para control de versiones.

---

## Estructura general del proyecto

```txt
Actividad3-MercApp/
├─ backend/
│  ├─ config/
│  │  └─ db.js
│  ├─ data/
│  ├─ models/
│  │  ├─ Product.js
│  │  └─ Category.js
│  ├─ routes/
│  │  ├─ products.js
│  │  └─ categories.js
│  ├─ .env.example
│  ├─ package.json
│  ├─ package-lock.json
│  └─ server.js
├─ frontend/
│  ├─ dist/
│  ├─ public/
│  ├─ src/
│  ├─ .env.example
│  ├─ package.json
│  ├─ package-lock.json
│  └─ vite.config.js
├─ docs/
│  └─ index.html
├─ .gitignore
├─ package.json
├─ README.md
└─ readme.txt
```

---

## Endpoints principales de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Muestra información general de la API |
| GET | `/health` | Verifica el estado de la API |
| GET | `/api/products` | Lista todos los productos |
| GET | `/api/products/:id` | Consulta un producto por ID |
| POST | `/api/products` | Crea un nuevo producto |
| PUT | `/api/products/:id` | Actualiza completamente un producto |
| PATCH | `/api/products/:id` | Actualiza parcialmente un producto |
| DELETE | `/api/products/:id` | Elimina un producto |
| GET | `/api/categories` | Lista todas las categorías |
| GET | `/api/categories/:id` | Consulta una categoría por ID |
| POST | `/api/categories` | Crea una nueva categoría |
| PUT | `/api/categories/:id` | Actualiza una categoría |
| DELETE | `/api/categories/:id` | Elimina una categoría |

---

## Ejemplos de endpoints publicados

### Estado de la API

```txt
https://actividad3-mercapp-production.up.railway.app/health
```

### Lista de productos

```txt
https://actividad3-mercapp-production.up.railway.app/api/products
```

### Lista de categorías

```txt
https://actividad3-mercapp-production.up.railway.app/api/categories
```

---

## Variables de entorno

Las credenciales reales no se incluyen en el repositorio por seguridad.  
Para ejecutar el proyecto localmente se deben crear archivos `.env` tomando como referencia los archivos `.env.example`.

---

### Variables del backend

Crear un archivo:

```txt
backend/.env
```

basado en:

```txt
backend/.env.example
```

Ejemplo:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://usuario:contraseña@servidor/mercapp
FRONTEND_URL=http://localhost:5173
NETLIFY_URL=https://tu-sitio.netlify.app
```

> Nota: La variable `MONGODB_URI` debe contener la cadena real de conexión a MongoDB Atlas, pero no debe subirse a GitHub.

---

### Variables del frontend

Crear un archivo llamado `.env` o `.env.production` dentro de la carpeta:

```txt
frontend/
```

Ejemplo para desarrollo local:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=MercApp
VITE_APP_VERSION=1.0.0
```

Ejemplo usado para producción:

```env
VITE_API_URL=https://actividad3-mercapp-production.up.railway.app/api
VITE_APP_TITLE=MercApp
VITE_APP_VERSION=1.0.0
```

---

## Ejecución local del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Martin0989/Actividad3-MercApp.git
```

Ingresar a la carpeta del proyecto:

```bash
cd Actividad3-MercApp
```

---

### 2. Ejecutar el backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

El backend se ejecuta en:

```txt
http://localhost:3000
```

Endpoint de prueba:

```txt
http://localhost:3000/health
```

---

### 3. Ejecutar el frontend

En otra terminal, ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el frontend:

```bash
npm run dev
```

El frontend se ejecuta normalmente en:

```txt
http://localhost:5173
```

---

## Build del frontend

Para generar la versión optimizada de producción:

```bash
cd frontend
npm run build
```

Este comando genera la carpeta:

```txt
frontend/dist
```

La carpeta `dist` fue utilizada para el despliegue manual en Netlify.

---

## Despliegue en MongoDB Atlas

Para la base de datos se utilizó **MongoDB Atlas** con un clúster gratuito.

Configuración realizada:

- Creación del proyecto en MongoDB Atlas.
- Creación del clúster gratuito.
- Creación del usuario de base de datos.
- Configuración de acceso de red.
- Obtención de la cadena de conexión.
- Validación de conexión mediante MongoDB Compass.
- Creación de la base de datos `mercapp`.
- Creación de las colecciones `products` y `categories`.

---

## Despliegue del backend en Railway

El backend fue desplegado en Railway desde el repositorio de GitHub.

Configuración aplicada:

- Conexión del repositorio GitHub con Railway.
- Configuración de variables de entorno.
- Uso de `process.env.PORT` para el puerto asignado por Railway.
- Conexión con MongoDB Atlas mediante `MONGODB_URI`.
- Generación de dominio público.
- Validación de los endpoints `/health`, `/api/products` y `/api/categories`.

URL del backend:

```txt
https://actividad3-mercapp-production.up.railway.app
```

---

## Despliegue del frontend en Netlify

El frontend fue desplegado en Netlify mediante despliegue manual de la carpeta `dist`.

Pasos realizados:

- Configuración de `VITE_API_URL` apuntando a la API pública en Railway.
- Ejecución de `npm run build`.
- Publicación manual de la carpeta `frontend/dist`.
- Validación del consumo de la API desde el frontend publicado.

URL del frontend:

```txt
https://bespoke-palmier-fee753.netlify.app
```

---

## Configuración de CORS

Para permitir la comunicación entre el frontend publicado en Netlify y el backend publicado en Railway, se configuraron variables de entorno en Railway:

```env
FRONTEND_URL=https://bespoke-palmier-fee753.netlify.app
NETLIFY_URL=https://bespoke-palmier-fee753.netlify.app
```

Con esto se validó que el frontend pueda consumir correctamente los endpoints de la API sin errores de CORS.

---

## Micrositio en GitHub Pages

Se creó un micrositio informativo dentro de la carpeta:

```txt
docs/
```

El archivo principal del micrositio es:

```txt
docs/index.html
```

El micrositio contiene:

- Datos del estudiante.
- Resumen técnico del sistema.
- Arquitectura de despliegue.
- Enlaces públicos del proyecto.
- Tabla de endpoints.
- Guía breve de ejecución local.

URL del micrositio:

```txt
https://martin0989.github.io/Actividad3-MercApp/
```

---

## Evidencias realizadas

Durante el desarrollo de la actividad se validaron los siguientes puntos:

- Proyecto local funcionando.
- Repositorio actualizado en GitHub.
- Backend preparado con `process.env.PORT`.
- Endpoint `/health` creado y probado.
- MongoDB Atlas configurado.
- MongoDB Compass conectado correctamente.
- Base de datos `mercapp` creada.
- Colecciones `products` y `categories` creadas.
- Backend conectado a MongoDB Atlas.
- API publicada en Railway.
- Endpoints de Railway funcionando.
- Frontend configurado con `VITE_API_URL`.
- Build de producción generado con Vite.
- Frontend publicado en Netlify.
- Frontend consumiendo la API pública.
- Variables de CORS actualizadas.
- Micrositio publicado en GitHub Pages.

---

## Comandos útiles

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Build frontend

```bash
cd frontend
npm run build
```

### Vista previa del build

```bash
cd frontend
npm run preview
```

---

## Estado final del proyecto

El proyecto MercApp quedó desplegado completamente en Internet utilizando:

- MongoDB Atlas para la base de datos.
- Railway para la API REST.
- Netlify para el frontend.
- GitHub Pages para el micrositio.
- GitHub para control de versiones.

La aplicación se encuentra operativa y accesible públicamente mediante HTTPS.