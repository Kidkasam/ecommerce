# 👕 Premium Menswear & Sustainable Fashion Store

A high-performance, full-stack ecommerce application designed for modern fashion brands. This project features a seamless integration between a **Django REST Framework** backend and a **React + Vite** frontend, optimized for speed, aesthetics, and security.

---

## 📖 About the Project

This platform is more than just an online shop; it's a dedicated space for **Premium Menswear and Sustainable Fashion**. The project was built to demonstrate how modern web technologies can be leveraged to create a premium, high-converting shopping experience.

### Why This Project?
- **Modern Aesthetics**: Leveraging **Framer Motion** for fluid animations and a custom-designed UI that rivals top-tier fashion brands.
- **Sustainable Focus**: Built with a vision for eco-friendly retail, featuring sections for sustainable fabric awareness and modern silhouettes.
- **Scalable Architecture**: The Django backend is structured to handle complex product catalogs, inventory management, and secure user data.

---

## 🚀 Key Features

- **🔐 Secure Authentication**: JWT-based login, registration, and OTP verification for user safety.
- **🛒 Dynamic Shopping Experience**: Real-time cart updates, product details, and category-based browsing.
- **💳 Professional Checkout**: Integrated with **Stripe** for reliable, secure payment processing.
- **📦 Inventory Management**: Robust backend tracking for products, categories, and stock levels.
- **📱 Fully Responsive**: A mobile-first design approach ensuring a perfect experience on any device.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 19 (Vite)
- **Animations**: Framer Motion
- **API Client**: Axios
- **Icons**: React Icons / Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Framework**: Django & Django REST Framework
- **Authentication**: SimpleJWT
- **Payments**: Stripe API
- **Database**: SQLite (scalable to PostgreSQL)

---

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js & npm
- Python 3.10+

### 2. Backend Setup
```bash
cd ecommerce_backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install django djangorestframework django-cors-headers stripe djangorestframework-simplejwt pillow
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd ecommerce_frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `ecommerce_backend` directory:
- `STRIPE_SECRET_KEY`
- `DEBUG`
- `SECRET_KEY`

---
*Developed as a high-end portfolio project focusing on modern retail solutions.*
