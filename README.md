# ShopHub — Full Stack Ecommerce

A complete ecommerce application with **React** frontend and **Spring Boot** backend.

## Features

- Product catalog with search and category filters
- User registration and JWT authentication
- Shopping cart (add, update, remove items)
- Checkout with shipping address
- Order history and order details
- Responsive modern UI
- H2 in-memory database with sample products

## Project Structure

```
ecommerce/
├── backend/          # Spring Boot REST API (port 8080)
├── src/              # React frontend (port 3000)
├── public/
└── package.json
```

## Prerequisites

- **Java 17+** (JDK installed)
- **Node.js 18+** and npm

## Getting Started

### 1. Start the Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The API runs at `http://localhost:8080`

- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:shopdb`
  - Username: `sa`
  - Password: *(empty)*

### 2. Start the Frontend

Open a new terminal:

```powershell
cd ecommerce
npm start
```

The app opens at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/products` | No | List all products |
| GET | `/api/products?q=` | No | Search products |
| GET | `/api/products?category=` | No | Filter by category |
| GET | `/api/products/{id}` | No | Product details |
| GET | `/api/categories` | No | List categories |
| GET | `/api/cart` | Yes | Get user cart |
| POST | `/api/cart/items` | Yes | Add item to cart |
| PUT | `/api/cart/items/{id}?quantity=` | Yes | Update quantity |
| DELETE | `/api/cart/items/{id}` | Yes | Remove from cart |
| POST | `/api/orders` | Yes | Place order |
| GET | `/api/orders` | Yes | List user orders |
| GET | `/api/orders/{id}` | Yes | Order details |

## Tech Stack

**Frontend:** React 19, React Router, Axios, CSS  
**Backend:** Spring Boot 3.4, Spring Security, JWT, Spring Data JPA, H2  
**Build:** Maven Wrapper (no global Maven required), Create React App

## Demo Flow

1. Browse products on the home page
2. Click **Sign Up** to create an account
3. Add products to cart from product detail page
4. Go to **Cart** → **Proceed to Checkout**
5. Enter shipping address and place order
6. View order confirmation and history under **Orders**
7. ### Git Pull Test Line!

