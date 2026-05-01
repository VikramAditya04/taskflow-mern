📌 Team Task Manager (TaskFlow)

🚀 Live Demo: https://taskflow-mern.up.railway.app/

📖 Overview

TaskFlow is a full-stack Team Task Management Web Application designed to help teams collaborate efficiently by managing projects and tasks in a structured way.

It allows users to create projects, assign tasks, track progress, and manage team members with role-based access control.

This project demonstrates real-world full-stack development skills including authentication, API design, database relationships, and deployment.

🎯 Features
🔐 Authentication
User Signup (Name, Email, Password)
Secure Login using JWT
Protected routes & session handling
📁 Project Management
Create new projects
Project creator becomes Admin
Admin can:
Add members
Remove members
Members can:
View assigned projects
✅ Task Management
Create tasks with:
Title
Description
Due Date
Priority (Low / Medium / High)
Assign tasks to users
Update task status:
To Do
In Progress
Done
📊 Dashboard
Total tasks overview
Tasks categorized by status
Tasks assigned per user
Overdue tasks tracking
🛡️ Role-Based Access Control
👑 Admin
Manage projects
Add/remove members
Create & assign tasks
👤 Member
View assigned projects
Update only their assigned tasks
🧱 Tech Stack
Frontend
React.js
Tailwind CSS
Axios
React Router
Backend
Node.js
Express.js
JWT Authentication
Bcrypt.js
Database
MongoDB (Mongoose)
Deployment
Frontend + Backend: Railway
Database: MongoDB Atlas
🗂️ Project Structure
taskflow/
│
├── client/          # React frontend
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│
├── .env
├── package.json
└── README.md
🔌 API Endpoints
🔑 Auth
POST /api/auth/signup
POST /api/auth/login
📁 Projects
POST   /api/projects
GET    /api/projects
PUT    /api/projects/:id/add-member
DELETE /api/projects/:id/remove-member
✅ Tasks
POST   /api/tasks
GET    /api/tasks/project/:projectId
PUT    /api/tasks/:id
DELETE /api/tasks/:id
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/taskflow.git
cd taskflow
2️⃣ Install dependencies
Backend
cd server
npm install
Frontend
cd client
npm install
3️⃣ Setup Environment Variables

Create a .env file in /server:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
4️⃣ Run the project
Start backend
cd server
npm run dev
Start frontend
cd client
npm run dev
🚀 Deployment

The application is deployed on Railway:

👉 https://taskflow-mern.up.railway.app/

⚠️ Known Issues
Ensure correct API base URL in production
CORS must be properly configured
Environment variables must be set correctly in deployment
💡 Future Improvements
Real-time updates using Socket.io
Drag & drop task board (Trello-style)
Notifications system
Calendar view for tasks
Advanced filtering & search
🧑‍💻 Author

Vikram Aditya
🔗 LinkedIn: https://www.linkedin.com/in/vikramaditya04/

⭐ Conclusion

TaskFlow is a scalable and practical implementation of a team collaboration tool, showcasing core full-stack development concepts such as authentication, REST APIs, role-based access, and modern UI design.
