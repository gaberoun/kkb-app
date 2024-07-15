import { Router } from "express";
import { 
  createGroup, 
  getGroups, 
  getGroupDetails, 
  updateGroup, 
  deleteGroup, 
  addMemberToGroup, 
  removeMemberFromGroup 
} from "../controllers/groupController.js";
import { requireAuth } from "../middleware/auth.js";

const groupRouter = Router();

groupRouter.post("/", requireAuth, createGroup);
groupRouter.get("/", requireAuth, getGroups);
groupRouter.get("/:groupId", getGroupDetails);
groupRouter.put("/:groupId", requireAuth, updateGroup);
groupRouter.delete("/:groupId", requireAuth, deleteGroup);
groupRouter.post("/:groupId/members", requireAuth, addMemberToGroup);
groupRouter.delete("/:groupId/members/:userId", requireAuth, removeMemberFromGroup);

export default groupRouter;

