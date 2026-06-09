# 🎓 Universidad Dev Senior

Sistema web para la gestión de docentes desarrollado con React, Node.js, Express y MySQL.

---

## 📋 Descripción

Universidad Dev Senior es una aplicación Full Stack que permite administrar información de docentes mediante operaciones CRUD (Crear, Consultar, Actualizar y Eliminar).

El sistema está compuesto por un frontend desarrollado en React y un backend construido con Node.js y Express conectado a una base de datos MySQL.

---

## 🚀 Tecnologías utilizadas

### Frontend

* React
* JavaScript
* CSS3
* Fetch API

### Backend

* Node.js
* Express.js
* MySQL

### Herramientas

* Visual Studio Code
* Git
* GitHub
* MySQL Workbench
* Postman

---

## ✨ Funcionalidades

* Registrar docentes
* Consultar docentes
* Editar docentes
* Eliminar docentes
* Validación de formularios
* API REST
* Persistencia en MySQL

---

## 📷 Capturas

### Página principal

![Inicio](screenshots/home.png)

### Registro de docentes

![Crear](screenshots/create-docente.png)

### Edición de docentes

![Editar](screenshots/edit-docente.png)

### Base de datos

![BD](screenshots/database.png)

---

## 📂 Arquitectura

Frontend React

```text
client/
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
```

Backend Node.js

```text
server/
├── db.js
├── index.js
└── package.json
```

---

## ⚙️ Instalación

### Frontend

```bash
cd client
npm install
npm start
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## 🌐 API REST

| Método | Endpoint       | Descripción        |
| ------ | -------------- | ------------------ |
| GET    | /docentes      | Listar docentes    |
| GET    | /docentes/{id} | Buscar docente     |
| POST   | /docentes      | Crear docente      |
| PUT    | /docentes/{id} | Actualizar docente |
| DELETE | /docentes/{id} | Eliminar docente   |

---

## 👩‍💻 Autora

Maira Alejandra Rangel Murillo

Ingeniera de Sistemas

Bogotá D.C. – Colombia
