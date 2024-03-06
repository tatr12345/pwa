import { initializeApp } from 'firebase/app'

export const initFirebase = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyAGEWXhJOys40kMoLIee6UsXpxcjY2cWtg',
    authDomain: 'peero-8c456.firebaseapp.com',
    databaseURL: 'https://peero-8c456.firebaseio.com',
    projectId: 'peero-8c456',
    storageBucket: 'peero-8c456.appspot.com',
    messagingSenderId: '101013431202',
    appId: '1:101013431202:web:4ff1c53bec4fe8df9548fb',
    measurementId: 'G-G9E79E2TYB'
  }
  const app = initializeApp(firebaseConfig)

  return app
}