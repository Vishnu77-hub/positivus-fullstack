import express from 'express';
import multer from 'multer';
import adminAuth from '../middleware/adminAuth.js';
import {
  addPricing,
  // headingPricing,
  listPricing,
  removePricing,
  singlePricing,
  editPricing,
  togglePricingEnable,
} from '../controllers/pricingController.js';
import { addHeadingPricing, editHeadingPricing, listHeadingPricingTable, removeHeadingPricing, singleHeadingPricing, toggleHeadingPricingEnable } from '../controllers/headingPricingController.js';

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const cpUpload = upload.fields([{ name: 'pricingBanner', maxCount: 1 }]);

// router.post('/addPricing', adminAuth, cpUpload, addPricing);
router.post("/addPricing", upload.fields([{ name: "pricingBanner", maxCount: 1 }]), addPricing);
router.post('/addHeadingPricing', adminAuth, cpUpload, addHeadingPricing);
router.get('/listPricingTable', listPricing);
router.get('/listHeadingPricingTable', listHeadingPricingTable);
router.post('/removePricing', adminAuth, removePricing);
router.post('/removeHeadingPricing', adminAuth, removeHeadingPricing);
router.post('/singlePricing', singlePricing);
router.post('/singleHeadingPricing', singleHeadingPricing);
router.put('/editPricing', adminAuth, cpUpload, editPricing);
router.put('/editHeadingPricing', adminAuth, cpUpload, editHeadingPricing);
router.put('/togglePricingEnable', adminAuth, togglePricingEnable);
router.put('/toggleHeadingPricingEnable', adminAuth, toggleHeadingPricingEnable);


export default router;
