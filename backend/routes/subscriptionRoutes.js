const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { subscribeUser, sendTestNotification } = require('../controllers/subscriptionController');

// Save subscription
router.post('/subscribe',authMiddleware, subscribeUser);

router.post("/test", authMiddleware, sendTestNotification);


module.exports = router;
