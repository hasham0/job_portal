# Job Portal Application

A full-stack modern job portal application connecting job seekers and employers. Built with **MERN Stack** (MongoDB, Express.js, React, Node.js) with **TypeScript** support.

## 📋 Overview

This platform facilitates connections between job seekers and employers with role-based access control, comprehensive job management features, and company profiles. The application is built using modern web technologies for optimal performance and user experience.

## 🚀 Project Structure

    job-portal/
    ├── backend/                # Backend Node.js application
    │   ├── src/
    │   │   ├── app.js          # Express app setup
    │   │   ├── controllers/    # Route controllers
    │   │   ├── middlewares/    # Custom middlewares
    │   │   ├── models/         # MongoDB models
    │   │   ├── routes/         # API routes
    │   │   └── lib/            # Utility functions
    │   └── package.json
    ├── frontend/               # React TypeScript frontend
        ├── src/
        │   ├── components/     # Reusable UI components
        │   ├── pages/          # Page components
        │   ├── lib/            # Utility functions
        │   ├── hooks/          # Custom React hooks
        │   └── redux/          # Redux state management
        └── package.json

## ✨ Features

### 🔐 User Authentication

-   Login/Register with **role-based access** (Student, Recruiter, Admin)
-   JWT-based authentication
-   Profile management with resume upload
-   Secure password hashing

### 🏢 Company Management (Admin)

-   Create and update company profiles
-   Manage company details:
    -   Name
    -   Description
    -   Website
    -   Location
-   Company logo upload
-   Company verification system
-   Assign multiple recruiters to companies
-   Analytics dashboard

### 💼 Job Management

-   Create and update job listings
-   Job details include:
    -   Title
    -   Description
    -   Location
    -   Salary
    -   Required skills
    -   Experience level
    -   Job type (Full-time, Part-time, etc.)
    -   Number of open positions
-   Advanced job search and filtering

### 📄 Job Applications

-   Students can apply to jobs
-   Track application status
-   Recruiters can view total applicants per job
-   Resume uploads on application

## 🛠️ Technology Stack

### Frontend

-   React 18 with TypeScript
-   Redux Toolkit for state management
-   React Hook Form for form handling
-   Tailwind CSS for styling
-   Axios for API calls
-   React Router v6 for navigation

### Backend

-   Node.js with Express
-   MongoDB & Mongoose
-   JWT for authentication
-   Multer for file uploads
-   Express Validator for input validation

## 📑 API Documentation

### 📋 Auth Routes

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| POST   | /api/auth/register          | Register new user              |
| POST   | /api/auth/login             | User login                     |
| GET    | /api/auth/profile           | Get authenticated user profile |
| POST   | /api/v1/users/profileUpdate | Update user profile            |

### 📋 Company Routes

| Method | Endpoint                                   | Description            |
| ------ | ------------------------------------------ | ---------------------- |
| GET    | /api/v1/companies                          | Get all companies      |
| POST   | /api/v1/companies/registerCompany          | Register a new company |
| PUT    | /api/v1/companies/updateCompanyDetails/:id | Update company details |

### 📋 Job Routes

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | /api/v1/jobs            | List all jobs      |
| POST   | /api/v1/jobs/create     | Create new job     |
| PUT    | /api/v1/jobs/update/:id | Update job details |
| DELETE | /api/jobs/:id           | Delete a job       |

### 📋 Application Routes

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | /api/applications      | Submit job application    |
| GET    | /api/applications/user | Get user's applications   |
| PUT    | /api/applications/:id  | Update application status |

## 🛠️ Setup and Installation

1.  **Clone the repository**

    git clone https://github.com/your-username/job-portal.git
    cd job-portal

2.  **Backend Setup**

    cd backend
    npm install
    npm run dev

3.  **Frontend Setup**

    cd frontend
    npm install
    npm run dev

4.  **Environment Variables** Create a `.env` file in the backend directory with the following variables:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET_KEY=your_jwt_secret

## 💻 Usage

### For Job Seekers

-   Create an account with Student role
-   Complete profile and upload resume
-   Search for jobs using filters
-   Apply to jobs with a single click
-   Track application status

### For Recruiters

-   Create an account with Recruiter role
-   Create and manage job listings
-   Review applications
-   Contact qualified candidates

### For Admins

-   Manage all users, companies and job listings
-   Verify company profiles
-   Monitor platform analytics
-   Assign recruiters to companies

## 📚 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
