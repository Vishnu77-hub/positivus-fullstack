  import userModel from "../models/userModel.js";

  import Subscription from "../models/subscription.js";

  const getAllSubscriptions = async (req, res) => {
    try {
      const subscriptions = await Subscription.find().sort({ createdAt: -1 });
      res.json({ success: true, subscriptions });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  // add subscription to user
  const addToSubscription = async (req, res) => {
      try {
          
          const { userId, subscriptionId, subscriptionType } = req.body;

          const userData = await userModel.findById(userId)
          let subscriptionData = await userData.subscriptionData;

          if (subscriptionData[subscriptionId]) {
              if (subscriptionData[subscriptionId][subscriptionType]) {
                  subscriptionData[subscriptionId][subscriptionType] +=1
              }
              else{
                  subscriptionData[subscriptionId][subscriptionType] = 1
              }
          }
          else{
              subscriptionData[subscriptionId] = {}
                  subscriptionData[subscriptionId][subscriptionType] = 1

              }

              await userModel.findByIdAndUpdate(userId, { subscriptionData })
              res.json({ success: true, message: "Subscription added successfully" });
      } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
      }
  }

  // update subscription to user
  const updateSubscription = async (req, res) => {
      try {
          
          const { userId, subscriptionId, subscriptionType } = req.body;

          let subscriptionData = await userData.subscriptionData;

          subscriptionData[subscriptionId][subscriptionType] = quantity

          await userModel.findByIdAndUpdate(userId, { subscriptionData })
          res.json({ success: true, message: "Subscription Upadated successfully" });

      } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
      }
  }

  // get user subscription data
  const getUserSubscription = async (req, res) => {

      try {
          const { userId } = req.body

          const userData = await userModel.findById(userId)
          let subscriptionData = await userData.subscriptionData;

          res.json({ success: true, subscriptionData: subscriptionData });
          
      } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
      }

  }

  const updateSubscriptionStatus = async (req, res) => {
      try {
        const { subscriptionId, newStatus } = req.body;
    
        const updated = await Subscription.findByIdAndUpdate(
          subscriptionId,
          { status: newStatus },
          { new: true }
        );
    
        res.json({ success: true, subscription: updated });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    };

  export { addToSubscription, updateSubscription, getUserSubscription, getAllSubscriptions, updateSubscriptionStatus }
