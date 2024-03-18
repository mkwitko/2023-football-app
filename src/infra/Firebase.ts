// Import the functions you need from the SDKs you need
import { Capacitor } from '@capacitor/core'
import { initializeApp, getApps } from 'firebase/app'
import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth'

const FirebaseCredentials = {
  apiKey:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY_PROD
      : process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY_DEV,
  authDomain:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
      : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_PROJECT_ID_PROD
      : process.env.REACT_APP_FIREBASE_PROJECT_ID_DEV,
  storageBucket:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_PROD
      : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_PROD
      : process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_APP_ID_PROD
      : process.env.REACT_APP_FIREBASE_APP_ID_DEV,
  measurementId:
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_PROD
      : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID_DEV,
}

// Initialize Firebase
const firebase_app =
  getApps().length === 0 ? initializeApp(FirebaseCredentials) : getApps()[0]

Capacitor.isNativePlatform() &&
  initializeAuth(firebase_app, {
    persistence: indexedDBLocalPersistence,
  })

export default firebase_app
