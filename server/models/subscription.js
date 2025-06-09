import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'pricing', required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
  planName: String,
  price: Number,
  planPeriod: String,
  email: String,
  name: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  expiryDate: { type: Date },  // ✅ New field
} ,{timestamps: true,  // ✅ This auto-adds createdAt & updatedAt
  collection: 'User Subscription List' 
});

export default  mongoose.models.subscription || mongoose.model('subscription', subscriptionSchema);

