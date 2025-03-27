# FinalProject

# Task List App 📝

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Description
The **Task List App** is a full-stack web application that allows users to **add, update, retrieve, and delete tasks** while ensuring secure authentication with **JWT (JSON Web Token)**. This app is built using **React** for the frontend, **GraphQL with Node.js and Express.js** for the backend, and **MongoDB with Mongoose** for the database. It also integrates **GitHub Actions for CI/CD** and is deployed on **Render**.

---

## Features 🚀

### 🔐 Secure Authentication
- User authentication with **JWT**.
- **Login and signup** functionality.
- JWT is securely stored for authenticated requests.
- Logout removes the JWT token and restricts access to protected routes.

### ✅ Task Management
- **Create** new tasks.
- **Retrieve** saved tasks.
- **Update** existing tasks.
- **Delete** tasks from the list.
- Tasks are stored persistently in **MongoDB**.

### 🖥️ Interactive UI
- **React-based frontend** for a smooth user experience.
- **Real-time updates** with GraphQL queries and mutations.


### 🔄 CI/CD with GitHub Actions
- **Push Requests** triggers a test to be run to check your code.
- GitHub Actions run **Component tests** before merging.
- **Deployments** to Render are automatically triggered when pushing to `main`.

---

## Technologies Used 🛠️
- **Frontend:** React, Apollo Client, Tailwind CSS
- **Backend:** Node.js, Express.js, GraphQL, Mongoose
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)
- **Testing:** Component testing 
- **CI/CD:** GitHub Actions
- **Deployment:** Render

---

## Installation 🏗️

1. **Clone the repository:**
   ```sh
   git clone https://github.com/DavidSwider/FinalProject.git
   cd Finalproject
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables** (create a `.env` file and add):
   ```env
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

4. **Start the backend server:**
   ```sh
   npm run build
   ```
5. **Seed the data:**
   ```sh
   npm run seed
   ```

6. **Start the frontend:**
   ```sh
   npm start
   ```

7. Open `http://localhost:3000/` in your browser.

---

## Usage 🎯

1. **Sign up or log in** to access your task list.
2. **Add tasks** to your list.
3. **Update or delete tasks** as needed.
4. **Add tasks** to your list.
5. **Log out** to clear the session.
6. If inactive for too long, you will need to re-authenticate.

---

## Testing 🧪

This project uses **Component testings** for automated testing.

To run tests locally:
```sh
npm run test
```

On every pull request, GitHub Actions will automatically:
- Run test folder.
- Show test results before merging into `Render`.

---

## Deployment 🚀

The app is automatically deployed to **Render** when changes are pushed to `main`.

🔗 **Live App:** [Your Render Deployment Link](https://finalproject-3922.onrender.com)  

---

## Contact 📬

📧 Email: Davidswider6@gmail.com  
🔗 GitHub: [YourGitHubProfile](https://github.com/DavidSwider/FinalProject)   

---

This README gives a complete overview of **Task List App**. 🚀