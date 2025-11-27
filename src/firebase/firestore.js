import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  getDoc, 
  addDoc 
} from 'firebase/firestore'
import { db } from './firebaseConfig'

export const getProductsFromFirestore = async () => {
  try {
    const productsCollection = collection(db, 'products')
    const querySnapshot = await getDocs(productsCollection)
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return products
  } catch (error) {
    console.error('Error obteniendo productos:', error)
    throw error
  }
}

export const getProductsByCategoryFromFirestore = async (categoryId) => {
  try {
    const productsCollection = collection(db, 'products')
    const q = query(productsCollection, where('category', '==', categoryId))
    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return products
  } catch (error) {
    console.error('Error obteniendo productos por categoría:', error)
    throw error
  }
}

export const getProductByIdFromFirestore = async (productId) => {
  try {
    const productDoc = doc(db, 'products', productId)
    const productSnapshot = await getDoc(productDoc)
    
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...productSnapshot.data()
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error obteniendo producto:', error)
    throw error
  }
}

const isFirebaseConfigured = () => {
  try {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || ''
    return projectId !== '' && projectId !== 'TU_PROJECT_ID'
  } catch {
    return false
  }
}

export const createOrder = async (order) => {
  // Generar ID local como respaldo
  const generateLocalOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  }

  // Si Firebase no está configurado o db es null, usar modo local
  if (!isFirebaseConfigured() || !db) {
    console.warn('Firebase no configurado, generando ID de orden local')
    const localOrderId = generateLocalOrderId()
    // Guardar en localStorage como respaldo
    try {
      const orders = JSON.parse(localStorage.getItem('localOrders') || '[]')
      orders.push({ id: localOrderId, ...order })
      localStorage.setItem('localOrders', JSON.stringify(orders))
    } catch (err) {
      console.warn('No se pudo guardar en localStorage:', err)
    }
    return localOrderId
  }

  // Si Firebase está configurado, intentar guardar en Firestore
  try {
    const ordersCollection = collection(db, 'orders')
    const docRef = await addDoc(ordersCollection, order)
    return docRef.id
  } catch (error) {
    console.error('Error creando orden en Firestore:', error)
    // Fallback a ID local si Firestore falla
    const localOrderId = generateLocalOrderId()
    try {
      const orders = JSON.parse(localStorage.getItem('localOrders') || '[]')
      orders.push({ id: localOrderId, ...order })
      localStorage.setItem('localOrders', JSON.stringify(orders))
    } catch (err) {
      console.warn('No se pudo guardar en localStorage:', err)
    }
    return localOrderId
  }
}

