const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const { checkAndSendNotifications } = require('./utils/notificationScheduler');


dotenv.config();

const authRoutes = require('./routes/authRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const gpaRoutes = require('./routes/gpaRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/gpa', gpaRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notification', subscriptionRoutes);

// MongoDB Connection
const startServer = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB connected');
  
      app.listen(process.env.PORT, () => {
        console.log(`🚀 Server running on port ${process.env.PORT}`);
      });
    } catch (err) {
      console.error('❌ Failed to connect to MongoDB:', err.message);
      process.exit(1); // Exit process on DB failure
    }
  };
  
  startServer();

// cron.schedule('* * * * *', () => {
//   checkAndSendNotifications();
//   console.log('Checking for classes');
// });
