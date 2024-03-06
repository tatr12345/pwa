self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/logo192.png', // Replace with your icon path
  }
  event.waitUntil(
    self.registration.showNotification('PWA push - peero dev api', options)
  )
})
