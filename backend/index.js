import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import userRoutes from "./Routes/userRoutes.js";
import groupRoutes from "./Routes/groupRoutes.js";
import transactionRoutes from "./Routes/transactionRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/", (request, response) => response.send({ app: "perashare" }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
