import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createAccessToken } from "../middleware/auth.js";

// POST /api/v1/users/register
export const registerUser = async (req, res) => {
  const { email, phone, password, firstName, lastName } = req.body;
  try {
    // Check if a user with the provided email or phone already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already taken' });
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ error: 'Phone is already taken' });
    }

    // Input validators
    if (/[^a-zA-Z\s]+/.test(firstName) || /[^a-zA-Z\s]+/.test(lastName)) {
      return res.status(400).json({ error: 'Name must only contain letters.' });
    }
    if (!/\d{10}/.test(phone)) {
      return res.status(400).json({ error: 'Phone entered was invalid' });
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: 'Email entered was invalid' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ 
      email, 
      phone, 
      firstName, 
      lastName,
      password: hashedPassword
    });
    await user.save();
    
    res.status(201).json({ 
      message: 'User registered successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// POST /api/v1/users/login
export const loginUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    // Find user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ 
      message: 'Login successful',
      data: {
        name: `${user.firstName} ${user.lastName}`,
        userId: user._id,
        token: createAccessToken(user)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// GET /api/v1/users/:userId
export const getUserDetails = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      message: 'User found',
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// PUT /api/v1/users/:userId
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { phone, firstName, lastName } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { phone, firstName, lastName }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE /api/v1/users/:userId
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
