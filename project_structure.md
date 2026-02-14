# Job Portal - Complete Project Structure

## 📁 Root Directory
```
Job-Portal/
├── .git/                           # Git version control
├── .gitattributes                  # Git attributes configuration
├── .gitignore                      # Git ignore rules
├── .mvn/                           # Maven wrapper files
├── README.md                       # Project documentation
├── mvnw                            # Maven wrapper script (Unix)
├── mvnw.cmd                        # Maven wrapper script (Windows)
├── pom.xml                         # Maven project configuration
├── target/                         # Compiled output directory
├── frontend/                       # React frontend application
└── src/                            # Spring Boot backend source
```

---

## 🎨 Frontend (`frontend/`)

### Configuration Files
```
frontend/
├── .gitignore                      # Frontend-specific ignore rules
├── README.md                       # Frontend documentation
├── eslint.config.js                # ESLint configuration
├── index.html                      # Main HTML entry point
├── package.json                    # NPM dependencies & scripts
├── package-lock.json               # NPM dependency lock file
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build tool configuration
├── node_modules/                   # NPM dependencies (generated)
└── public/                         # Static assets
    └── vite.svg                    # Vite logo
```

### Source Code (`frontend/src/`)
```
frontend/src/
├── App.css                         # Main app styles
├── App.jsx                         # Main app component
├── index.css                       # Global styles
├── main.jsx                        # React entry point
├── api/
│   └── axios.js                    # Axios HTTP client configuration
├── assets/
│   └── react.svg                   # React logo
├── components/
│   ├── Navbar.jsx                  # Navigation bar component
│   └── ProtectedRoute.jsx          # Route protection wrapper
├── pages/
│   ├── ApplyJob.jsx                # Job application page
│   ├── Jobs.jsx                    # Job listings page
│   ├── Login.jsx                   # Login page
│   ├── MyApplications.jsx          # User applications page
│   ├── Register.jsx                # Registration page
│   └── recruiter/
│       ├── JobApplications.jsx     # View job applications (recruiter)
│       ├── PostJob.jsx             # Post new job (recruiter)
│       └── RecruiterJobs.jsx       # Manage jobs (recruiter)
└── utils/
    └── auth.js                     # Authentication utilities
```

---

## ⚙️ Backend (`src/`)

### Main Source (`src/main/java/com/jobportal/`)
```
src/main/java/com/jobportal/
├── JobportalApplication.java       # Spring Boot main application class
├── config/
│   └── OpenApiConfig.java          # Swagger/OpenAPI configuration
├── controller/
│   ├── AuthController.java         # Authentication endpoints
│   ├── JobApplyController.java     # Job application endpoints
│   ├── JobController.java          # Job CRUD endpoints
│   ├── JobSeekerController.java    # Job seeker endpoints
│   ├── RecruiterController.java    # Recruiter endpoints
│   └── TestController.java         # Test/health check endpoints
├── dto/
│   ├── JobApplyResponse.java       # Job application response DTO
│   ├── JobResponse.java            # Job response DTO
│   ├── LoginRequest.java           # Login request DTO
│   ├── RegisterRequest.java        # Registration request DTO
│   └── UserResponse.java           # User response DTO
├── exception/
│   ├── DuplicateJobApplyException.java  # Custom exception for duplicate applications
│   └── GlobalExceptionHandler.java      # Global exception handler
├── model/
│   ├── Job.java                    # Job entity
│   ├── JobApply.java               # Job application entity
│   ├── Role.java                   # User role enum
│   └── User.java                   # User entity
├── repository/
│   ├── JobApplicationRepository.java    # Job application data access
│   ├── JobApplyRepository.java          # Job apply data access
│   ├── JobRepository.java               # Job data access
│   └── UserRepository.java              # User data access
├── security/
│   ├── CustomUserDetailsService.java    # Custom user details service
│   ├── JwtFilter.java                   # JWT authentication filter
│   ├── JwtUtil.java                     # JWT token utilities
│   ├── SecurityConfig.java              # Spring Security configuration
│   └── SecurityUtil.java                # Security utility methods
└── service/
    ├── JobApplyService.java             # Job application service interface
    ├── JobService.java                  # Job service interface
    ├── UserService.java                 # User service interface
    └── impl/
        ├── JobApplyServiceImpl.java     # Job application service implementation
        ├── JobServiceImpl.java          # Job service implementation
        └── UserServiceImpl.java         # User service implementation
```

### Resources (`src/main/resources/`)
```
src/main/resources/
└── application.properties          # Spring Boot application configuration
```

### Test (`src/test/java/`)
```
src/test/java/                      # Test source directory
└── (test files)
```

---

## 📊 Architecture Overview

### Frontend Stack
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router (implied from ProtectedRoute)

### Backend Stack
- **Framework**: Spring Boot
- **Security**: Spring Security + JWT
- **Database**: JPA/Hibernate (repository pattern)
- **API Documentation**: OpenAPI/Swagger
- **Build Tool**: Maven

### Key Features
- **Authentication**: JWT-based authentication system
- **Role-based Access**: Job Seeker and Recruiter roles
- **Job Management**: CRUD operations for jobs
- **Application System**: Job application workflow
- **Protected Routes**: Frontend route protection
