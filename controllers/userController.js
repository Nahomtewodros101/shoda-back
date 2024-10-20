import express from "express";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// create a new user
export const postUsers = async (req, res) => {
  try {
    const { email, username, password, isAdmin } = req.body;

    const user = new User({
      email,
      username,
      password,
      isAdmin,
    });

    const createdUser = await user.save();
    res
      .status(201)
      .json({ message: `Thank you for Regestering!.`, user: createdUser });
  } catch (error) {
    // Check for duplicate key error
    if (error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exists.`,
      });
    } else {
      // Handle other types of errors
      res.status(500).json({
        message: "Something happened when trying to create the user.",
      });
    }
  }
};

export const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// log in user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.status(200).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error during login" });
  }
};
