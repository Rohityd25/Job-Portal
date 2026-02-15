# 🚀 Job Portal - Free Deployment Guide

This guide explains how to deploy your Job Portal **completely for free** using the best current options.

## 🏗️ Architecture Overview
- **Backend (Spring Boot + MySQL)** -> Deployed on **Render** (Free Web Service) + **Railway** (Trial Database) or TiDB Cloud (Free Forever MySQL).
- **Frontend (React)** -> Deployed on **Vercel** (Free).

---

## 1️⃣ Backend Deployment (Render)

Render is the best free option for Spring Boot.

### Prerequisites
1.  Push your latest code to GitHub (you already did this!).
2.  Sign up at [Render.com](https://render.com/).

### Step-by-Step
1.  **New Web Service**: Click "New" -> "Web Service".
2.  **Connect Repo**: Select `Job-Portal`.
3.  **Root Directory**: Set running directory to `backend`. **CRITICAL STEP!**
4.  **Runtime**: Select `Docker` (since we have a Dockerfile, else use `Java`).
    *   *Recommendation*: Use **Java** environment if possible for faster builds, but Docker is more consistent.
    *   **Build Command**: `./mvnw clean package -DskipTests`
    *   **Start Command**: `java -jar target/Jobportal-0.0.1-SNAPSHOT.jar`
5.  **Environment Variables**:
    You MUST set these variables in the "Environment" tab:
    -   `SPRING_DATASOURCE_URL`: `jdbc:mysql://<your-db-host>:3306/jobportal`
    -   `SPRING_DATASOURCE_USERNAME`: `<your-db-user>`
    -   `SPRING_DATASOURCE_PASSWORD`: `<your-db-password>`
    -   `JWT_SECRET`: (Generate a secure random string)
    -   `PORT`: `8080`

### 🗄️ Free Database Options (MySQL)
Since you need a MySQL database online:
-   **TiDB Cloud (Recommended Free)**: [tidbcloud.com](https://tidbcloud.com/) offers a Serverless MySQL tier for free.
-   **Aiven**: [aiven.io](https://aiven.io/) has a free MySQL plan.
-   **Railway**: (Trial) You are already using this, but credits may expire.

Copy the connection details (Host, User, Password, Port) from the database provider and paste them into Render's Environment Variables.

---

## 2️⃣ Frontend Deployment (Vercel)

Vercel is the best free option for React apps.

### Prerequisites
1.  Sign up at [Vercel.com](https://vercel.com).

### Step-by-Step
1.  **New Project**: Click "Add New..." -> "Project".
2.  **Import Repo**: Select `Job-Portal`.
3.  **Framework Preset**: Select `Vite`.
4.  **Root Directory**: Click "Edit" and select `frontend`. **CRITICAL STEP!**
5.  **Environment Variables**:
    Add the following variable:
    -   `VITE_API_URL`: `https://<your-render-backend-name>.onrender.com`
6.  **Deploy**: Click Deploy.

---

## 3️⃣ Connecting Them
1.  Once Backend is deployed on Render, copy its URL (e.g., `https://job-portal-api.onrender.com`).
2.  Go to your Vercel Project Settings -> Environment Variables.
3.  Add/Update `VITE_API_URL` with the backend URL.
4.  **Redeploy** the Frontend on Vercel for the changes to take effect.

---

## ✅ Troubleshooting
-   **CORS Issues**: If the frontend says "Network Error" or blocked by CORS:
    -   Update your Spring Boot `WebConfig.java` or `SecurityConfig.java` to allow the Vercel domain.
    -   Example: `.allowedOrigins("https://job-portal-frontend.vercel.app")`
-   **Database Config**: Ensure `spring.jpa.hibernate.ddl-auto=update` is set in your `application.properties` (or via env var `SPRING_JPA_HIBERNATE_DDL_AUTO=update`) so tables are created automatically.

🚀 **Enjoy your free deployment!**
