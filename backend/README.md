# StockFlow – Backend API Service

> **RESTful API service for the StockFlow Inventory Management System, built with Node.js, Express.js, and MongoDB.**

---

## 📖 Table of Contents

1. [Backend Overview](#-backend-overview)
2. [Technologies & Dependencies](#-technologies--dependencies)
3. [Backend Folder Structure](#-backend-folder-structure)
4. [Installation & Setup](#-installation--setup)
5. [Environment Variables](#-environment-variables)
6. [Database Connection](#-database-connection)
7. [Admin Seed Setup](#-admin-seed-setup)
8. [API Route Mount Convention Notice](#-api-route-mount-convention-notice)
9. [API Endpoints](#-api-endpoints)
10. [Authentication & Authorization](#-authentication--authorization)
11. [Running the Backend](#-running-the-backend)

---

## 📌 Backend Overview

The StockFlow backend is an Express-based REST API designed under the **MVC (Model-View-Controller)** pattern. It handles client requests, business logic execution, password hashing, stateless JSON Web Token (JWT) issuance, role-based authorization, and communication with the MongoDB database via Mongoose.

---

## 🛠️ Technologies & Dependencies

All dependencies listed below are actively installed in `backend/package.json`:

| Package | Version | Purpose |
|---|---|---|
| **`express`** | `^5.3.0` | Core Node.js web server and routing framework. |
| **`mongoose`** | `^9.12.0` | Object Data Modeling (ODM) library for MongoDB validation and queries. |
| **`jsonwebtoken`** | `^9.0.3` | Generates and verifies cryptographic Bearer tokens for stateless authentication. |
| **`bcryptjs`** | `^3.0.3` | Hashes user passwords with salt rounds to prevent plaintext storage. |
| **`dotenv`** | `^18.0.10` | Loads environment configurations from local `.env` files into `process.env`. |
| **`cors`** | `^2.8.6` | Enables Cross-Origin Resource Sharing for requests originating from the React client. |
| **`helmet`** | `^8.3.0` | Configures secure HTTP response headers against common web vulnerabilities. |
| **`nodemon`** *(dev)* | `^3.1.14` | Automatically restarts the development server upon detecting file modifications. |

---

## 📁 Backend Folder Structure

```text
backend/
├── config/
│   └── db.js                 # Mongoose database connection setup
├── controllers/
│   ├── authControllers.js    # Register, login, and user profile controllers
│   └── userController.js     # Employee creation & administrative controllers
├── middleware/
│   ├── authMiddleware.js     # JWT Bearer token authentication guard
│   ├── errorMiddleware.js    # Centralized Express error handler
│   └── roleMiddleware.js     # Role-based access control (RBAC) guard
├── models/
│   └── UserModel.js          # Mongoose schema for Admins and Employees
├── .env.example              # Sanitized template for environment variables
├── .gitignore                # Git exclusion rules for node_modules, .env, and logs
├── package.json              # Backend scripts and npm package definitions
├── routes.js                 # Express router mapping API endpoints to controllers
├── seedAdmin.js              # Standalone database seed script for root Admin
└── server.js                 # Server initialization, middleware pipeline, and port listener
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: `^20.19.0 || >=22.12.0` (Node 22 LTS recommended)
- **MongoDB**: An active local instance on port `27017` or a MongoDB Atlas cloud URI

### Steps
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example template to create your local `.env`:
   - **Windows PowerShell**:
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Linux / macOS (Bash)**:
     ```bash
     cp .env.example .env
     ```

---

## 🔑 Environment Variables

The backend relies on **six environment variables** declared in `backend/.env.example`.

> ⚠️ **Security Warning**: Never commit your actual `.env` file or hardcode sensitive values into version control.

| Variable Name | Purpose | Example / Default |
|---|---|---|
| `PORT` | The network port on which the Express HTTP server listens. | `5000` |
| `MONGO_URI` | The connection URI string for your local or cloud MongoDB database instance. | `mongodb://localhost:27017/stockflow` |
| `JWT_SECRET` | A cryptographically strong secret string used to sign and verify JWT tokens. | *Your private secret key* |
| `ADMIN_NAME` | The full name of the bootstrap Administrator user created by `seedAdmin.js`. | `System Administrator` |
| `ADMIN_EMAIL` | The email address of the bootstrap Administrator user. | `admin@stockflow.com` |
| `ADMIN_PASSWORD` | The initial plaintext password used by `seedAdmin.js` to seed the Admin (minimum 8 characters). | *Strong temporary password* |

---

## 🗄️ Database Connection

Database connectivity is managed inside `backend/config/db.js`. It uses Mongoose to establish a connection to the MongoDB cluster specified by `process.env.MONGO_URI`:

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

In `backend/server.js`, `startServer()` awaits `connectDB()` before opening the port listener, preventing the application from accepting requests without an active database.

---

## 🌱 Admin Seed Setup

The repository includes a dedicated seed script (`backend/seedAdmin.js`) to bootstrap an initial Administrator account without relying on public registration endpoints.

### Seed Script Logic
1. Reads `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` from `.env`.
2. Validates that the password meets the minimum length requirement (8+ characters).
3. Connects to MongoDB via `backend/config/db.js`.
4. Checks whether a user with `role: "admin"` already exists. If found, it safely halts without modifying existing records.
5. Hashes the password using `bcrypt.hash(ADMIN_PASSWORD, 10)`.
6. Creates the user with `role: "admin"`.
7. Closes the Mongoose connection cleanly.

### Running the Seed Script
Execute the script using the verified `package.json` command:
```bash
npm run seed:admin
```

---

## ⚠️ API Route Mount Convention Notice

> **IMPORTANT ARCHITECTURAL NOTE FOR BACKEND DEVELOPERS**:
>
> 1. **Current Code State**: In `backend/server.js`, routes are mounted with `app.use(routes)`. This serves all routes from the root (`/login`, `/register`, etc.).
> 2. **Project Specification Convention**: The project specification (`STOCKFLOW.pdf`) specifies that upcoming modules use the `/api/...` prefix (e.g. `/api/products`, `/api/categories`, `/api/suppliers`, `/api/inventory/stock-in`).
> 3. **Action Required**: The Project Lead and team must formally agree whether to prefix all routes with `/api` (by updating `server.js` to `app.use("/api", routes)`) before interns implement upcoming CRUD modules.
> 4. **No Premature Changes**: In accordance with project instructions, existing backend routes must remain untouched until this decision is formalized.

---

## 📡 API Endpoints

The following endpoints are **currently implemented** in `backend/routes.js`.

> **Note**: Routes are mounted directly on the root path in `server.js` (`app.use(routes)`).

| HTTP Method | Route Path | Authentication | Role Required | Purpose |
|---|---|:---:|:---:|---|
| `GET` | `/` | None | Public | Health check / API sanity probe. Returns `"Hello, World!"`. |
| `POST` | `/register` | None | Public | Registers a new user. Default assigned role is always `"employee"`. |
| `POST` | `/login` | None | Public | Authenticates credentials and returns a signed JWT and user summary. |
| `GET` | `/profile` | Bearer JWT | Authenticated | Retrieves profile information for the currently authenticated user. |
| `POST` | `/employees` | Bearer JWT | `admin` | Allows an Administrator to create new employee accounts. |
| `GET` | `/admin-dashboard` | Bearer JWT | `admin` | Role verification test endpoint returning `"Welcome Admin"`. |

### Endpoint Details

#### 1. Register User
- **Endpoint**: `POST /register`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@company.com",
    "password": "Password123"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "user": {
      "id": "673703c4f9a123...",
      "name": "Jane Doe",
      "email": "jane@company.com",
      "role": "employee"
    }
  }
  ```

#### 2. User Login
- **Endpoint**: `POST /login`
- **Request Body**:
  ```json
  {
    "email": "jane@company.com",
    "password": "Password123"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "email": "jane@company.com",
      "name": "Jane Doe",
      "role": "employee"
    }
  }
  ```

#### 3. Create Employee (Admin Only)
- **Endpoint**: `POST /employees`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Alex Staff",
    "email": "alex@company.com",
    "password": "StaffPassword123"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Employee created successfully",
    "employee": {
      "name": "Alex Staff",
      "email": "alex@company.com",
      "role": "employee"
    }
  }
  ```

---

## 🔒 Authentication & Authorization

### 1. Password Hashing
All user passwords are encrypted using `bcryptjs` with `10` salt rounds before saving to MongoDB:
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

### 2. Token Generation
Upon valid credentials, the server signs a stateless JWT containing the user's `id`, valid for `1 hour`:
```javascript
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
```

### 3. Authentication Middleware (`backend/middleware/authMiddleware.js`)
Guards private routes by inspecting the incoming `Authorization` HTTP header:
1. Verifies that the header begins with `Bearer `.
2. Verifies token integrity against `process.env.JWT_SECRET`.
3. Looks up the user in MongoDB, strips the password field (`select("-password")`), and attaches the user document to `req.user`.
4. Returns `401 Unauthorized` if the token is missing, invalid, or expired.

### 4. Role Authorization Middleware (`backend/middleware/roleMiddleware.js`)
Enforces Role-Based Access Control (RBAC):
```javascript
const accessControl = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden: Insufficient privileges",
      });
    }
    next();
  };
};

module.exports = accessControl;
```

---

## 🏃 Running the Backend

The following scripts are verified from `backend/package.json`:

### Development Mode (with hot-reload via Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Bootstrap Database Administrator
```bash
npm run seed:admin
```

---

*StockFlow Backend · MVC Node.js/Express Service*
