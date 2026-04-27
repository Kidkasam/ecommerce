# Full-Stack Ecommerce Platform

A professional, feature-rich ecommerce application built with a modern tech stack. This project demonstrates a seamless integration between a Django REST Framework backend and a React/Vite frontend.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication (Login, Register, OTP Verification).
- **Product Management**: Dynamic product catalog with category-based filtering.
- **Shopping Cart**: Real-time cart management.
- **Order System**: Efficient order processing and tracking.
- **Payment Integration**: Secure transactions powered by Stripe.
- **Responsive UI**: Modern, responsive design for all screen sizes.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Vanilla CSS
- **API Communication**: Axios
- **State Management**: Context API

### Backend
- **Framework**: Django & Django REST Framework
- **Authentication**: SimpleJWT
- **Payments**: Stripe API
- **Database**: SQLite (Development)

## 📦 Installation & Setup

### Prerequisites
- Node.js & npm
- Python 3.x

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ecommerce_backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers stripe djangorestframework-simplejwt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ecommerce_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Ensure you have a `.env` file in the `ecommerce_backend` directory with the following:
- `STRIPE_SECRET_KEY`
- `DEBUG`
- `SECRET_KEY`

---
*Developed as a full-stack portfolio project.*
