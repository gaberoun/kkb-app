import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayment,
  getPaymentsByUser,
  updatePayment,
} from "../controllers/paymentController.js";
import { requireAuth } from "../middleware/auth.js";

const paymentRouter = Router();

paymentRouter.get("/", requireAuth, getPaymentsByUser);
paymentRouter.post("/", requireAuth, createPayment);
paymentRouter.put("/:paymentId", requireAuth, updatePayment);
paymentRouter.get("/:paymentId", requireAuth, getPayment);
paymentRouter.delete("/:paymentId", requireAuth, deletePayment);

export default paymentRouter;
