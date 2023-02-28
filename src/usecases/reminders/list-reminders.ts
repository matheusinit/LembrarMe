export const listReminders = () => {
  const reminders = [1, 2, 3, 4, 5].map(item => ({ 
    id: item,
    content: `Reminder example ${item}`,
    createdAt: new Date()
  }))

  return reminders
}