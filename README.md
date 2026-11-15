# StockFlow – Inventory Management System

> **A modern, centralized inventory and sales management platform built on the MERN stack.**

[![Project Level](https://img.shields.io/badge/Project%20Level-Intermediate-blue.svg)](#project-overview)
[![Timeline](https://img.shields.io/badge/Sprint%20Duration-7%20Days-green.svg)](#team-development-workflow)
[![Architecture](https://img.shields.io/badge/Architecture-MERN%20%2F%20MVC-orange.svg)](#project-architecture)
[![Methodology](https://img.shields.io/badge/Methodology-Agile%20Team%20Development-purple.svg)](#team-development-workflow)

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Project Objectives](#-project-objectives)
3. [Technology Stack](#-technology-stack)
4. [Project Modules & Implementation Status](#-project-modules--implementation-status)
5. [User Roles & Permissions](#-user-roles--permissions)
6. [Project Architecture](#-project-architecture)
7. [API Route Mount Convention Notice](#-api-route-mount-convention-notice)
8. [Current Folder Structure](#-current-folder-structure)
9. [Installation & Setup](#-installation--setup)
10. [Team Development Workflow](#-team-development-workflow)

---

## 📌 Project Overview

**StockFlow** is a full-stack web-based Inventory Management System designed to help businesses manage their products, categories, suppliers, inventory levels, stock movements, and sales records from a single centralized application.

### Why StockFlow?
In many small-to-medium businesses, inventory is tracked manually using paper ledgers or detached Excel spreadsheets. This leads to:
- Frequent stock calculation discrepancies
- Missing records and unlogged shrinkage
- Difficulty tracking item replenishment and supplier orders
- Stockouts during peak sales periods

StockFlow solves these challenges by providing a secure, role-restricted digital platform where administrators and employees collaborate in real time to record transactions, maintain accurate product catalogs, monitor inventory thresholds, and generate actionable sales analytics.

- **Project Type**: Full-Stack Web Application
- **Project Level**: Intermediate
- **Development Duration**: 7 Days
- **Development Methodology**: Agile / Team-Based Development

---

## 🎯 Project Objectives

Derived directly from the project specification (`STOCKFLOW.pdf`), the core objectives are:

1. **Centralized Platform**: Provide a single, accessible system for all inventory and stock transactions.
2. **Product & Category Management**: Maintain an organized, searchable catalog of products, categories, and SKU identifiers.
3. **Supplier Directory**: Track vendor contact information, supply channels, and procurement associations.
4. **Stock Movement Auditing**: Accurately log Stock IN and Stock OUT operations with timestamps and employee attribution.
5. **Automated Stock Calculations**: Automatically update on-hand quantities immediately upon transactions.
6. **Low Stock Detection**: Identify items nearing depletion and display automated alerts to prevent stockouts.
7. **Sales Management**: Record sales orders, calculate line totals, verify stock availability, and deduct inventory atomically.
8. **Reporting & Analytics**: Deliver clear sales summaries, stock movement logs, and inventory valuation reports.
9. **Role-Based Security**: Enforce strict authentication and authorization rules for Administrators and Employees.
10. **Modern User Experience**: Deliver an intuitive, responsive interface optimized for desktop and mobile workflows.

---

## 💻 Technology Stack

Only packages and tools actively integrated into the repository are listed below:

### Backend
- **Runtime Environment**: [Node.js](https://nodejs.org/) (`^20.19.0 || >=22.12.0`)
- **Web Application Framework**: [Express.js](https://expressjs.com/) (v5.3.0)
- **Database & ODM**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (v9.12.0)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) (`jsonwebtoken` v9.0.3)
- **Password Security**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) (v3.0.3)
- **Security Middleware**: [Helmet](https://helmetjs.github.io/) (v8.3.0) & [CORS](https://github.com/expressjs/cors) (v2.8.6)
- **Configuration**: [dotenv](https://github.com/motdotla/dotenv) (v18.0.10)
- **Developer Tooling**: [Nodemon](https://nodemon.io/) (v3.1.14)

### Frontend
- **UI Library**: [React.js](https://react.dev/) (v19.3.1)
- **Build Tool**: [Vite](https://vitejs.dev/) (v8.3.6) with `@vitejs/plugin-react`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4.3.5) with `@tailwindcss/vite`
- **Routing**: [React Router DOM](https://reactrouter.com/) (v7.18.5)
- **HTTP Client**: [Axios](https://axios-http.com/) (v1.21.0)
- **Icons**: [Lucide React](https://lucide.dev/) (v1.70.0)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) (v2.6.1)
- **Data Visualization**: [Recharts](https://recharts.org/) (v3.10.1)

---

## 📦 Project Modules & Implementation Status

To maintain transparent team accountability across our 7-day Agile timeline, modules are categorized by their exact delivery status:

| # | Module Name | Status | Description & Current Scope |
|---|---|:---:|---|
| **1** | **Authentication & Authorization** | 🟢 **Implemented** | User registration (default: employee), login, JWT generation, password hashing with bcrypt, role authorization middleware, client-side session persistence via `AuthContext`, and guarded routing via `ProtectedRoute`. |
| **2** | **Dashboard Management** | 🟡 **In Development** | Responsive dashboard layout shell (`Sidebar`, `Navbar`, `DashboardLayout`) implemented. Role-specific home dashboards (`AdminDashboard`, `EmployeeDashboard`) created with initial metric cards; real-time aggregated counters and charts are being integrated. |
| **3** | **Product Management (CRUD)** | 🔵 **Planned (Sprint)** | Product catalog schema, SKU uniqueness, category/supplier references, cost/selling pricing, search, and category filtering. Currently accessible via protected placeholder routes `/admin/products` and `/employee/products`. |
| **4** | **Category Management** | 🔵 **Planned (Sprint)** | Category schema, creation, retrieval, updates, and deletion validation (preventing deletion if products reference the category). Currently accessible via `/admin/categories`. |
| **5** | **Supplier Management** | 🔵 **Planned (Sprint)** | Vendor directory storing supplier names, contact details, email, and addresses. Currently accessible via `/admin/suppliers`. |
| **6** | **Stock IN & OUT Management** | 🔵 **Planned (Sprint)** | Transactional inventory adjustments (Stock IN to receive goods, Stock OUT for usage/shrinkage) with mandatory employee tracking and transaction history logging. Currently accessible via `/admin/stock` and `/employee/stock`. |
| **7** | **Low Stock Alert** | 🔵 **Planned (Sprint)** | Automated threshold comparison (`product.quantity <= product.minStockLevel`) alerting staff on dashboard and catalog views. Planned for integration with Modules 2 & 3. |
| **8** | **Sales Management** | 🔵 **Planned (Sprint)** | Customer sale checkout engine: multi-item selection, real-time quantity validation, atomic stock decrement, and sales receipt logging. |
| **9** | **Sales & Inventory Reports** | 🔵 **Planned (Sprint)** | Date-range filtering, daily/monthly sales volume, stock movement logs, low-stock summaries, and Recharts graphical analytics. Currently accessible via `/admin/reports`. |

> **Status Legend**:  
> 🟢 **Implemented**: Code complete, tested, and actively functioning in the repository.  
> 🟡 **In Development**: Architecture and UI shell established; live data wiring in progress.  
> 🔵 **Planned (Sprint)**: Route shell configured; assigned to sprint interns for module development.

---

## 👥 User Roles & Permissions

Per `STOCKFLOW.pdf`, the system strictly enforces role privileges at both the backend middleware layer and frontend route guards:

| Capability / Action | Administrator (`admin`) | Employee (`employee`) |
|---|:---:|:---:|
| **Account Authentication** (Login / Logout) | ✅ Yes | ✅ Yes |
| **View Dashboard & Operational Analytics** | ✅ Yes (Full Analytics) | ✅ Yes (Operational Overview) |
| **View Products & Search Catalog** | ✅ Yes | ✅ Yes |
| **Create, Update & Delete Products** | ✅ Yes | ❌ Read-Only |
| **Manage Product Categories** | ✅ Yes | ❌ Read-Only |
| **Manage Supplier Directory** | ✅ Yes | ❌ View Only |
| **Record Stock IN / Receipts** | ✅ Yes | ✅ Yes |
| **Record Stock OUT / Dispatches** | ✅ Yes | ✅ Yes |
| **View Stock Movement History** | ✅ Yes | ✅ Yes |
| **View Low Stock Alerts** | ✅ Yes | ✅ Yes |
| **Record Sales Transactions** | ✅ Yes | ✅ Yes |
| **Generate Sales & Financial Reports** | ✅ Yes (Full Access) | ⚠️ Permitted Reports Only |
| **Create & Manage Employee Accounts** | ✅ Yes (`POST /employees`) | ❌ No Access |
| **Access Administrative Console** | ✅ Yes | ❌ Forbidden |

---

## 🏗️ Project Architecture

StockFlow adheres to a decoupled **MERN 3-Tier Architecture** with a strict **MVC (Model-View-Controller)** pattern on the backend:

```text
 ┌────────────────────────────────────────────────────────┐
 │                   React Client (Vite)                  │
 │   Components  •  Pages  •  Context API  •  Axios       │
 └───────────────────────────┬────────────────────────────┘
                             │  HTTP / JSON + Bearer JWT
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │               Express.js REST API Server               │
 │                                                        │
 │   Routes  ──►  Middleware  ──►  Controllers  ──► Model │
 │                (Auth & Role)     (Business)    (Mongoose)
 └───────────────────────────┬────────────────────────────┘
                             │  Mongoose ODM
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │                    MongoDB Database                    │
 │   Users  •  Products  •  Categories  •  Transactions   │
 └───────────────────────────┬────────────────────────────┘
```

### MVC Layer Responsibilities
- **Model**: Mongoose schemas enforcing database validation and business rules (`backend/models/UserModel.js`).
- **View**: React 19 single-page client rendering UI components and consuming JSON APIs.
- **Controller**: Express handlers executing business logic, hashing passwords, verifying thresholds, and generating responses (`backend/controllers/authControllers.js`, `backend/controllers/userController.js`).
- **Routes**: Declarative endpoint paths mapping HTTP verbs to controllers (`backend/routes.js`).
- **Middleware**: Intercepts requests for security header enforcement (`helmet`), CORS whitelisting, JWT authentication (`authMiddleware.js`), role validation (`roleMiddleware.js`), and centralized error handling (`errorMiddleware.js`).

---

## ⚠️ API Route Mount Convention Notice

> **IMPORTANT ARCHITECTURAL NOTE FOR THE TEAM**:
>
> 1. **Current Backend Route Mount**: In `backend/server.js`, routes are mounted directly at root (`app.use(routes)`). Current active endpoints are therefore located at `/register`, `/login`, `/profile`, `/employees`, and `/admin-dashboard`.
> 2. **Project Specification Convention**: The specification document (`STOCKFLOW.pdf`) specifies that future business endpoints use the `/api/...` prefix (e.g. `/api/products`, `/api/categories`, `/api/suppliers`, `/api/inventory/stock-in`).
> 3. **Team Decision Required**: Before implementing upcoming modules, the Project Lead and team must formally agree whether to mount all backend routes under `app.use("/api", routes)` in `backend/server.js`.
> 4. **Current Working Configuration**: In `fronend/src/services/axiosConfig.js`, Axios uses `import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"`, which preserves the current working root mount while supporting `/api` via `.env` whenever the team chooses to transition.

---

## 📁 Current Folder Structure

```text
StockFlow – Inventory Management System/
├── .gitignore                          # Master monorepo git exclusion rules
├── README.md                           # Master project documentation
│
├── backend/                            # Express & Node.js API server
│   ├── config/
│   │   └── db.js                       # MongoDB connection logic
│   ├── controllers/
│   │   ├── authControllers.js          # Authentication business logic
│   │   └── userController.js           # User/Employee management logic
│   ├── middleware/
│   │   ├── authMiddleware.js           # JWT Bearer token verification
│   │   ├── errorMiddleware.js          # Centralized error handler
│   │   └── roleMiddleware.js           # Role-based access control (RBAC)
│   ├── models/
│   │   └── UserModel.js                # User & Employee Mongoose schema
│   ├── .env.example                    # Sample backend environment template
│   ├── .gitignore                      # Backend-specific ignore rules
│   ├── package.json                    # Backend dependencies and scripts
│   ├── routes.js                       # Central route registry
│   ├── seedAdmin.js                    # Bootstrap script for root administrator
│   ├── server.js                       # Express app entrypoint & server listener
│   └── README.md                       # Backend technical manual
│
└── fronend/                            # React 19 + Vite client application
    ├── public/
    │   ├── favicon.svg                 # Application favicon
    │   └── icons.svg                   # Brand SVG icons
    ├── src/
    │   ├── assets/                     # Static media and logos
    │   ├── components/
    │   │   ├── common/
    │   │   │   └── PlaceholderPage.jsx # Reusable shell for developing modules
    │   │   └── layout/
    │   │       ├── DashboardLayout.jsx # Master layout wrapper
    │   │       ├── Navbar.jsx          # Top bar with user profile & logout
    │   │       └── Sidebar.jsx         # Responsive role-based navigation bar
    │   ├── context/
    │   │   └── AuthContext.jsx         # React Context providing session state
    │   ├── hooks/                      # Custom React hooks (ready for extensions)
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   └── AdminDashboard.jsx  # Admin primary workspace
    │   │   ├── auth/
    │   │   │   ├── Login.jsx           # User login interface
    │   │   │   └── Register.jsx        # Employee account registration interface
    │   │   └── employee/
    │   │       └── EmployeeDashboard.jsx # Staff primary workspace
    │   ├── routes/
    │   │   └── ProtectedRoute.jsx      # Role & authentication route guard
    │   ├── services/
    │   │   ├── authApi.js              # Auth API abstraction calls
    │   │   └── axiosConfig.js          # Preconfigured Axios instance with interceptors
    │   ├── utils/                      # Helper formatting utilities
    │   ├── App.jsx                     # Route declarations
    │   ├── index.css                   # Tailwind v4 import
    │   └── main.jsx                    # Root React DOM entrypoint
    ├── .env.example                    # Sample frontend environment template
    ├── .gitignore                      # Frontend-specific ignore rules
    ├── index.html                      # HTML entrypoint
    ├── package.json                    # Frontend dependencies and scripts
    ├── vite.config.js                  # Vite & Tailwind build plugins
    └── README.md                       # Frontend technical manual
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: `^20.19.0 || >=22.12.0` (Node 22 LTS is recommended; required by Vite 8)
- **npm**: `v9.x` or higher
- **MongoDB**: Local MongoDB instance running on port `27017` or a MongoDB Atlas cloud cluster

---

### Step 1: Clone the Repository
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd "StockFlow – Inventory Management System"
```

---

### Step 2: Backend Setup
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - **Windows PowerShell**:
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Linux / macOS (Bash)**:
     ```bash
     cp .env.example .env
     ```
   Open `.env` and configure your local values:
   ```ini
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/stockflow
   JWT_SECRET=your_super_secret_jwt_key
   ADMIN_NAME=Admin User
   ADMIN_EMAIL=admin@stockflow.com
   ADMIN_PASSWORD=AdminPassword123!
   ```
4. Seed the initial Administrator account:
   ```bash
   npm run seed:admin
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will boot on `http://localhost:5000`.*

---

### Step 3: Frontend Setup
1. In a new terminal, navigate into the frontend directory:
   ```bash
   cd fronend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - **Windows PowerShell**:
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Linux / macOS (Bash)**:
     ```bash
     cp .env.example .env
     ```
   Verify the API URL inside `.env`:
   ```ini
   VITE_API_BASE_URL=http://localhost:5000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client will launch automatically at `http://localhost:5173`.*

---

## 👥 Team Development Workflow

To ensure smooth progress across our 7-day Agile timeline, all team members (Project Lead and Interns) must follow this workflow:

### 1. Role Responsibilities
- **Project Lead**:
  - Maintains repository integrity, architecture standards, and code reviews.
  - Configures environment templates, repository standards, and database seed scripts.
  - Approves and merges Pull Requests (PRs) into the `main` branch.
- **Intern Developers**:
  - Develop assigned modules in isolated feature branches.
  - Write clean, commented JavaScript (JSX) adhering to existing project standards.
  - Submit Pull Requests with descriptive summaries and screenshots.

### 2. Branching Strategy
- `main`: Production-ready, stable codebase. Direct commits are restricted.
- `dev`: Primary integration branch for active sprint development.
- `feature/<module-name>`: Work branches created for specific modules (e.g., `feature/product-crud`, `feature/supplier-api`).

### 3. Step-by-Step Feature Workflow
1. **Pull Latest Changes**:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/product-management
   ```
3. **Commit Incrementally**:
   ```bash
   git add .
   git commit -m "feat(products): create product schema and validation logic"
   ```
4. **Push & Open Pull Request**:
   ```bash
   git push origin feature/product-management
   ```
   Open a PR against the `dev` branch on GitHub.
5. **Code Review & Merge**:
   - At least one code review approval from the Project Lead is required.
   - All build checks (`npm run build`) must pass before merging.

---

*StockFlow – Inventory Management System · Developed under Agile Sprint Methodology*
