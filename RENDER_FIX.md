# 🔧 Fixing Render Deployment - Permission Denied Error

## Problem
```
bash: line 1: ./mvnw: Permission denied
==> Build failed 😞
```

This happens because the Maven wrapper (`mvnw`) doesn't have execute permissions on Linux servers.

---

## ✅ Solution 1: Fix Maven Wrapper Permissions (Recommended)

### Step 1: Make mvnw Executable
```bash
# In your project root
cd "C:\Users\ROHIT YADAV\Job-Portal"

# Make mvnw executable
git update-index --chmod=+x mvnw

# Commit the change
git add mvnw
git commit -m "Fix: Make mvnw executable for Linux deployment"

# Push to GitHub
git push origin main
```

### Step 2: Redeploy on Render
- Go to your Render dashboard
- Click "Manual Deploy" → "Deploy latest commit"
- Or it will auto-deploy if you have auto-deploy enabled

**✓ This should fix the permission issue!**

---

## ✅ Solution 2: Use Maven Instead of Maven Wrapper

If Solution 1 doesn't work, change your Render build command:

### On Render Dashboard:
1. Go to your web service
2. Click "Settings"
3. Find "Build Command"
4. Change from:
   ```bash
   ./mvnw clean package -DskipTests
   ```
   To:
   ```bash
   mvn clean package -DskipTests
   ```
5. Click "Save Changes"
6. Click "Manual Deploy"

**Note:** Render has Maven pre-installed, so this will work.

---

## ✅ Solution 3: Use Dockerfile (Most Reliable)

Create a `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/Jobportal-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### On Render Dashboard:
1. Go to "Settings"
2. Change "Build Command" to: (leave empty or use `echo "Using Docker"`)
3. Render will automatically detect and use the Dockerfile
4. Save and redeploy

---

## ✅ Solution 4: Alternative Build Commands

Try these alternative build commands on Render:

### Option A: Using chmod in build command
```bash
chmod +x ./mvnw && ./mvnw clean package -DskipTests
```

### Option B: Using sh explicitly
```bash
sh ./mvnw clean package -DskipTests
```

### Option C: Using bash
```bash
bash mvnw clean package -DskipTests
```

---

## 🎯 Recommended Steps (In Order)

1. **First, try Solution 1** (Fix permissions locally and push)
   ```bash
   git update-index --chmod=+x mvnw
   git commit -m "Fix: Make mvnw executable"
   git push origin main
   ```

2. **If that doesn't work, try Solution 2** (Use `mvn` instead of `./mvnw`)

3. **If still failing, use Solution 3** (Dockerfile - most reliable)

---

## 📋 Complete Render Configuration

### For Backend (Web Service):

**Environment:** `Docker` (if using Dockerfile) or `Java`

**Build Command (choose one):**
- With fixed permissions: `./mvnw clean package -DskipTests`
- Without wrapper: `mvn clean package -DskipTests`
- With Dockerfile: (leave empty)

**Start Command:**
```bash
java -jar target/Jobportal-0.0.1-SNAPSHOT.jar
```

**Environment Variables:**
```
SPRING_DATASOURCE_URL=jdbc:mysql://YOUR_DB_HOST:3306/jobportal
SPRING_DATASOURCE_USERNAME=your_db_username
SPRING_DATASOURCE_PASSWORD=your_db_password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SERVER_PORT=8080
```

---

## 🗄️ Setting Up MySQL on Render

Render doesn't have a built-in MySQL service, so you have options:

### Option A: Use Railway for MySQL (Free tier available)
1. Go to https://railway.app
2. Create new project → Add MySQL
3. Copy connection details
4. Use in Render environment variables

### Option B: Use PlanetScale (Free tier)
1. Go to https://planetscale.com
2. Create database
3. Get connection string
4. Use in Render

### Option C: Use Render PostgreSQL instead
1. Add PostgreSQL database in Render
2. Update `pom.xml` to use PostgreSQL:
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
       <scope>runtime</scope>
   </dependency>
   ```
3. Update `application.properties`:
   ```properties
   spring.datasource.url=${DATABASE_URL}
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   ```

---

## 🧪 Test Locally First

Before deploying again, test the build command locally:

```bash
cd "C:\Users\ROHIT YADAV\Job-Portal"

# Test the build
.\mvnw clean package -DskipTests

# Verify JAR was created
ls target/*.jar
```

If this works locally, the deployment should work too.

---

## 📞 Still Having Issues?

Check these:
- ✓ Ensure `mvnw` file exists in your repository
- ✓ Check Java version on Render matches your local (Java 17)
- ✓ Review Render build logs for specific errors
- ✓ Ensure all dependencies are in `pom.xml`

**Next Steps:** Try Solution 1 first, then let me know if you need help with the other solutions!
