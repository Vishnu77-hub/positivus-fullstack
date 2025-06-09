import { v2 as cloudinary } from 'cloudinary';
import headingPricingModel from '../models/headingPricingModel.js';
import HeadingPricing from '../models/headingPricingModel.js';


export const addHeadingPricing = async (req, res) => {
  try {
    const { pricingDescription } = req.body;
    const file = req.files?.pricingBanner?.[0];

    let bannerUrl = "";
    if (file) {
      const uploadRes = await cloudinary.uploader.upload(file.path);
      bannerUrl = uploadRes.secure_url;
    }

    const doc = new HeadingPricing({
      pricingBanner: bannerUrl, // may be empty string if no image
      pricingDescription: pricingDescription || "",
    });

    await doc.save();
    res.json({ success: true, pricing: doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const listHeadingPricingTable = async (req, res) => {
    try {
      const headingPricing = await headingPricingModel.find({});
      res.json({ success: true, headingPricing });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

export const removeHeadingPricing = async (req, res) => {
    try {
      await headingPricingModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: 'Deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  export const singleHeadingPricing = async (req, res) => {
    try {
      const { headingPricingId } = req.body;
      const headingPricing = await headingPricingModel.findById(headingPricingId);
      res.json({ success: true, headingPricing });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  export const editHeadingPricing = async (req, res) => {
    try {
      const { headingPricingId,
         pricingDescription,
        } = req.body;
      const file = req.files?.pricingBanner?.[0];
  
      const update = {
        ...(pricingDescription && { pricingDescription }),
      };
  
      if (file) {
        const uploadRes = await cloudinary.uploader.upload(file.path);
        update.pricingBanner = uploadRes.secure_url;
      }
  
      const updated = await headingPricingModel.findByIdAndUpdate(headingPricingId, update, { new: true });
      res.json({ success: true, headingPricing: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };



  export const toggleHeadingPricingEnable = async (req, res) => {
    try {
      const { id, isEnabledHeadingPricing } = req.body;
  
      const updated = await headingPricingModel.findByIdAndUpdate(
        id,
        { isEnabledHeadingPricing },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
  
      res.json({ success: true, message: `Item ${isEnabledHeadingPricing ? 'enabled' : 'disabled'} successfully`, updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error toggling enable status" });
    }
  };
  
  