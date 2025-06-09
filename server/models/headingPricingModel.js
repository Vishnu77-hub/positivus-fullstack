// models/headingPricingModel.js
import mongoose from 'mongoose';

const headingPricingSchema = new mongoose.Schema({
  pricingBanner: { type: String,default: "" },
  pricingDescription: { type: String,default: "" },
  isEnabledHeadingPricing: { type: Boolean },
}, {
  timestamps: true,
  collection: 'Banner & Desc of Pricing'  // Force collection name in DB
});

export default mongoose.models.HeadingPricing || mongoose.model('headingpricing', headingPricingSchema);
