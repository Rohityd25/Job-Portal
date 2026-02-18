# Job Portal - Complete Project Guide & Interview Preparation

This document provides a comprehensive overview of the Job Portal project, designed to help you understand the architecture, code flow, and answer interview questions confidently.

---

## 1. Project Overview

**Project Name:** Job Portal Application
**Core Functionality:** A web application connecting Job Seekers with Recruiters. Recruiters can post jobs, and Job Seekers can view and apply for them.
**Architecture:** Monolithic architecture with a separated frontend (React) and backend (Spring Boot), communicating via REST APIs.

### Key Features
1.  **Authentication & Authorization:** Secure login/registration using JWT (JSON Web Tokens).
2.  **Role-Based Access Control (RBAC):**
    *   **Job Seeker:** Can view jobs, apply for jobs, and view their application history.
    *   **Recruiter:** Can post new jobs and view applications for their posted jobs.
3.  **Job Management:** Create, Read, Update, Delete (CRUD) operations for jobs.
4.  **Application Tracking:** Tracks which user applied to which job.

---

## 2. Technology Stack

### Frontend (Client-Side)
*   **Library:** React.js (v18)
*   **Build Tool:** Vite (for fast development and building)
*   **Language:** JavaScript (ES6+)
*   **Styling:** Tailwind CSS (Utility-first CSS framework)
*   **Routing:** React Router v6 (Client-side routing)
*   **HTTP Client:** Axios (To communicate with the backend)

### Backend (Server-Side)
*   **Framework:** Spring Boot (Java)
*   **Language:** Java
*   **Security:** Spring Security & JWT (Stateless authentication)
*   **Database Access:** Spring Data JPA (Hibernate)
*   **API Documentation:** OpenAPI / Swagger

### Database
*   **Type:** Relational Database (MySQL)
*   **Platform:** Hosted on Railway (Cloud Platform)

---

## 3. Project Structure Breakdown

### Backend Structure (`src/main/java/com/jobportal/`)
*   **`config/`**: Configuration classes (e.g., `SecurityConfig`, `OpenApiConfig`).
*   **`controller/`**: REST Controllers. These are the entry points for API requests (e.g., `AuthController` for login, `JobController` for jobs).
*   **`model/`** (or Entity): The data structures that map to database tables (e.g., `User`, `Job`, `JobApply`).
*   **`repository/`**: Interfaces extending `JpaRepository`. They handle direct database operations (SQL queries generally aren't written manually).
*   **`service/`**: Business logic layer. Controllers call Services, and Services call Repositories.
*   **`security/`**: JWT utilities and filters (`JwtUtil`, `JwtFilter`).
*   **`dto/`** (Data Transfer Objects): Simple objects used to pass data between frontend and backend (e.g., `LoginRequest`).

### Frontend Structure (`frontend/src/`)
*   **`components/`**: Reusable UI pieces (e.g., `Navbar`, `ProtectedRoute`).
*   **`pages/`**: Full page views (e.g., `Login`, `Jobs`, `PostJob`).
*   **`api/`**: API configuration (Axios instance).
*   **`utils/`**: Helper functions (e.g., `auth.js` for checking tokens).
*   **`App.jsx`**: Main component defining the routes.

---

## 4. How It Works (The Code Flow)

### Scenario 1: User Login (Authentication Flow)
1.  **Frontend**: User enters email/password in `Login.jsx`.
2.  **Frontend**: Calls `axios.post('/api/auth/login', credentials)`.
3.  **Backend (`AuthController`)**: Receives request. Calls `AuthenticationManager`.
4.  **Backend (`Security`)**: Verifies credentials against the Database (`User` table).
5.  **Backend**: If valid, `JwtUtil` generates a **Token** (a long string containing user info).
6.  **Frontend**: Receives the token and saves it in `localStorage`.
7.  **Frontend**: Redirects user to the home page.

### Scenario 2: Applying for a Job
1.  **Frontend**: User clicks "Apply" on a job card.
2.  **Frontend**: Axios sends a POST request with the JWT token in the header (`Authorization: Bearer <token>`).
3.  **Backend (`JwtFilter`)**: Intercepts the request, checks if the token is valid.
4.  **Backend (`JobController`)**: Receives the request.
5.  **Backend (`JobService`)**: Creates a new `JobApply` entry linking the `User` and the `Job`.
6.  **Database**: Saves the record.
7.  **Response**: "Application Successful".

---

## 5. Key Interview Questions & Answers

**Q1: Why did you choose Spring Boot and React?**
*   **Answer:** "I chose **Spring Boot** for its robustness, dependency injection, and ease of building REST APIs. It's industry-standard for enterprise backends. **React** was chosen for its component-based architecture, which makes the UI modular and easy to manage, and **Vite** creates a very fast development environment."

**Q2: How does authentication work in your app?**
*   **Answer:** "I use **JWT (JSON Web Token)**. When a user logs in, the backend validates their credentials and issues a signed token. The frontend stores this token and sends it in the `Authorization` header for subsequent requests. This makes the backend **stateless**, as it doesn't need to store session data."

**Q3: Explain the flow of data when a user acts.**
*   **Answer:** "The flow is **Frontend -> Controller -> Service -> Repository -> Database**. The Controller handles the HTTP request, the Service executes business logic (like validation), and the Repository talks to the database using JPA."

**Q4: How do you handle role-based access (Job Seeker vs. Recruiter)?**
*   **Answer:** "On the **Backend**, I use Spring Security to check roles before allowing access to specific endpoints. On the **Frontend**, I have a `ProtectedRoute` component that checks the user's role stored in the token/state and redirects them if they are not authorized."

**Q5: What is the purpose of DTOs?**
*   **Answer:** "**DTOs (Data Transfer Objects)** decouple the internal database entities from the external API usage. For example, a `User` entity might have a password field, but the `UserResponse` DTO will not include it, ensuring security."

---

## 6. Code Examples for Explanation

### Backend: Creating a Controller
```java
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    // Dependency Injection
    @Autowired
    private JobService jobService;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.findAll();
    }
}
```

### Frontend: Fetching Data
```javascript
useEffect(() => {
    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs", error);
        }
    };
    fetchJobs();
}, []);
```

### Backend: Security Config (Concept)
```java
// Logic: Allow /auth/** (login/register) to everyone.
// Require authentication for any other request.
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**").permitAll()
    .anyRequest().authenticated()
)
```

---

## 7. Future Improvements (To show you think ahead)
*   **Pagination:** Implement pagination for the jobs list to handle thousands of jobs.
*   **Email Notifications:** Send an email when a user applies for a job.
*   **Search & Filter:** Add advanced filtering by location, salary, or job type.
*   **Resume Upload:** Allow users to upload PDF resumes (stored in Cloudinary or S3).
