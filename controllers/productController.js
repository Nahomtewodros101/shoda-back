import mongoose from "mongoose";
import Product from "../models/productModel.js";

// Create a new product
export const postProducts = async (req, res) => {
  try {
    const { name, description, price, images } = req.body;

    const product = new Product({
      name,
      description,
      price,
      images,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({
      message: "Something happened when trying to create the product.",
    });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
