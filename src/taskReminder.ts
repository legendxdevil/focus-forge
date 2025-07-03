// taskReminder.ts
// Background notification logic for overdue tasks
// Usage: Import and call setupTaskReminders() in your App root (e.g. App.tsx)

export function setupTaskReminders() {
  if (!('Notification' in window)) return;
  Notification.requestPermission();

  let reminderInterval: number | undefined;
  let lastReminded: Record<string, number> = {};

  function checkTasks() {
    try {
      const tasksRaw = localStorage.getItem('tasks');
      if (!tasksRaw) return;
      const tasks = JSON.parse(tasksRaw) as Array<any>;
      const now = Date.now();
      tasks.forEach(task => {
        if (task.completed) return;
        const created = new Date(task.createdAt).getTime();
        const overdue = now - created > 3 * 60 * 60 * 1000; // 3 hours
        if (!overdue) return;
        // Only remind every 1 hour
        const last = lastReminded[task.id] || 0;
        if (now - last < 60 * 60 * 1000) return;
        // Send notification
        if (Notification.permission === 'granted') {
          new Notification(
            `Task Reminder: ${task.title}`,
            {
              body: 'Is task ko jaldi se jaldi pura kariye!',
              requireInteraction: true
            }
          );
        }
        lastReminded[task.id] = now;
      });
    } catch {}
  }

  if (reminderInterval) clearInterval(reminderInterval);
  reminderInterval = window.setInterval(checkTasks, 60 * 1000); // check every 1 min
  checkTasks(); // initial check
}
