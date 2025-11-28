# E-commerce API (Node.js + Express + MongoDB)

A modular and scalable E-commerce REST API built with Node.js, Express, and MongoDB.  
Includes authentication, product management, categories, cart system, orders, and admin capabilities.

---

##  Features

###  Authentication
- Register / Login
- JWT Access & Refresh Tokens
- Logout (token invalidation)
- Protected routes
- Admin role support

###  Products & Categories
- Full CRUD for products
- Full CRUD for categories
- Filtering + search + pagination


###  Orders
- Create orders from cart
- Order history for users
- Admin access to all orders

---

## Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── utils/
 └── server.js
```

---

## 🔑 Environment Variables

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce-api
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

##  API Endpoints

### **Users — `/api/users`**
| Method | Route | Description |
|--------|--------|-------------|
| POST | /register | Register |
| POST | /login | Login |
| POST | /token | Refresh token |
| POST | /logout | Logout |
| GET | /me | Profile |
| PUT | /me | Update profile |
| GET | / | Admin: get users |

---

### **Products — `/api/products`**
| Method | Route | Description |
|--------|--------|-------------|
| POST | / | Create product |
| GET | / | Get products |
| GET | /:id | Get product |
| PUT | /:id | Update |
| DELETE | /:id | Delete |

---

### **Categories — `/api/categories`**

| Method | Route | Description |
|--------|--------|-------------|
| POST | / | Create |
| GET | / | Get all |
| PUT | /:id | Update |
| DELETE | /:id | Delete |

---

### **Cart — `/api/cart`**

| Method | Route | Description |
|--------|--------|-------------|
| GET | / | Get user cart |
| POST | /add | Add product |
| PUT | /update | Change qty |
| DELETE | /remove/:id | Remove product |
| DELETE | /clear | Clear cart |

---

### **Orders — `/api/orders`**

| Method | Route | Description |
|--------|--------|-------------|
| POST | / | Create order |
| GET | / | Get user orders |
| GET | /all | Admin: all orders |

---

##  Postman Collection

```
postman/Ecommerce-API.postman_collection.json
```

---

##  Run Project

```
npm install
npm run dev
```
