import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseCredentials } from './firebaseCredentials'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseCredentials.apiKey || "TU_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseCredentials.authDomain || "TU_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseCredentials.projectId || "TU_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseCredentials.storageBucket || "TU_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseCredentials.messagingSenderId || "TU_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseCredentials.appId || "TU_APP_ID"
}

let app = null
let db = null

try {
  const isConfigured = firebaseConfig.projectId && 
                       firebaseConfig.projectId !== "TU_PROJECT_ID" &&
                       firebaseConfig.apiKey && 
                       firebaseConfig.apiKey !== "TU_API_KEY"
  
  if (isConfigured) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  }
} catch (error) {
  console.warn('Error inicializando Firebase:', error)
}

export { db }

