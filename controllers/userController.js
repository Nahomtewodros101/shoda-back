import express from "express";
import mongoose from "mongoose";
import User from "../models/userModel.js";

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
    res.status(201).json({ message: "Yaay! User created.", user: createdUser });
  } catch (error) {
    res.status(500).json({
      message: "Something happened when trying to create the user.",
      error: error.message,
    });
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
