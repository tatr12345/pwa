self.addEventListener('push', (event) => {
  const options = {
    // body: event.data.text(),
    body: 'Вам написали в чате поддержки',
    icon: '/icon175x175.jpeg', // Replace with your icon path
  }
  event.waitUntil(
    self.registration.showNotification('PWA push - peero dev api', options)
  )
})
