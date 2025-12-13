import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { products } from '../data/products'

export const migrateProductsToFirestore = async () => {
  try {
    const productsCollection = collection(db, 'products')
    
    for (const product of products) {
      const { id, ...productData } = product
      await addDoc(productsCollection, productData)
      console.log(`Producto "${product.name}" agregado a Firestore`)
    }
    
    console.log('Migración completada exitosamente')
    return true
  } catch (error) {
    console.error('Error durante la migración:', error)
    throw error
  }
}

