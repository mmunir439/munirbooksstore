# 📚 Munir Bookstore — Online Book Store

A simple **PHP + MySQL** full-stack web application for an online bookstore, featuring book listings, user signup, and a contact form.

---

## 🚀 Live Preview (Optional)

> Coming soon — I can deploy this project using platforms like **Netlify + backend APIs**, **Vercel**, or run it locally as below.

---

## 🛠️ Setup Instructions (Run Locally with XAMPP)

### 🔧 Step 1: Install XAMPP

1. Download XAMPP: [apachefriends.org/download.html](https://www.apachefriends.org/download.html)
2. Install and open the XAMPP Control Panel.
3. Start the following services:
   - ✅ Apache
   - ✅ MySQL

---

### 📦 Step 2: Clone the Project

Open **Command Prompt** and run:

```bash
cd C:\xampp\htdocs
git clone https://github.com/mmunir439/munirbooksstore.git
cd munirbooksstore
code .
🧱 Step 3: Create the Database and Tables
Open your browser and go to: http://localhost/phpmyadmin

Click on the SQL tab.

Paste and run the following SQL script:
-- Create Database
CREATE DATABASE IF NOT EXISTS munirbookstore;
USE munirbookstore;

-- Create books Table
CREATE TABLE books (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    price DECIMAL(10,2),
    description TEXT,
    image_url VARCHAR(255)
);

-- Create contact_messages Table
CREATE TABLE contact_messages (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index Table (Reserved keyword, use backticks)
CREATE TABLE `index` (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content_title VARCHAR(255),
    content_body TEXT
);

-- Create signup Table
CREATE TABLE signup (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🌐 Step 4: Run the Project in Browser
Open your browser and go to:
http://localhost/munirbooksstore
📌 Features
📖 View and manage books

📝 User registration (Signup)

📬 Contact form for user messages

💾 MySQL database for data storage

💻 Tech Stack
Frontend: HTML, CSS, JavaScript

Backend: PHP (Core PHP)

Database: MySQL

Environment: XAMPP
👤 Author
Muhammad Munir
🔗 **[GitHub Profile](https://github.com/mmunir439)**
```
