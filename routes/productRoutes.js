import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  postProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddlwear.js";

// Apply middleware
router.post("/", protect, admin, postProducts); // Only authenticated admin users can create products
router.get("/", getProducts); // Anyone can get the list of products
router.get("/:id", getProductById); // Anyone can get a product by ID

export default router;
