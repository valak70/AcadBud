// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;  // Ensure token contains `id`
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
