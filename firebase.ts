// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcPlWdP0066ITPtEJis-D2S0bhMCmeMcM',
  authDomain: 'nextflix-e852d.firebaseapp.com',
  projectId: 'nextflix-e852d',
  storageBucket: 'nextflix-e852d.appspot.com',
  messagingSenderId: '337503301800',
  appId: '1:337503301800:web:80cc2e1bb5577da064929d',
}

// Initialize Firebase
// very important to initialize app only once, so check if we have an instance already.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }

// ------------------------------------------------------------------------

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyAcPlWdP0066ITPtEJis-D2S0bhMCmeMcM',
//   authDomain: 'nextflix-e852d.firebaseapp.com',
//   projectId: 'nextflix-e852d',
//   storageBucket: 'nextflix-e852d.appspot.com',
//   messagingSenderId: '337503301800',
//   appId: '1:337503301800:web:80cc2e1bb5577da064929d',
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
