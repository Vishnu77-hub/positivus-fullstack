import express from 'express';
import Subscription from '../models/subscription.js';
import authMiddleware from '../middleware/auth.js';
import moment from 'moment';
import { getAllSubscriptions, updateSubscriptionStatus } from '../controllers/subscriptionController.js';
import adminAuth from '../middleware/adminAuth.js';
import mongoose from 'mongoose';

const router = express.Router();


// Admin Routes
router.get('/admin/list', getAllSubscriptions);
router.put('/admin/update-status', updateSubscriptionStatus);

// Add subscription
// const moment = require('moment');

router.post('/add', authMiddleware, async (req, res) => {
  const { planId, planName, price, email, name, phone, planPeriod } = req.body;

  const createdAt = new Date();

  // Set expiry based on planDuration
  let expiryDate;

  const normalizedPeriod = planPeriod?.toLowerCase(); // safely convert to lowercase
  
  if (normalizedPeriod === 'weekly') {
    expiryDate = moment(createdAt).add(7, 'days').toDate();
  } else if (normalizedPeriod === 'monthly') {
    expiryDate = moment(createdAt).add(30, 'days').toDate();
  } else if (normalizedPeriod === 'yearly') {
    expiryDate = moment(createdAt).add(365, 'days').toDate();
    } else if (normalizedPeriod === 'daily') {
        expiryDate = moment(createdAt).add(1, 'days').toDate();
  } else {
    // Default to 30 days if not specified
    expiryDate = moment(createdAt).add(30, 'days').toDate();
  }
  

  try {
    // Check for existing subscription with same plan and user
    const existing = await Subscription.findOne({
      userId: req.user.id,
      planId,
      status: { $in: ['Pending', 'Accepted'] }
    });
  
    if (existing) {
      return res.status(400).json({ success: false, message: 'You already have a subscription request for this plan.' });
    }
  
    const newSub = new Subscription({
      userId: req.user.id,
      planId,
      planName,
      price,
      planPeriod,
      email,
      name,
      phone,
      createdAt,
      expiryDate,
    });
  
    await newSub.save();
    res.json({ success: true, subscription: newSub });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
  
});

  
  // Get user's subscriptions
  router.get('/my', authMiddleware, async (req, res) => {
    try {
      const subscriptions = await Subscription.find({ userId: req.user.id });
      res.json({ success: true, subscriptions });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // DELETE /api/subscription/admin/delete/:id
 router.delete('/admin/subscription/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const subscription = await Subscription.findByIdAndDelete(id);
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      return res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  export default router;
  
  