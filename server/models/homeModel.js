// models/headingPricingModel.js
import mongoose from 'mongoose';

const headingPricingSchema = new mongoose.Schema({
  homeBanner: { type: String,default: "" },
  homeTitle: { type: String,default: "" },
  homeDescription: { type: String,default: "" },
  homeButton: { type: String,default: "" },
  isEnabledHome: { type: Boolean, default:false},
}, {
  timestamps: true,
  collection: 'Home Page'  // Force collection name in DB
});

export default mongoose.models.HeadingPricing || mongoose.model('home', headingPricingSchema);
