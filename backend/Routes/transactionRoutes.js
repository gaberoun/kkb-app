import { Router } from "express";
import {
  createTransaction,
  getTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { requireAuth } from "../middleware/auth.js";

const transactionRouter = Router();

transactionRouter.use(requireAuth);

transactionRouter.post("/", createTransaction);
transactionRouter.get("/:transactionId", getTransaction);
transactionRouter.delete("/:transactionId", deleteTransaction);

export default transactionRouter;
