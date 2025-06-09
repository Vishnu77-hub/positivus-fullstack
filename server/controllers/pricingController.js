import pricingModel from '../models/pricingModel.js';

export const addPricing = async (req, res) => {
  try {
    const { 
      planName, planDetails, price, currency, planPeriod } = req.body;
    const doc = new pricingModel({
      planDetails: JSON.parse(planDetails),
      planName,
      price: Number(price),
      currency,
      planPeriod,
    });
    await doc.save();
    res.json({ success: true, pricing: doc });
  } catch (error) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const listPricing = async (req, res) => {
  try {
    const pricing = await pricingModel.find({});
    res.json({ success: true, pricing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removePricing = async (req, res) => {
  try {
    await pricingModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const singlePricing = async (req, res) => {
  try {
    const { pricingId } = req.body;
    const pricing = await pricingModel.findById(pricingId);
    res.json({ success: true, pricing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editPricing = async (req, res) => {
  try {
    // Multer guarantees req.body fields exist
    const { pricingId,
      //  pricingDescription,
        planName, planDetails, price, currency, planPeriod } = req.body;
    // const file = req.files?.pricingBanner?.[0];

    const update = {
      // ...(pricingDescription && { pricingDescription }),
      ...(planName && { planName }),
      ...(planPeriod && { planPeriod }),
      ...(planDetails && { planDetails: JSON.parse(planDetails) }),
      ...(price && { price: Number(price) }),
      ...(currency && { currency }),
    };

    // if (file) {
    //   const uploadRes = await cloudinary.uploader.upload(file.path);
    //   update.pricingBanner = uploadRes.secure_url;
    // }

    const updated = await pricingModel.findByIdAndUpdate(pricingId, update, { new: true });
    res.json({ success: true, pricing: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};



export const togglePricingEnable = async (req, res) => {
  try {
    const { id, isEnabledPricing } = req.body;

    const updated = await pricingModel.findByIdAndUpdate(
      id,
      { isEnabledPricing },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: `Item ${isEnabledPricing ? 'enabled' : 'disabled'} successfully`, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error toggling enable status" });
  }
};