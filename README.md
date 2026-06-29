# LTI - Talent Tracking System | EN

This project is a full-stack application with a React frontend and an Express backend using Prisma as an ORM. The frontend is started with Create React App, and the backend is written in TypeScript.

## Business Purpose

LTI (Talent Tracking System) is an Applicant Tracking System (ATS) designed to help recruitment teams manage the hiring lifecycle: capturing candidate profiles, storing CVs and work history, organizing job positions, and tracking candidates through interview flows and application stages.

The system enables recruiters to:
- Register and update candidate information (personal data, education, work experience, résumé).
- Consult candidate records via web UI or REST API.
- Persist all recruitment data in a PostgreSQL database for centralized talent management.

LTI is intended as a learning and extensible base for ATS capabilities.

## Technology Stack

- **Runtime**: Node.js (backend)
- **Backend framework**: Express 4.x
- **Language**: TypeScript (backend), TypeScript/JavaScript (frontend)
- **ORM**: Prisma 5.x
- **Database**: PostgreSQL (via Docker Compose locally)
- **Frontend framework**: React 18 (Create React App)
- **UI**: React Bootstrap, Bootstrap 5
- **Routing (frontend)**: React Router DOM
- **API documentation**: Swagger (swagger-jsdoc, swagger-ui-express)
- **File uploads**: Multer
- **Testing**: Jest (backend and frontend)
- **Containerization**: Docker, Docker Compose

## Explanation of Directories and Files

- `backend/`: Contains the server-side code written in Node.js.
  - `src/`: Contains the source code for the backend.
    - `index.ts`: The entry point for the backend server.
    - `application/`: Contains the application logic.
    - `domain/`: Contains the business logic.
    - `infrastructure/`: Contains code that communicates with the database.
    - `presentation/`: Contains code related to the presentation layer (such as controllers).
    - `routes/`: Contains the route definitions for the API.
    - `tests/`: Contains test files.
  - `prisma/`: Contains the Prisma schema file for ORM.
  - `tsconfig.json`: TypeScript configuration file.
- `frontend/`: Contains the client-side code written in React.
  - `src/`: Contains the source code for the frontend.
    - `components/`: Contains React UI components (candidate form, file upload, recruiter dashboard).
    - `services/`: Contains HTTP client logic for communicating with the backend API.
  - `public/`: Contains static files such as the HTML file and images.
  - `build/`: Contains the production-ready build of the frontend.
- `backend/api-spec.yaml`: Contains the OpenAPI specification of the REST API.
- `package.json`: Root-level configuration, including Prisma schema path.
- `.env`: Contains the environment variables.
- `docker-compose.yml`: Contains the Docker Compose configuration to manage your application's services.
- `README.md`: This file contains information about the project and instructions on how to run it.

## Project Structure

The project is divided into two main directories: `frontend` and `backend`.

### Frontend

The frontend is a React application, and its main files are located in the src directory. The public directory contains static assets, and the build directory contains the production build of the application.

### Backend

The backend is an Express application written in TypeScript. The src directory contains the source code, divided into several subdirectories:

- `application`: Contains the application logic.
- `domain`: Contains the domain models.
- `infrastructure`: Contains code related to the infrastructure.
- `presentation`: Contains code related to the presentation layer.
- `routes`: Contains the application routes.
- `tests`: Contains the application tests.

The `prisma` directory contains the Prisma schema.

## Architecture

### Backend

HTTP requests enter through Express (`src/index.ts`), which applies middleware (JSON parsing, CORS, Prisma client injection) and mounts routes under `/candidates`.

The backend follows a layered structure:

- `routes/` and `presentation/controllers/`: HTTP handlers and route definitions.
- `application/services/`: Use cases, validation, and orchestration.
- `domain/models/`: Business entities and domain logic.
- `infrastructure/` and `prisma/`: Persistence and database access.

Data flow: Client → routes → controller → application service → domain model → Prisma → PostgreSQL.

### Frontend

Single-page application built with Create React App:

- `src/components/`: Forms, dashboards, and file upload UI.
- `src/services/`: Calls to the backend API at `http://localhost:3010`.
- `src/App.tsx` and `src/index.tsx`: Application bootstrap and layout.

The frontend communicates with the backend REST API over HTTP. CORS is configured to allow `http://localhost:3000`.

## First steps

### Prerequisites

- **Node.js** 18+ and **npm**
- **Docker** and **Docker Compose** ([Install Docker](https://docs.docker.com/get-docker/))
- **Git**

To get started with this project, follow these steps:

1. Clone the repository.
2. Configure environment variables.

   Create a `.env` file at the project root (for Docker Compose), for example:

   ```env
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=mydatabase
   DB_PORT=5432
   ```

   Create `backend/.env` with the Prisma connection string (adjust user, password, port, and database name to match the root `.env`):

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase?schema=public"
   ```

3. Start PostgreSQL with Docker (from the project root):

   ```sh
   docker-compose up -d
   ```

4. Install the dependencies for the frontend and backend:

   ```sh
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

5. Initialize the database (from the `backend/` directory):

   ```sh
   npx prisma generate
   npx prisma migrate dev
   npx ts-node prisma/seed.ts
   ```

6. Start the backend server (from the `backend/` directory):

   ```sh
   npm run dev
   ```

7. In a new terminal window, start the frontend server (from the `frontend/` directory):

   ```sh
   npm start
   ```

The backend server will be running at http://localhost:3010 and the frontend will be available at http://localhost:3000.

### Production build (optional)

```sh
cd backend
npm run build
npm start

cd ../frontend
npm run build
```

Serve the frontend `build/` directory with your preferred static host or reverse proxy.

## Docker and PostgreSQL

This project uses Docker to run a PostgreSQL database. Here's how to set it up:

Install Docker on your machine if you haven't done so already. You can download it from [here](https://docs.docker.com/get-docker/).
Navigate to the root directory of the project in your terminal.
Run the following command to start the Docker container:

```
docker-compose up -d
```
This will start a PostgreSQL database in a Docker container. The -d flag runs the container in detached mode, which means it runs in the background.

To access the PostgreSQL database, you can use any PostgreSQL client with the following connection details:

- Host: localhost
- Port: 5432
- User: postgres
- Password: password
- Database: mydatabase
  
Please replace User, Password, and Database with the actual username, password, and database name specified in your .env file.

To stop the Docker container, run the following command:

```
docker-compose down
```
To generate the database using Prisma, follow these steps:

1. Make sure that the .env file in the root directory of the backend contains the DATABASE_URL variable with the correct connection string to your PostgreSQL database. If it doesn’t work, try replacing the full URL directly in schema.prisma, in the url variable.

2. Open a terminal and navigate to the backend directory where the schema.prisma and seed.ts files are located.

3. Run the following commands to generate the Prisma structure, apply migrations to your database, and populate it with sample data:

```
npx prisma generate
npx prisma migrate dev
npx ts-node prisma/seed.ts
```

Once you have completed all the steps, you should be able to save new candidates, both via web and via API, view them in the database, and retrieve them using GET by ID.

```
POST http://localhost:3010/candidates
{
    "firstName": "Albert",
    "lastName": "Saelices",
    "email": "albert.saelices@gmail.com",
    "phone": "656874937",
    "address": "Calle Sant Dalmir 2, 5ºB. Barcelona",
    "educations": [
        {
            "institution": "UC3M",
            "title": "Computer Science",
            "startDate": "2006-12-31",
            "endDate": "2010-12-26"
        }
    ],
    "workExperiences": [
        {
            "company": "Coca Cola",
            "position": "SWE",
            "description": "",
            "startDate": "2011-01-13",
            "endDate": "2013-01-17"
        }
    ],
    "cv": {
        "filePath": "uploads/1715760936750-cv.pdf",
        "fileType": "application/pdf"
    }
}
```

--------------------------------------------

# LTI - Sistema de Seguimiento de Talento | ES

Este proyecto es una aplicación full-stack con un frontend en React y un backend en Express usando Prisma como un ORM. El frontend se inicia con Create React App y el backend está escrito en TypeScript.

## Propósito de negocio

LTI (Sistema de Seguimiento de Talento) es un Applicant Tracking System (ATS) orientado a equipos de reclutamiento para gestionar el ciclo de contratación: captura de candidatos, almacenamiento de CVs e historial laboral, organización de posiciones y seguimiento de candidatos en flujos de entrevista y etapas de aplicación.

El sistema permite a los reclutadores:
- Registrar y actualizar información de candidatos (datos personales, formación, experiencia laboral, currículum).
- Consultar candidatos desde la interfaz web o la API REST.
- Persistir toda la información en PostgreSQL para una gestión centralizada del talento.

LTI se plantea como base formativa y extensible de capacidades ATS.

## Stack tecnológico

- **Runtime**: Node.js (backend)
- **Framework backend**: Express 4.x
- **Lenguaje**: TypeScript (backend), TypeScript/JavaScript (frontend)
- **ORM**: Prisma 5.x
- **Base de datos**: PostgreSQL (localmente con Docker Compose)
- **Framework frontend**: React 18 (Create React App)
- **UI**: React Bootstrap, Bootstrap 5
- **Enrutado (frontend)**: React Router DOM
- **Documentación API**: Swagger (swagger-jsdoc, swagger-ui-express)
- **Subida de archivos**: Multer
- **Tests**: Jest (backend y frontend)
- **Contenedores**: Docker, Docker Compose

## Explicación de Directorios y Archivos

- `backend/`: Contiene el código del lado del servidor escrito en Node.js.
  - `src/`: Contiene el código fuente para el backend.
    - `index.ts`: El punto de entrada para el servidor backend.
    - `application/`: Contiene la lógica de aplicación.
    - `domain/`: Contiene la lógica de negocio.
    - `infrastructure/`: Contiene código que se comunica con la base de datos.
    - `presentation/`: Contiene código relacionado con la capa de presentación (como controladores).
    - `routes/`: Contiene las definiciones de rutas para la API.
    - `tests/`: Contiene archivos de prueba.
  - `prisma/`: Contiene el archivo de esquema de Prisma para ORM.
  - `tsconfig.json`: Archivo de configuración de TypeScript.
- `frontend/`: Contiene el código del lado del cliente escrito en React.
  - `src/`: Contiene el código fuente para el frontend.
    - `components/`: Contiene componentes de interfaz React (formulario de candidatos, subida de archivos, panel de reclutador).
    - `services/`: Contiene el cliente HTTP para comunicarse con la API del backend.
  - `public/`: Contiene archivos estáticos como el archivo HTML e imágenes.
  - `build/`: Contiene la construcción lista para producción del frontend.
- `backend/api-spec.yaml`: Contiene la especificación OpenAPI de la API REST.
- `package.json`: Configuración a nivel de raíz, incluyendo la ruta del esquema de Prisma.
- `.env`: Contiene las variables de entorno.
- `docker-compose.yml`: Contiene la configuración de Docker Compose para gestionar los servicios de tu aplicación.
- `README.md`: Este archivo, contiene información sobre el proyecto e instrucciones sobre cómo ejecutarlo.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `frontend` y `backend`.

### Frontend

El frontend es una aplicación React y sus archivos principales están ubicados en el directorio `src`. El directorio `public` contiene activos estáticos y el directorio `build` contiene la construcción de producción de la aplicación.

### Backend

El backend es una aplicación Express escrita en TypeScript. El directorio `src` contiene el código fuente, dividido en varios subdirectorios:

- `application`: Contiene la lógica de aplicación.
- `domain`: Contiene los modelos de dominio.
- `infrastructure`: Contiene código relacionado con la infraestructura.
- `presentation`: Contiene código relacionado con la capa de presentación.
- `routes`: Contiene las rutas de la aplicación.
- `tests`: Contiene las pruebas de la aplicación.

El directorio `prisma` contiene el esquema de Prisma.

## Arquitectura

### Backend

Las peticiones HTTP entran por Express (`src/index.ts`), que aplica middleware (JSON, CORS, inyección de Prisma) y monta rutas bajo `/candidates`.

El backend sigue una estructura por capas:

- `routes/` y `presentation/controllers/`: Controladores HTTP y definición de rutas.
- `application/services/`: Casos de uso, validación y orquestación.
- `domain/models/`: Entidades y lógica de negocio.
- `infrastructure/` y `prisma/`: Persistencia y acceso a la base de datos.

Flujo de datos: Cliente → routes → controller → application service → domain model → Prisma → PostgreSQL.

### Frontend

Aplicación de una sola página construida con Create React App:

- `src/components/`: Formularios, dashboards e interfaz de subida de archivos.
- `src/services/`: Llamadas a la API del backend en `http://localhost:3010`.
- `src/App.tsx` y `src/index.tsx`: Arranque y estructura de la aplicación.

El frontend se comunica con la API REST del backend por HTTP. CORS está configurado para permitir `http://localhost:3000`.

## Primeros Pasos

### Requisitos previos

- **Node.js** 18+ y **npm**
- **Docker** y **Docker Compose** ([Instalar Docker](https://docs.docker.com/get-docker/))
- **Git**

Para comenzar con este proyecto, sigue estos pasos:

1. Clona el repositorio.
2. Configura las variables de entorno.

   Crea un archivo `.env` en la raíz del proyecto (para Docker Compose), por ejemplo:

   ```env
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=mydatabase
   DB_PORT=5432
   ```

   Crea `backend/.env` con la cadena de conexión de Prisma (ajusta usuario, contraseña, puerto y base de datos según el `.env` de la raíz):

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase?schema=public"
   ```

3. Inicia PostgreSQL con Docker (desde la raíz del proyecto):

   ```sh
   docker-compose up -d
   ```

4. Instala las dependencias para el frontend y el backend:

   ```sh
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

5. Inicializa la base de datos (desde el directorio `backend/`):

   ```sh
   npx prisma generate
   npx prisma migrate dev
   npx ts-node prisma/seed.ts
   ```

6. Inicia el servidor backend (desde el directorio `backend/`):

   ```sh
   npm run dev
   ```

7. En una nueva ventana de terminal, inicia el servidor frontend (desde el directorio `frontend/`):

   ```sh
   npm start
   ```

El servidor backend estará corriendo en http://localhost:3010 y el frontend estará disponible en http://localhost:3000.

### Build de producción (opcional)

```sh
cd backend
npm run build
npm start

cd ../frontend
npm run build
```

Sirve el directorio `build/` del frontend con el host estático o proxy que prefieras.

## Docker y PostgreSQL

Este proyecto usa Docker para ejecutar una base de datos PostgreSQL. Así es cómo ponerlo en marcha:

Instala Docker en tu máquina si aún no lo has hecho. Puedes descargarlo desde [aquí](https://docs.docker.com/get-docker/).
Navega al directorio raíz del proyecto en tu terminal.
Ejecuta el siguiente comando para iniciar el contenedor Docker:
```
docker-compose up -d
```
Esto iniciará una base de datos PostgreSQL en un contenedor Docker. La bandera -d corre el contenedor en modo separado, lo que significa que se ejecuta en segundo plano.

Para acceder a la base de datos PostgreSQL, puedes usar cualquier cliente PostgreSQL con los siguientes detalles de conexión:
 - Host: localhost
 - Port: 5432
 - User: postgres
 - Password: password
 - Database: mydatabase

Por favor, reemplaza User, Password y Database con el usuario, la contraseña y el nombre de la base de datos reales especificados en tu archivo .env.

Para detener el contenedor Docker, ejecuta el siguiente comando:
```
docker-compose down
```

Para generar la base de datos utilizando Prisma, sigue estos pasos:

1. Asegúrate de que el archivo `.env` en el directorio raíz del backend contenga la variable `DATABASE_URL` con la cadena de conexión correcta a tu base de datos PostgreSQL. Si no te funciona, prueba a reemplazar la URL completa directamente en `schema.prisma`, en la variable `url`.

2. Abre una terminal y navega al directorio del backend donde se encuentra el archivo `schema.prisma` y `seed.ts`.

3. Ejecuta los siguientes comandos para generar la estructura de prisma, las migraciones a tu base de datos y poblarla con datos de ejemplo:
```
npx prisma generate
npx prisma migrate dev
npx ts-node prisma/seed.ts
```

Una vez has dado todos los pasos, deberías poder guardar nuevos candidatos, tanto via web, como via API, verlos en la base de datos y obtenerlos mediante GET por id.

```
POST http://localhost:3010/candidates
{
    "firstName": "Albert",
    "lastName": "Saelices",
    "email": "albert.saelices@gmail.com",
    "phone": "656874937",
    "address": "Calle Sant Dalmir 2, 5ºB. Barcelona",
    "educations": [
        {
            "institution": "UC3M",
            "title": "Computer Science",
            "startDate": "2006-12-31",
            "endDate": "2010-12-26"
        }
    ],
    "workExperiences": [
        {
            "company": "Coca Cola",
            "position": "SWE",
            "description": "",
            "startDate": "2011-01-13",
            "endDate": "2013-01-17"
        }
    ],
    "cv": {
        "filePath": "uploads/1715760936750-cv.pdf",
        "fileType": "application/pdf"
    }
}
```

