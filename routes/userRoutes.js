import express from "express";
const router = express.Router();

import {
  getUsers,
  getUsersById,
  postUsers,
} from "../controllers/userController.js";

// POST request to create a user (e.g., /api/users)
router.post("/", postUsers);

// GET request to get all users (e.g., /api/users)
router.get("/", getUsers);

// GET request to get a user by ID (e.g., /api/users/:id)
router.get("/:id", getUsersById);

export default router;
