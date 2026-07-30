# Deliver Chap Chap 🚀

**Deliver Chap Chap** is a modern, high-performance courier logistics management platform tailored for the Kenyan market. It features a decoupled architecture with a visually stunning Next.js frontend and a robust Express/MongoDB backend, automating essential tasks like booking management and email notifications.

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Features](#-features)
3. [Architecture](#-architecture)
4. [Tech Stack](#-tech-stack)
5. [Getting Started (Local Development)](#-getting-started-local-development)
6. [Deployment Guide](#-deployment-guide)

---

## 🌟 Overview
Deliver Chap Chap bridges the gap between couriers and customers by providing an intuitive platform for parcel logistics. Customers can easily request quotes, book deliveries, and receive automated confirmations. The platform features an admin dashboard for operations management.

### Key Highlights:
- **Premium User Experience:** Uses a modern glassmorphism design with interactive animations.
- **Microservices Architecture:** Decoupled Next.js frontend and Node.js/Express backend.
- **Real-time Notifications:** Automated booking confirmations via Nodemailer.
- **Secure Admin Panel:** Streamlined backend access for platform administrators.

---

## ✨ Features

### Non-Technical (User Features)
- **Instant Booking:** Quick parcel delivery request system.
- **Automated Email Confirmations:** Both sender and recipient receive immediate email updates about their delivery.
- **Modern Landing Page:** Highly interactive and aesthetic interface designed for high conversion.
- **Responsive Design:** Seamless experience across desktop, tablet, and mobile devices.

### Technical Features
- **Frontend (Next.js 15):** Utilizes the new App Router, Tailwind CSS 4, and Framer Motion for animations.
- **Backend (Express):** Dedicated RESTful API for handling bookings and emails.
- **Database (MongoDB):** Flexible NoSQL database integration using Mongoose.
- **Component Library:** Built with shadcn/ui and Radix UI primitives.

---

## 🏗 Architecture

The system operates as a monorepo containing two main directories:
- `frontend/` - Contains the Next.js React application.
- `backend/` - Contains the Node.js Express server.

---

## 🛠 Tech Stack

**Frontend:**
- [Next.js 15](https://nextjs.org/) (React Framework)
- [Tailwind CSS 4](https://tailwindcss.com/) (Styling)
- [Framer Motion](https://www.framer.com/motion/) (Animations)
- [shadcn/ui](https://ui.shadcn.com/) (Components)
- [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) (Server)
- [MongoDB](https://www.mongodb.com/) (Database via Mongoose)
- [Nodemailer](https://nodemailer.com/) (Email Service)
- [dotenv](https://www.npmjs.com/package/dotenv) (Environment Variables)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- NPM or Yarn

### 1. Clone & Install

```bash
git clone <repository-url>
cd Deliver-chapchap
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/deliver-chapchap
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Run the frontend:
```bash
npm run dev
```
Access the frontend at `http://localhost:3000` and backend API at `http://localhost:5000`.

---

## 🌍 Deployment Guide

### ⚡ Deploying Frontend to Vercel
Vercel is the optimal hosting provider for Next.js applications.

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `Deliver-chapchap` repository.
4. **Important configuration during import:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
5. Add any required Environment Variables (e.g., `NEXT_PUBLIC_API_URL` pointing to your deployed backend URL).
6. Click **Deploy**.

### ☁️ Deploying Backend to Render
Render is excellent for hosting Node.js REST APIs.

#### Method 1: Using Render Dashboard (Recommended)
1. Log in to [Render](https://render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the web service:
   - **Name:** deliver-chapchap-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Expand **Advanced** and add your Environment Variables:
   - `MONGODB_URI`: Your production MongoDB URI (e.g., from MongoDB Atlas)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
5. Click **Create Web Service**.

#### Method 2: Using `render.yaml` (Infrastructure as Code)
A `render.yaml` file is included in the root of this project. 
1. In the Render Dashboard, go to **Blueprints**.
2. Click **New Blueprint Instance**.
3. Connect this repository. Render will automatically detect the backend configuration and deploy it.

---

*Built with ❤️ for Deliver Chap Chap.*
