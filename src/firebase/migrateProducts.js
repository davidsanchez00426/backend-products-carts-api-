// Script de utilidad para migrar productos a Firestore
// Ejecutar desde la consola del navegador o crear un componente temporal

import { collection, addDoc } from 'firebase/firestore'
import { db } from './firebaseConfig'
import { products } from '../data/products'

export const migrateProductsToFirestore = async () => {
  try {
    const productsCollection = collection(db, 'products')
    
    for (const product of products) {
      // Convertir id numérico a string y removerlo, Firestore generará su propio ID
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

// Para usar este script:
// 1. Importa la función en un componente temporal o en la consola
// 2. Ejecuta: migrateProductsToFirestore()
// 3. Verifica en Firebase Console que los productos se hayan creado

