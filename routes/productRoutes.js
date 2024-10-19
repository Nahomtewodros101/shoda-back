import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  postProducts,
} from "../controllers/productController.js";
// import { protect, Admin } from "../middleware/authMiddlwear.js";
   

//protect, Admin,
router.post("/",  postProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
