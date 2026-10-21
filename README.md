# Chintamani Enterprises — Employee Field Service Management

Chintamani Enterprises is a web-based Employee Field Service Management application designed to simplify employee management, job assignments, attendance tracking, and administrative operations.

## Features

- **Admin Dashboard:** Manage employees and monitor field service operations.
- **Employee Management:** Organize employee details and roles.
- **Job Management:** Create, assign, and track service jobs.
- **Attendance Tracking:** Record check-in and check-out times.
- **Authentication:** Employee ID and password login.
- **Google Sign-In:** Google authentication integration.
- **Job History:** View completed jobs and track work progress.
- **Responsive Interface:** Access the application through a web browser.

## Technology Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- JSON Web Tokens (JWT)
- Google Sign-In

## Project Structure

```text
chintamani-enterprises/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── index.html
    ├── app.js
    ├── style.css
    └── logo.png
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB, either locally or through MongoDB Atlas
- A Google OAuth client ID if Google Sign-In is enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shreyas-nool/chintamani-enterprises.git
   ```

2. Open the project directory and navigate to the backend:

   ```bash
   cd chintamani-enterprises/backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file inside the backend directory and configure the required environment variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_private_jwt_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

5. Start the backend using the command configured in your project:

   ```bash
   node server.js
   ```

6. Open `frontend/index.html` through a local development server, such as VS Code Live Server, and configure the frontend API URL to point to your backend.

## Deployment

The application can be deployed using hosting services such as Render for the frontend and backend, and MongoDB Atlas for the cloud database. Configure environment variables and the production API URL before deployment.

## Security

- Never commit `.env` files, database credentials, or private secrets.
- Use strong passwords and secure authentication settings.
- Restrict access to administrative features and employee data.

## License

No license has been specified yet.
