# 🚀 Job Portal - Deployment Guide

This guide provides step-by-step instructions for deploying the Job Portal application in different environments.

---

## 📋 Prerequisites

### Required Software
- **Java**: JDK 17 or higher
- **Node.js**: v18 or higher
- **MySQL**: 8.0 or higher
- **Maven**: 3.6+ (or use included Maven wrapper)
- **Git**: For version control

### Verify Installations
```bash
# Check Java version
java -version

# Check Node.js version
node --version

# Check MySQL
mysql --version

# Check Maven (optional, wrapper included)
mvn --version
```

---

## 🗄️ Database Setup

### 1. Create MySQL Database
```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE jobportal;

-- Verify database creation
SHOW DATABASES;

-- Exit MySQL
EXIT;
```

### 2. Configure Database Credentials
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

server.port=8080
```

> [!IMPORTANT]
> Replace `YOUR_PASSWORD_HERE` with your actual MySQL password.

---

## 🔧 Local Development Deployment

### Backend (Spring Boot)

#### Step 1: Navigate to Project Root
```bash
cd "C:\Users\ROHIT YADAV\Job-Portal"
```

#### Step 2: Build the Backend
```bash
# Using Maven wrapper (recommended)
.\mvnw clean install

# Or using Maven
mvn clean install
```

#### Step 3: Run the Backend
```bash
# Using Maven wrapper
.\mvnw spring-boot:run

# Or using Maven
mvn spring-boot:run

# Or run the JAR directly
java -jar target/Jobportal-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8080**

#### Step 4: Verify Backend
- API Documentation: http://localhost:8080/swagger-ui.html
- Health Check: http://localhost:8080/api/test (if available)

### Frontend (React + Vite)

#### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Configure API Base URL
Edit `frontend/src/api/axios.js` to ensure it points to your backend:
```javascript
const API_BASE_URL = 'http://localhost:8080';
```

#### Step 4: Run Development Server
```bash
npm run dev
```

The frontend will start on **http://localhost:5173** (or another port if 5173 is busy)

#### Step 5: Access the Application
Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

---

## 📦 Production Build

### Backend Production Build

#### Step 1: Build Production JAR
```bash
# Navigate to project root
cd "C:\Users\ROHIT YADAV\Job-Portal"

# Clean and package
.\mvnw clean package -DskipTests
```

This creates `target/Jobportal-0.0.1-SNAPSHOT.jar`

#### Step 2: Run Production Backend
```bash
java -jar target/Jobportal-0.0.1-SNAPSHOT.jar
```

#### Step 3: Run as Background Service (Windows)
```powershell
# Using PowerShell
Start-Process java -ArgumentList "-jar","target/Jobportal-0.0.1-SNAPSHOT.jar" -WindowStyle Hidden
```

### Frontend Production Build

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

This creates optimized files in `frontend/dist/`

#### Step 2: Preview Production Build (Optional)
```bash
npm run preview
```

#### Step 3: Serve Production Files
You have several options:

**Option A: Using a Simple HTTP Server**
```bash
# Install serve globally
npm install -g serve

# Serve the dist folder
serve -s dist -p 3000
```

**Option B: Using Spring Boot to Serve Frontend**
1. Copy `frontend/dist/*` to `src/main/resources/static/`
2. Rebuild the backend JAR
3. The backend will serve both API and frontend

---

## ☁️ Cloud Deployment Options

### Option 1: Deploy to Render (Recommended for Beginners)

#### Backend Deployment
1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/Jobportal-0.0.1-SNAPSHOT.jar`
   - **Environment Variables**:
     ```
     SPRING_DATASOURCE_URL=jdbc:mysql://YOUR_DB_HOST:3306/jobportal
     SPRING_DATASOURCE_USERNAME=your_username
     SPRING_DATASOURCE_PASSWORD=your_password
     ```

#### Frontend Deployment
1. Create a new **Static Site** on Render
2. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

### Option 2: Deploy to Railway

#### Backend
1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add MySQL database from Railway marketplace
4. Set environment variables automatically connected

#### Frontend
1. Create new service for frontend
2. Configure build settings similar to Render

### Option 3: Deploy to AWS

#### Backend (AWS Elastic Beanstalk)
```bash
# Install AWS CLI and EB CLI
pip install awsebcli

# Initialize Elastic Beanstalk
eb init -p java-17 job-portal-backend

# Create environment
eb create job-portal-env

# Deploy
eb deploy
```

#### Frontend (AWS S3 + CloudFront)
```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Configure CloudFront for distribution
```

### Option 4: Deploy to Heroku

#### Backend
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create job-portal-backend

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Deploy
git push heroku main
```

#### Frontend
```bash
cd frontend

# Create Heroku app
heroku create job-portal-frontend

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main
```

---

## 🔐 Production Configuration

### Security Checklist

- [ ] Change default JWT secret key
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS/SSL
- [ ] Set `spring.jpa.show-sql=false`
- [ ] Remove or secure Swagger UI in production
- [ ] Configure CORS properly
- [ ] Use strong database passwords
- [ ] Enable rate limiting
- [ ] Set up monitoring and logging

### Environment Variables (Production)

Create a `.env` file or set system environment variables:

```bash
# Database
DB_URL=jdbc:mysql://production-db-host:3306/jobportal
DB_USERNAME=prod_user
DB_PASSWORD=strong_password_here

# JWT
JWT_SECRET=your-very-long-secret-key-here
JWT_EXPIRATION=86400000

# Server
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

### Update application.properties for Production
```properties
# Use environment variables
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Production settings
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.org.springframework.security=INFO

# JWT settings
jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION}
```

---

## 🐳 Docker Deployment (Optional)

### Create Dockerfile for Backend
Create `Dockerfile` in project root:
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/Jobportal-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Create Dockerfile for Frontend
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: jobportal
      MYSQL_ROOT_PASSWORD: rootpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/jobportal
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: rootpassword
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql-data:
```

### Run with Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🧪 Testing Deployment

### Backend Tests
```bash
# Run all tests
.\mvnw test

# Run specific test class
.\mvnw test -Dtest=AuthControllerTest
```

### Frontend Tests
```bash
cd frontend
npm run lint
```

### Manual Testing Checklist
- [ ] User registration works
- [ ] User login works
- [ ] JWT token is stored and used
- [ ] Job listings display correctly
- [ ] Job application submission works
- [ ] Recruiter can post jobs
- [ ] Recruiter can view applications
- [ ] Protected routes work correctly
- [ ] Logout functionality works

---

## 📊 Monitoring & Maintenance

### Application Logs
```bash
# View Spring Boot logs
tail -f logs/spring-boot-application.log

# Or if running in terminal
# Logs will appear in console
```

### Database Backup
```bash
# Backup MySQL database
mysqldump -u root -p jobportal > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u root -p jobportal < backup_20260214.sql
```

### Performance Monitoring
- Use Spring Boot Actuator for health checks
- Monitor database connection pool
- Track API response times
- Monitor memory usage

---

## 🆘 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check if port 8080 is already in use
netstat -ano | findstr :8080

# Kill the process using the port
taskkill /PID <PID> /F
```

#### Database connection failed
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `application.properties`
- Ensure database `jobportal` exists

#### Frontend can't connect to backend
- Check `axios.js` has correct backend URL
- Verify CORS is configured in Spring Security
- Check browser console for errors

#### Build failures
```bash
# Clear Maven cache
.\mvnw clean

# Clear npm cache
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

## 🎯 Quick Start Commands

### Development Mode
```bash
# Terminal 1 - Backend
cd "C:\Users\ROHIT YADAV\Job-Portal"
.\mvnw spring-boot:run

# Terminal 2 - Frontend
cd "C:\Users\ROHIT YADAV\Job-Portal\frontend"
npm run dev
```

### Production Build
```bash
# Build backend
.\mvnw clean package -DskipTests

# Build frontend
cd frontend
npm run build

# Run backend with production frontend
java -jar target/Jobportal-0.0.1-SNAPSHOT.jar
```

---

**Need Help?** Check the troubleshooting section or review application logs for detailed error messages.
