# Event Management System 🎊

A comprehensive, full-stack Event Management System with a premium Admin Panel and a dynamic User Website. Built with Node.js, Express, Next.js, and MySQL.

## 🚀 Features

### 👤 User Website
- **Dynamic Content:** Home page, Events, Services, and Venues are all fetched live from the database.
- **Visual Excellence:** Premium design with smooth animations (Framer Motion).
- **Responsive:** Works perfectly on Desktop, Tablet, and Mobile.
- **Gallery:** Pinterest-style dynamic gallery with lightbox preview.

### 🛠️ Admin Panel
- **Dashboard:** Overview of system stats and revenue.
- **Module Management:**
    - **Events:** CRUD for different event types with pricing tiers.
    - **Services:** Manage service offerings (DJ, Catering, Decor) with icons.
    - **Venues:** Manage luxury farm houses and locations with capacity details.
    - **Gallery:** Upload images directly or use custom URLs.
    - **Settings:** Update site branding, contact info, and SEO meta tags.
- **Authentication:** Secure JWT-based admin login.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MySQL (mysql2)
- **Frontend (Admin & Client):** Next.js (App Router), Tailwind CSS, Framer Motion, Axios
- **Auth:** JSON Web Tokens (JWT), BcryptJS
- **Media:** Multer (Local Image Uploads)

---

## ⚙️ Quick Setup (Automated)

We have provided a `setup.bat` file to automate the entire setup process.

1. **Prerequisites:**
   - Install [Node.js](https://nodejs.org/) (v16+)
   - Install [MySQL](https://dev.mysql.com/downloads/installer/) and ensure it is running.
2. **Environment Configuration:**
   - Go to the `server` directory and rename `.env.example` to `.env` (if not already done).
   - Update the `DB_USER` and `DB_PASSWORD` to match your MySQL credentials.
3. **Run Setup:**
   - Double-click `setup.bat` in the root folder.
   - This will install all dependencies and create your database tables with sample data.

---

## 🏃 Running the Project

Open 3 separate terminals for each service:

### 1. Backend Server
```bash
cd server
npm run dev
```

### 2. Admin Panel
```bash
cd admin
npm run dev
```
Accessible at: `http://localhost:3001`

**Admin Credentials:**
- **Username:** `admin`
- **Password:** `password123`

### 3. User Website
```bash
cd client
npm run dev
```
Accessible at: `http://localhost:3000`

---

## 📁 Project Structure

- `server/`: Express API, Database logic, and Controllers.
- `admin/`: Next.js Admin Panel source code.
- `client/`: Next.js User-facing website source code.
- `server/database.sql`: MySQL Schema and Sample Data.

---

## 💰 Currency & Localization
The project is pre-configured to use **Indian Rupees (₹)** for all pricing and revenue displays.

---

## 📝 License
This project is developed for Vrikshansh Technology.
