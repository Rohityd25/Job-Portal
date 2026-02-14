# 🚀 Quick Deployment Path - Job Portal

Follow these steps in order to deploy your Job Portal application.

---

## ✅ Step 1: Setup MySQL Database

```bash
# 1. Open MySQL Command Line or MySQL Workbench
mysql -u root -p

# 2. Create the database
CREATE DATABASE jobportal;

# 3. Verify it was created
SHOW DATABASES;

# 4. Exit MySQL
EXIT;
```

**✓ Checkpoint:** Database `jobportal` should exist in MySQL.

---

## ✅ Step 2: Configure Application Properties

1. Open `src/main/resources/application.properties`
2. Update your MySQL password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportal
spring.datasource.username=root
spring.datasource.password=YOUR_ACTUAL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

server.port=8080
```

**✓ Checkpoint:** Password matches your MySQL root password.

---

## ✅ Step 3: Build and Run Backend

```bash
# 1. Open PowerShell/Command Prompt
# 2. Navigate to project root
cd "C:\Users\ROHIT YADAV\Job-Portal"

# 3. Build the project
.\mvnw clean install

# 4. Run the backend
.\mvnw spring-boot:run
```

**✓ Checkpoint:** You should see:
- "Started JobportalApplication in X seconds"
- Backend running on http://localhost:8080

**Keep this terminal open!**

---

## ✅ Step 4: Setup and Run Frontend

```bash
# 1. Open a NEW PowerShell/Command Prompt window
# 2. Navigate to frontend directory
cd "C:\Users\ROHIT YADAV\Job-Portal\frontend"

# 3. Install dependencies (first time only)
npm install

# 4. Run the development server
npm run dev
```

**✓ Checkpoint:** You should see:
- "Local: http://localhost:5173/" (or similar)
- No errors in the terminal

**Keep this terminal open too!**

---

## ✅ Step 5: Access the Application

1. Open your web browser
2. Go to: **http://localhost:5173**
3. You should see the Job Portal homepage

**✓ Checkpoint:** Website loads without errors.

---

## ✅ Step 6: Test the Application

1. **Register a new account**
   - Click "Register" or "Sign Up"
   - Fill in the form
   - Submit

2. **Login**
   - Use your registered credentials
   - You should be redirected to the dashboard

3. **Test features**
   - Browse jobs (if you're a job seeker)
   - Post a job (if you're a recruiter)

**✓ Checkpoint:** You can register, login, and use basic features.

---

## 🎯 Quick Reference

### To Start Development (Daily Use)

**Terminal 1 - Backend:**
```bash
cd "C:\Users\ROHIT YADAV\Job-Portal"
.\mvnw spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd "C:\Users\ROHIT YADAV\Job-Portal\frontend"
npm run dev
```

### To Stop the Application

- Press `Ctrl + C` in both terminal windows

---

## 🔧 Common Issues & Fixes

### Issue 1: Port 8080 already in use
```bash
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### Issue 2: Database connection error
- ✓ Check MySQL is running
- ✓ Verify database name is `jobportal`
- ✓ Check username/password in `application.properties`

### Issue 3: Frontend can't connect to backend
- ✓ Ensure backend is running (check Terminal 1)
- ✓ Backend should be on http://localhost:8080
- ✓ Check `frontend/src/api/axios.js` has correct URL

### Issue 4: npm install fails
```bash
# Clear cache and reinstall
cd frontend
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 📦 Production Deployment (Optional)

### For Production Build:

**Backend:**
```bash
cd "C:\Users\ROHIT YADAV\Job-Portal"
.\mvnw clean package -DskipTests
java -jar target/Jobportal-0.0.1-SNAPSHOT.jar
```

**Frontend:**
```bash
cd frontend
npm run build
npm install -g serve
serve -s dist -p 3000
```

Access at: http://localhost:3000

---

## 🌐 Cloud Deployment (Recommended: Render.com)

### Quick Steps:

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy Backend on Render**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repo
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/Jobportal-0.0.1-SNAPSHOT.jar`
   - Add MySQL database from Render dashboard
   - Set environment variables for database connection

3. **Deploy Frontend on Render**
   - Click "New +" → "Static Site"
   - Connect same GitHub repo
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add environment variable: `VITE_API_URL` = your backend URL

---

## 📞 Need Help?

- Check the detailed guide: `DEPLOYMENT.md`
- Review error messages in terminal
- Verify all checkpoints are passed

**Happy Deploying! 🎉**
