# BlogBook – Full Stack Web App
A full stack blogging platform built with HTML, CSS, JavaScript, Node.js, Express, MongoDB, and Jinja that allows users to create, edit, delete, and view blogs with proper authentication and secure backend APIs.

## 📌 Project Overview

- BlogBook is a blogging web app where users can:
- Sign up, log in, and log out
- Create, update, and delete blogs (author-only)
- View blogs by other users
- Access features based on authentication and authorization
- It’s a secure, dynamic, and interactive platform built during a Web Development workshop by GDG on campus.

## 🛠 Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)
![Jinja](https://img.shields.io/badge/Jinja-000000?style=for-the-badge)

## Key Features

- 🔑 User authentication with JWT tokens
- 📝 CRUD operations for blogs via RESTful API endpoints
- 🌐 URL redirection and route protection for authenticated users
- 🗄 Connected to MongoDB for persistent storage with Mongoose
- ⚡ Dynamic content rendering using Jinja templates

🔄 How It Works

- Users can sign up or log in to access the platform
- Authenticated users can create, update, or delete their own blogs
- Blogs are stored in MongoDB and served via Express APIs
- Dynamic pages are rendered using Jinja templates
- Routes are protected, ensuring only authorized access
- JWT tokens are used to verify user sessions and protect sensitive operations

## 💻 Run Locally
```bash
git clone https://github.com/your-username/blogbook.git
```
```bash
cd blogbook
```
```bash
npm install
```
```bash
# Create .env file with your ENV variables (DB URI, JWT secret)
```
```bash
npm start
```
Open http://localhost:3000 to view the app
Sign up and log in to start creating blogs

🧠 What I Learned

- Building a full stack web application from scratch
- Creating backend APIs and connecting them to the frontend
- Implementing secure authentication & authorization with JWT
- Using environment variables for sensitive data
- Managing user access, route redirection, and secure coding practices
- Understanding the importance of both functionality and security

🚀 Future Improvements

- Add comments and likes for blogs
- Implement search and filter functionality
- Deploy on cloud (Heroku / Vercel) with HTTPS
- Add rich text editor for blogs
- Improve UI with responsive design

## 🤝 Open for Contribution

Contributions are welcome!

- Fork the repo
- Create a new branch (feature/your-feature)
- Commit your changes
- Push & open a Pull Request

All ideas, bug fixes, and UI improvements are appreciated 🚀
