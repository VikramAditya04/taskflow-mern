import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
const port = process.env.PORT || 4000

connectDB();

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173']
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(express.json());

// API Endpoints
app.get('/', (req, res)=> res.send("API Working"));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);


app.listen(port, ()=> console.log(`Server is running on PORT:${port}`));