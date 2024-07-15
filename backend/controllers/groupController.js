import Group from "../models/Group.js";
import Transaction from "../models/Transaction.js";

// POST /api/v1/groups
export const createGroup = async (req, res) => {
  const { name , userId } = req.body; // Use webtoken for userId

  try {
    const group = new Group({ name, members: [userId] });
    await group.save();
    res.status(201).json({
      message: "New group created",
      data: group
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create group." });
  }
};

// GET /api/v1/groups
export const getGroups = async (req, res) => {
  const { userId } = req.body; // Use webtoken for userId

  try {
    const groups = await Group.find({ members: userId });
    res.status(200).json({ 
      message: `Groups of User ${userId}`, 
      data: groups 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

// GET /api/v1/groups/:groupId
export const getGroupDetails = async (req, res) => {
  const { groupId } = req.params;
  try {
    const group = await Group.findById(groupId)
      .lean()
      .populate("members", "_id firstName lastName");
    if (!group) return res.status(404).json({ error: "Group not found" });

    const transactions = await Transaction.find({ groupId })
      .select(["_id", "description", "category", "createdAt"]);

    res.status(200).json({
      message: "Group found",
      data: {
        group,
        transactions
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group details" });
  }
};

// PUT /api/v1/groups/:groupId
export const updateGroup = async (req, res) => {
  const { groupId } = req.params;
  const { name, members } = req.body;
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, members },
      { new: true }
    );
    if (!updatedGroup)
      return res.status(404).json({ error: "Group not found" });
    res.status(200).json({
      message: "Group was updated",
      data: updatedGroup
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update group" });
  }
};

// DELETE /api/v1/groups/:groupId
export const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  try {
    await Group.findByIdAndDelete(groupId);
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete group" });
  }
};

// POST /api/v1/groups/:groupId/members
export const addMemberToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body; // Use webtoken for userId
  try {
    const group = await Group.findById(groupId);
    if (!group) 
      return res.status(404).json({ error: "Group not found" });

    if (group.members.includes(userId))
      return res.status(404).json({ error: "User is already part" });

    group.members.push(userId);
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: "Failed to add member to group" });
  }
};

// DELETE /api/v1/groups/:groupId/members/:userId
export const removeMemberFromGroup = async (req, res) => {
  const { groupId, userId } = req.params;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    group.members = group.members.filter(
      (member) => member.userId.toString() !== userId
    );
    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove member from group" });
  }
};
