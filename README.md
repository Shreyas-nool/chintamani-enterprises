# Chintamani Enterprises

### Employee Field Service Management System

Chintamani Enterprises is a web-based employee field service management system designed to manage employees, attendance, job assignments, and administrative operations.

## 🌐 Live Website

**Website:** [https://YOUR-FRONTEND-URL.onrender.com](https://chintamani-frontend.onrender.com)

> Replace `https://YOUR-FRONTEND-URL.onrender.com` with your actual frontend Static Site URL from Render.

## 🚀 Features

- Employee registration and login
- Google Sign-In
- Admin dashboard
- Employee management
- Employee attendance management
- Employee profile management
- Job creation and assignment
- Technician and employee tracking
- MongoDB database integration
- Responsive web interface

## 🛠️ Technologies Used

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB Atlas
- Mongoose

**Authentication**
- JWT authentication
- Google Sign-In

**Deployment**
- GitHub
- Render
- MongoDB Atlas

## 📁 Project Structure

```text
chintamani-enterprises/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── employee-attendance.html
│   ├── employee-profile.html
│   └── admin-employee.html
└── README.md
```

*Note: The structure above is illustrative. Your actual repository may contain additional files and folders.*

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Shreyas-nool/chintamani-enterprises.git
```

### 2. Install backend dependencies

```bash
cd chintamani-enterprises/backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` directory and configure the required environment variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

Replace the example values with your own credentials. Never publish your `.env` file or database passwords to GitHub.

### 4. Start the backend

```bash
npm start
```

### 5. Open the frontend

Run the frontend using a local web server or the development setup configured for the project.

## ☁️ Deployment

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

## 🔐 Security

- Keep environment variables and secrets private.
- Configure Google OAuth with the correct authorized JavaScript origins.
- Use appropriate authentication and authorization for admin and employee accounts.

## 👨‍💻 Project

**Chintamani Enterprises — Employee Field Service Management System**

Developed to simplify employee management, attendance tracking, and field service operations.
