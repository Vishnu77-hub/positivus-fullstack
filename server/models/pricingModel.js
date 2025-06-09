import mongoose from 'mongoose';

const pricingSchema = new mongoose.Schema({
  // pricingBanner: { type: String, required: true },
  // pricingDescription: { type: String, required: true },
  planDetails: { type: [String], required: true },
  planName: { type: String, required: true },
  planPeriod: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  isEnabledPricing: { type: Boolean, default: true },
}, { timestamps: true,
  collection: 'Pricing Detials' 
});

export default mongoose.models.pricing || mongoose.model('pricing', pricingSchema);
