import { v2 as cloudinary } from 'cloudinary';
import homeModel from '../models/homeModel.js';
import home from '../models/homeModel.js';


export const addHome = async (req, res) => {
    try {
      const { homeDescription, homeTitle, homeButton } = req.body;
      const file = req.files?.homeBanner?.[0];
  
      let bannerUrl = "";
      if (file) {
        const uploadRes = await cloudinary.uploader.upload(file.path);
        bannerUrl = uploadRes.secure_url;
      }
  
      const doc = new home({
        homeBanner: bannerUrl, // may be empty string if no image
        homeTitle: homeTitle || "",
        homeButton: homeButton || "",
        homeDescription: homeDescription || "",
      });
  
      await doc.save();
      res.json({ success: true, home: doc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };


  export const listHome = async (req, res) => {
    try {
      const home = await homeModel.find({});
      res.json({ success: true, home });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  export const removeHome = async (req, res) => {
    try {
      await homeModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: 'Deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };

  export const singleHome = async (req, res) => {
    try {
      const { homeId } = req.body;
      const home = await homeModel.findById(homeId);
      res.json({ success: true, home });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };


  export const editHome = async (req, res) => {
    try {
      const { homeId,
         homeDescription,
         homeTitle,
         homeButton } = req.body;
      const file = req.files?.homeBanner?.[0];
  
      const update = {
        ...(homeDescription && { homeDescription }),
        ...(homeTitle && { homeTitle }),
        ...(homeButton && { homeButton }),
      };
  
      if (file) {
        const uploadRes = await cloudinary.uploader.upload(file.path);
        update.homeBanner = uploadRes.secure_url;
      }
  
      const updated = await homeModel.findByIdAndUpdate( homeId, update, { new: true });
      res.json({ success: true, home: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };



  export const toggleHomeEnable = async (req, res) => {
    try {
      const { id, isEnabledHome } = req.body;
  
      const updated = await homeModel.findByIdAndUpdate(
        id,
        { isEnabledHome },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Item not found" });
      }
  
      res.json({ success: true, message: `Item ${isEnabledHome ? 'enabled' : 'disabled'} successfully`, updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error toggling enable status" });
    }
  };


  // export const toggleHomeEnable = async (req, res) => {
  //   try {
  //     const { id, isEnabledHome } = req.body;
  //     const doc = await homeModel.findByIdAndUpdate(id, { isEnabledHome }, { new: true });
  
  //     if (!doc) {
  //       return res.status(404).json({ success: false, message: "Home entry not found" });
  //     }
  
  //     res.json({ success: true, message: "Status updated", home: doc });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: error.message });
  //   }
  // };
  