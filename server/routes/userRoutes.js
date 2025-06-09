import express from 'express';
import {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  updateProfile,
  updateUserStatus,
//   logoutUser,
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import userModel from '../models/userModel.js'; // ⬅️ Ensure correct model name
import rateLimit from 'express-rate-limit';
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit to 5 attempts
//   message: 'Too many login attempts from this IP, try again after 15 minutes'
// });

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/forgot-password', forgotPassword);
userRouter.put('/profile', auth, updateProfile);
userRouter.put('/admin/update-status', updateUserStatus);
userRouter.post('/logout', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.lastLogout = new Date();   // ✅ Set logout time
    user.isActive = true;           // ✅ Still active for now
    await user.save();

    res.json({ success: true, message: "Logout successful" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

  
// ✅ Fix the router name and use correct model
userRouter.get('/all', auth, async (req, res) => {
    try {
      const users = await userModel.find();
  
      // ✅ Calculate 24 hours ago
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
      // ✅ Active users = those logged in within the last 24 hours
      const activeUsers = users.filter(user =>
        user.lastLogin && new Date(user.lastLogin) > twentyFourHoursAgo
      );
  
      res.json({ success: true, users, activeUsers });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching users" });
    }
  });
  
  userRouter.delete('/admin/user', async (req, res) => {
    const { ids } = req.body; // Expecting an array of IDs
  
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No IDs provided for deletion" });
    }
  
    try {
      const result = await userModel.deleteMany({ _id: { $in: ids } });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'No users found to delete' });
      }
  
      return res.status(200).json({ success: true, message: 'Users deleted successfully' });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  });
  
  
  

export default userRouter;
