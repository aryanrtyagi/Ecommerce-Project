# 🛒 Ecommerce Project

A full-stack Ecommerce web application built using **React.js** and **Django REST Framework** with JWT authentication, cart functionality, Cloudinary image hosting, and deployment on Render.

---

# 🚀 Live Demo

## Frontend

Add your frontend deployed URL here.

## Backend API

Add your backend deployed URL here.

---

# ✨ Features

## 👤 Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Persistent Login

## 🛍️ Ecommerce Features

* Product Listing
* Product Details Page
* Add to Cart
* Update Cart Quantity
* Remove From Cart
* Buy Now Functionality

## ☁️ Cloud Features

* Cloudinary Image Uploads
* Render Deployment
* REST APIs

## 🎨 UI Features

* Responsive Design
* Modern Product Cards
* Hover Effects
* Clean Layout

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router
* Tailwind CSS
* Context API

## Backend

* Django
* Django REST Framework
* JWT Authentication

## Database

* SQLite

## Cloud & Deployment

* Render
* Cloudinary

---

# 📂 Project Structure

```bash
Ecommerce-Project/
│
├── backend/
│   ├── backend/
│   ├── store/
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/Ecommerce-Project.git
cd Ecommerce-Project
```

---

# 🔧 Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend runs on:

```bash
http://127.0.0.1:8000/
```

---

# 🎨 Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173/
```

---

# 🔐 Environment Variables

## Frontend `.env`

```env
VITE_DJANGO_BASE_URL=your_backend_url
```

---

# ☁️ Cloudinary Setup

Add these in backend environment variables:

```env
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

---

# 📸 Screenshots

Add screenshots of:

* Home Page
* Product Details
* Cart Page
* Login Page
* Admin Dashboard

---

# 📌 Future Improvements

* Product Search
* Product Filters
* Razorpay/Stripe Payment Integration
* Order History
* Wishlist
* PostgreSQL Integration
* Seller Dashboard
* Role-Based Authentication

---

# 👨‍💻 Author

Aryan Tyagi

* GitHub: [https://github.com/aryanrtyagi](https://github.com/aryanrtyagi)
* LinkedIn: Add your LinkedIn profile link

---

# ⭐ If You Like This Project

Give this repository a star ⭐ on GitHub.
