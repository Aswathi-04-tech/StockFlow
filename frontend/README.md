# StockFlow – Frontend Application

> **Single Page Application (SPA) for the StockFlow Inventory Management System, built with React 19, Vite, and Tailwind CSS.**

---

## 📖 Table of Contents

1. [Frontend Overview](#-frontend-overview)
2. [Technologies & Dependencies](#-technologies--dependencies)
3. [Frontend Folder Structure](#-frontend-folder-structure)
4. [Installation & Setup](#-installation--setup)
5. [Environment Configuration & API Route Convention](#-environment-configuration--api-route-convention)
6. [Axios Configuration & Verified Interceptors](#-axios-configuration--verified-interceptors)
7. [Authentication & Routing Flow](#-authentication--routing-flow)
8. [Application Route Map](#-application-route-map)
9. [Running the Frontend](#-running-the-frontend)
10. [Production Build](#-production-build)

---

## 📌 Frontend Overview

The StockFlow client application provides a fast, responsive user interface for inventory management, stock transactions, role-based workflows, and sales reporting. It connects to the Express REST API, stores authentication sessions locally, prevents cross-role privilege escalation via route guards, and offers a dark, glassmorphic design system using Tailwind CSS and Lucide icons.

---

## 🛠️ Technologies & Dependencies

All dependencies listed below are actively installed in `fronend/package.json`:

| Package | Version | Purpose |
|---|---|---|
| **`react`** | `^19.3.1` | Core React library for building declarative UI components. |
| **`react-dom`** | `^19.3.1` | React package for DOM rendering. |
| **`vite`** | `^8.3.6` | Next-generation frontend build tool and local development server. |
| **`tailwindcss`** | `^4.3.5` | Modern utility-first CSS framework configured via `@tailwindcss/vite`. |
| **`react-router-dom`** | `^7.18.5` | Client-side routing, navigation guards, and dynamic history management. |
| **`axios`** | `^1.21.0` | Promise-based HTTP client with request and response interceptors. |
| **`lucide-react`** | `^1.70.0` | Modern SVG iconography across navigation, actions, and status indicators. |
| **`react-hot-toast`** | `^2.6.1` | Notification toaster for feedback, error handling, and success alerts. |
| **`recharts`** | `^3.10.1` | Composable charting library for dashboard and sales reporting visualizations. |

---

## 📁 Frontend Folder Structure

```text
fronend/
├── public/
│   ├── favicon.svg              # Browser tab favicon
│   └── icons.svg                # Brand SVG vectors
├── src/
│   ├── assets/                  # Media files (hero.png, logos)
│   ├── components/
│   │   ├── common/
│   │   │   └── PlaceholderPage.jsx # Reusable shell for upcoming feature modules
│   │   └── layout/
│   │       ├── DashboardLayout.jsx # Master layout wrapping Sidebar and Navbar
│   │       ├── Navbar.jsx          # Top navigation bar with user badge & Logout
│   │       └── Sidebar.jsx         # Role-aware responsive drawer navigation
│   ├── context/
│   │   └── AuthContext.jsx      # Global React Context provider for user sessions
│   ├── hooks/                   # Custom reusable React hooks (prepared for expansion)
│   ├── pages/
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx  # Primary workspace for Administrators
│   │   ├── auth/
│   │   │   ├── Login.jsx           # User sign-in interface
│   │   │   └── Register.jsx        # Employee account registration interface
│   │   └── employee/
│   │       └── EmployeeDashboard.jsx # Primary workspace for Staff members
│   ├── routes/
│   │   └── ProtectedRoute.jsx   # Role verification and authentication guard
│   ├── services/
│   │   ├── authApi.js           # API calls for login and registration
│   │   └── axiosConfig.js       # Pre-configured Axios instance with verified interceptors
│   ├── utils/                   # Shared utility and formatting helpers
│   ├── App.jsx                  # Central Route table and page mapping
│   ├── index.css                # Global CSS with Tailwind v4 `@import "tailwindcss"`
│   └── main.jsx                 # Client entrypoint mounting BrowserRouter & AuthProvider
├── .env.example                 # Environment template for frontend variables
├── .gitignore                   # Ignores node_modules, .env, and dist/
├── index.html                   # HTML host template
├── package.json                 # Frontend dependencies and npm scripts
└── vite.config.js               # Vite bundler plugins (React & Tailwind)
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: `^20.19.0 || >=22.12.0` (Node 22 LTS recommended; required by Vite 8)
- **npm**: `v9.x` or higher

### Steps
1. **Navigate to the frontend directory**:
   ```bash
   cd fronend
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   - **Windows PowerShell**:
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Linux / macOS (Bash)**:
     ```bash
     cp .env.example .env
     ```

---

## ⚙️ Environment Configuration & API Route Convention

The frontend relies on Vite environment variables prefixed with `VITE_`.

```ini
VITE_API_BASE_URL=http://localhost:5000
```

### ⚠️ API Mount Convention Notice
- **Actual Current Backend State**: In `backend/server.js`, routes are mounted with `app.use(routes)`. Endpoints are currently available at `http://localhost:5000/login`, `http://localhost:5000/register`, etc.
- **Project Specification**: The specification document (`STOCKFLOW.pdf`) specifies `/api/...` for future business modules.
- **Frontend Fallback**: To preserve working authentication against the current backend without breaking, `fronend/src/services/axiosConfig.js` sets:
  ```javascript
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
  ```
  If the Project Lead decides to update the backend route mounting to `app.use("/api", routes)`, simply set `VITE_API_BASE_URL=http://localhost:5000/api` in your `.env` without modifying React source code.

---

## 🌐 Axios Configuration & Verified Interceptors

All HTTP requests pass through the centralized Axios instance declared in `fronend/src/services/axiosConfig.js`. Both interceptors have been verified in the source code:

### 1. Base URL Configuration
```javascript
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
```

### 2. Verified Request Interceptor (JWT Injection)
Before every outgoing request, the interceptor checks `localStorage` for an active `token`. If present, it attaches it to the `Authorization` header automatically:
```javascript
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 3. Verified Response Interceptor (Scoped 401 Session Handling)
The response interceptor handles expired sessions without breaking public authentication forms:
- Defines `PUBLIC_AUTH_ROUTES = ["/login", "/register"]`.
- When an endpoint returns `401 Unauthorized` on a protected route, it wipes `localStorage` (`token` and `user`) and hard-redirects the browser to `/login`.
- If the `401` originates from public auth endpoints (`/login` or `/register`), it **does not** trigger a redirect, enabling form components to catch the error and display backend error messages (e.g. `"Invalid credentials"`) via `react-hot-toast`.
- Always re-rejects the error via `Promise.reject(error)` so callers retain access to response data.

---

## 🔐 Authentication & Routing Flow

```text
               ┌───────────────────────┐
               │    User Enters App    │
               └───────────┬───────────┘
                           │
                 Is user authenticated?
                /                      \
             NO                         YES
             ▼                           ▼
      Redirect /login           Access Target Route
             │                           │
    Submits Credentials          Does user role match
             │                     required role?
      AuthContext.login()       /                  \
             │                YES                   NO
       Saves to Storage        ▼                     ▼
       Redirects to       Render Page      Redirect to Assigned
     Assigned Dashboard                     Dashboard (/admin or /employee)
```

1. **`AuthContext.jsx`**: Provides global session state (`user`, `token`, `isAuthenticated`, `login`, `logout`). Restores existing sessions from `localStorage` on initial page load.
2. **`Login.jsx`**: Controlled form with client-side validation, password visibility toggle, and error handling via `react-hot-toast`. Calls `login()` and redirects users based on their assigned role (`admin` → `/admin`, `employee` → `/employee`).
3. **`Register.jsx`**: Allows employees to create an account. Validates email format, password length, and password confirmation before calling `registerApi()`.
4. **`ProtectedRoute.jsx`**: Wraps authenticated routes. Checks whether the user is logged in, and whether their role matches `requiredRole`. Unauthorized role access attempts are automatically redirected to their appropriate dashboard.
5. **`DashboardLayout.jsx`**: Common container rendering the responsive `Sidebar`, `Navbar`, and dynamic page viewport.
6. **`Navbar.jsx`**: Displays user identity, role badge, mobile sidebar toggle, and an active **Logout** button.
7. **`Sidebar.jsx`**: Automatically adjusts navigation menu options according to the user's role:
   - **Admin Navigation (7 items)**: Dashboard, Products, Categories, Suppliers, Stock Management, Employees, Reports.
   - **Employee Navigation (3 items)**: Dashboard, Products, Stock Management.
   - Note: The duplicate Logout button was removed from the Sidebar to avoid redundancy; Logout is centralized in the Navbar.

---

## 🗺️ Application Route Map

All routes declared in `fronend/src/App.jsx`:

| Route Path | Access Level | Role Required | Component Rendered | Description |
|---|:---:|:---:|---|---|
| `/` | *Public* | None | `<Navigate to="/login" />` | Default entrypoint redirecting to Login. |
| `/login` | *Public* | None | `<Login />` | User authentication sign-in form. |
| `/register` | *Public* | None | `<Register />` | Employee registration form. |
| `/admin` | Protected | `admin` | `<AdminDashboard />` | Main administrative operations dashboard. |
| `/admin/products` | Protected | `admin` | `<PlaceholderPage />` | Product catalog administration shell. |
| `/admin/categories` | Protected | `admin` | `<PlaceholderPage />` | Category management shell. |
| `/admin/suppliers` | Protected | `admin` | `<PlaceholderPage />` | Supplier and vendor management shell. |
| `/admin/stock` | Protected | `admin` | `<PlaceholderPage />` | Stock audit and inventory adjustments shell. |
| `/admin/employees` | Protected | `admin` | `<PlaceholderPage />` | Staff account creation and role management shell. |
| `/admin/reports` | Protected | `admin` | `<PlaceholderPage />` | Sales and stock reports analytics shell. |
| `/employee` | Protected | `employee` | `<EmployeeDashboard />` | Staff operational dashboard. |
| `/employee/products`| Protected | `employee` | `<PlaceholderPage />` | Product catalog search and lookup shell. |
| `/employee/stock` | Protected | `employee` | `<PlaceholderPage />` | Stock IN and Stock OUT operations shell. |
| `*` | *Public* | None | `<Navigate to="/login" />` | Catch-all 404 fallback redirecting to Login. |

---

## 🏃 Running the Frontend

The following scripts are verified from `fronend/package.json`:

### Start Development Server
Launches the Vite development server with Hot Module Replacement (HMR) and automatically opens your default browser:
```bash
npm run dev
```

### Run Linter
Checks source code against project ESLint configuration:
```bash
npm run lint
```

---

## 📦 Production Build

### Compile for Production
Generates an optimized, minified production build in the `dist/` directory:
```bash
npm run build
```

### Preview Production Build
Locally tests and serves the generated production bundle:
```bash
npm run preview
```

---

*StockFlow Frontend · React 19 + Vite Application*
