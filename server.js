import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const db = process.env.MONGO_URI;

import userRoutes from "./routes/userRoutes.js";
import { loginUser } from "./controllers/userController.js";

// my middlewears
app.use(express.json());
app.use(cors());
// i think helps me in postman
app.use(urlencoded({ extended: false }));

// connect to db
mongoose
  .connect(db)
  .then(
    app.listen(port, () => {
      console.log(`server runnin on port ${port} and also db connected`);
    })
  )
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// for any route product related routoch

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginUser);

//error handleroch
app.use(notFound);
app.use(errorHandler);
