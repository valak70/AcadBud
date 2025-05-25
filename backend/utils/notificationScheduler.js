const webpush = require('web-push');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const dotenv = require('dotenv');
dotenv.config();

webpush.setVapidDetails(
  'mailto:amileleft@email.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = webpush;


const checkAndSendNotifications = async () => {
  try {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Get current day name (e.g. "Monday")
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[now.getDay()];

    const users = await User.find({});

    for (const user of users) {
      const classesToNotify = user.timetable.filter(entry => {
        if (entry.day !== todayName) return false;
        const [hours, minutes] = entry.startTime.split(':').map(Number);
        const classTimeMinutes = hours * 60 + minutes;

        // 3. Check if current time is exactly 5 minutes before class
        return currentMinutes === classTimeMinutes +5 ;
      });

      if (classesToNotify.length === 0) {
        continue;
      }

      const subscriptions = await Subscription.find({ userId: user._id });
      if (!subscriptions.length) {

        continue;
      }

      for (const classEntry of classesToNotify) {
        const payload = JSON.stringify({
          title: 'Class Starting Soon',
          body: `Your "${classEntry.subjectName}" class starts afafdsafd ${classEntry.startTime.split(':').slice(0, 2).join(':')}`,
          actions: [
            { action: 'attend', title: 'Yes, I will attend' },
            { action: 'skip', title: 'No, I will skip' }
          ],
          data: {
            courseId: classEntry.courseId,
            classTime: classEntry.startTime
          }
        });



        for (const sub of subscriptions) {
          try {
            await webpush.sendNotification(sub.subscription, payload);

          } catch (err) {
            console.error(`❌ Push error for device ${sub._id}:`, err);

            if (err.statusCode === 410 || err.statusCode === 404) {
              await Subscription.deleteOne({ _id: sub._id });
              console.log(`🧹 Removed invalid subscription ${sub._id}`);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("🚨 Scheduler error:", err);
  }
};



module.exports = { checkAndSendNotifications };