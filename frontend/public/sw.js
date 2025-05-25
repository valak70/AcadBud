self.addEventListener('push', function (event) {
  const data = event.data?.json();
  console.log('Push data:', data);

  const options = {
    body: data?.body || 'You have a class soon!',
    icon: '/icon.png',
    actions: data?.actions || [], // Include actions from payload
    data: data?.data || {}        // Include custom data (like courseId, time)
  };

  event.waitUntil(
    self.registration.showNotification(data?.title || 'Reminder', options)
  );
});

self.addEventListener('notificationclick', function (event) {
  const action = event.action;
  const data = event.notification.data;

  if (action === 'attend' || action === 'skip') {
    const status = action === 'attend' ? 'present' : 'absent';

    fetch('/api/attendance/mark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseId: data.courseId,
        date: new Date().toISOString().split('T')[0],
        startTime: data.classTime,
        status
      })
    });
  } else {
    // Handle default click (notification body)
    event.waitUntil(clients.openWindow(`/courses`));
  }

  event.notification.close();
});
