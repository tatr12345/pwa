self.addEventListener('push', (event) => {
  const options = {
    // body: event.data.text(),
    body: 'Вам написали в чате поддержки',
    icon: '/favicon.ico', // Replace with your icon path
  }
  event.waitUntil(
    self.registration.showNotification('Уведомление', options)
  )
})
