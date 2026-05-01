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
const port = process.env.PORT || 4000;

// Connect DB
connectDB();

//  Allowed Origins
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:3000"
];

// CORS Setup - Allow all origins for development
app.use(cors({
  origin: true,  // Allow all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
  optionsSuccessStatus: 200,
  preflightContinue: false
}));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/', (req, res) => {
res.send("API Working ");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

// Start server
app.listen(port, () => {
console.log(`Server running on PORT: ${port}`);
});
