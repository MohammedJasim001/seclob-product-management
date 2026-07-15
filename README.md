# Product Management App

A full-stack Product Management application built with the MERN stack that allows users to manage categories, subcategories, and products through a clean and responsive interface.

## Features

### Authentication
- User registration and login
- JWT authentication using HTTP-only cookies
- Protected routes
- Access token refresh

### Category Management
- Create new categories
- View all categories

### Subcategory Management
- Create subcategories
- Assign subcategories to categories
- View subcategories grouped under their respective categories

### Product Management
- Create products
- Upload multiple product images
- Add multiple product variants (RAM, Price, Quantity)
- Edit product details
- Associate products with subcategories
- View product details

### UI
- Responsive design
- Reusable UI components
- Toast notifications
- Loading states
- Form validation

---

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS
- React Router
- Sonner

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Cookie Parser

---

## Project Structure

```
product-management-assignment/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/MohammedJasim001/seclob-product-management
```

```
cd product-management-assignment
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5010

MONGO_URI=your_mongodb_connection

JWT_SECRET_KEY=your_secret_key

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run the server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file.

```env
VITE_BACKEND_DEV_URL=http://localhost:5010
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## API Overview

### Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/get-access-token
```

### Categories

```
POST /api/category/create

GET /api/category/all
```

### Subcategories

```
POST /api/sub-category/create

GET /api/sub-category/all
```

### Products

```
POST /api/product/create

GET /api/product/all

GET /api/product/:id

PATCH /api/product/edit/:id
```

---

## Folder Architecture

### Backend

```
src/

config/

controllers/

middlewares/

models/

routes/

services/

types/

utils/
```

### Frontend

```
src/

components/

pages/

redux/

services/

types/

hooks/

utils/
```

---

## Design Decisions

- MVC architecture for backend
- Redux Toolkit for global state management
- Axios instance with authentication interceptor
- Reusable UI components (Button, Input, Select)
- FormData used for image uploads
- Cloudinary for image storage

---

## Future Improvements

Due to the assignment time constraints, the following features are planned but not implemented:

- Product Search
- Pagination


---

## Author

**Mohammed Jasim**

GitHub: https://github.com/MohammedJasim001