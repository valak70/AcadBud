const webpush = require("web-push");
const Subscription = require("../models/Subscription");

exports.sendTestNotification = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    
    const subDoc = await Subscription.findOne({ userId });
    if (!subDoc) return res.status(404).json({ message: "No subscription found" });

    const payload = JSON.stringify({
      title: "Test Notification",
      body: "This is a test push notification from AcadBud 🚀",
    });

    await webpush.sendNotification(subDoc.subscription, payload);

    res.json({ message: "Notification sent" });
  } catch (err) {
    console.error("Push send error", err);
    res.status(500).json({ message: "Failed to send notification" });
  }
};


exports.subscribeUser = async (req, res) => {
  try {
    const { subscription } = req.body;
    const userId = req.userId;

    // Avoid saving duplicates by checking endpoint
    const existing = await Subscription.findOne({
      userId,
      'subscription.endpoint': subscription.endpoint,
    });

    if (!existing) {
      await Subscription.create({ userId, subscription });
    }

    res.status(201).json({ message: 'Subscription saved.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save subscription.' });
  }
};
