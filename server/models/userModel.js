import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true }, // 👈 Add this line
  password: { type: String, required: true },
  subscriptionData: { type: Object, default: {} },
  
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  lastLogout: Date,
  isActive: {
    type: Boolean,
    default: false,
  },
  lastInteraction: Date,
}, {timestamps: true,  // ✅ This auto-adds createdAt & updatedAt
  collection: 'User List' 
});

// const userModel = mongoose.models['User List'] || mongoose.model('User List', userSchema);
export default mongoose.models.users || mongoose.model('users', userSchema);
// export default userModel;