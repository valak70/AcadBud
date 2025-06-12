const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendResetEmail } = require('../utils/sendEmail');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      isVerified: false,
    });

    // create email verification token (JWT or UUID)
    const emailToken = jwt.sign({ id: user._id }, process.env.EMAIL_SECRET);

    // Send verification email
    const verifyURL = `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${emailToken}`;
    await sendVerificationEmail(user.email, user.name, verifyURL);

    res.status(200).json({ message: 'Registration successful. Please verify your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    if (!user.isVerified) return res.status(403).json({ error: 'Email not verified' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only HTTPS in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({user:{_id: user._id,name: user.name,email: user.email}, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyEmail = async (req,res) =>{
   try{

    const {token} = req.query;
   const {id} = jwt.verify(token, process.env.EMAIL_SECRET);
   await User.findByIdAndUpdate(id,{isVerified : true});
   res.send("Email Verified Successfully!")
   }catch(err){
    res.status(400).send('Invalid or expired token.')
   }

}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const token = jwt.sign({ id: user._id }, process.env.RESET_SECRET, { expiresIn: "15m" });
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  
  await sendResetEmail(user.email, user.name, resetLink);
  res.json({ message: "Password reset link sent to email." });
};


exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const hash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { passwordHash: hash });
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
