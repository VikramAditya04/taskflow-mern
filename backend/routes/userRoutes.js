import express from "express";
import userAuth from "../middleware/userAuth.js";
import isAdmin from "../middleware/roleMiddleware.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", userAuth, isAdmin, getUsers);

export default router;
