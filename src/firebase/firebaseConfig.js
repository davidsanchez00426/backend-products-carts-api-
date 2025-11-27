import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "TU_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "TU_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "TU_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "TU_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "TU_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "TU_APP_ID"
}

let app = null
let db = null

try {
  // Solo inicializar Firebase si está configurado
  const isConfigured = firebaseConfig.projectId && 
                       firebaseConfig.projectId !== "TU_PROJECT_ID" &&
                       firebaseConfig.apiKey && 
                       firebaseConfig.apiKey !== "TU_API_KEY"
  
  if (isConfigured) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  } else {
    console.warn('Firebase no está configurado. La app funcionará en modo local.')
  }
} catch (error) {
  console.warn('Error inicializando Firebase:', error)
  console.warn('La app funcionará en modo local.')
}

export { db }

