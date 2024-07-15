import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  getUserDetails, 
  updateUser, 
  deleteUser 
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:userId", getUserDetails);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
