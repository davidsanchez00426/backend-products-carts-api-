import { products } from '../data/products';
import { 
  getProductsFromFirestore, 
  getProductsByCategoryFromFirestore, 
  getProductByIdFromFirestore 
} from './firestore';
import { firebaseCredentials } from './firebaseCredentials';

const useFirestore = () => {
  try {
    // Verificar si Firebase está configurado (no son los valores por defecto)
    // Prioridad: Variables de entorno > Archivo de credenciales
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseCredentials.projectId || ''
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || firebaseCredentials.apiKey || ''
    
    return projectId !== '' && 
           projectId !== 'TU_PROJECT_ID' && 
           apiKey !== '' && 
           apiKey !== 'TU_API_KEY'
  } catch {
    return false
  }
}

export const getProducts = async () => {
  if (useFirestore()) {
    try {
      return await getProductsFromFirestore()
    } catch (error) {
      console.warn('Error obteniendo productos de Firestore, usando datos locales:', error)
    }
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductsByCategory = async (categoryId) => {
  if (useFirestore()) {
    try {
      return await getProductsByCategoryFromFirestore(categoryId)
    } catch (error) {
      console.warn('Error obteniendo productos de Firestore, usando datos locales:', error)
    }
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = products.filter(product => product.category === categoryId);
      resolve(filteredProducts);
    }, 500);
  });
};

export const getProductById = async (id) => {
  if (useFirestore()) {
    try {
      const product = await getProductByIdFromFirestore(id)
      if (product) return product
    } catch (error) {
      console.warn('Error obteniendo producto de Firestore, usando datos locales:', error)
    }
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(product => product.id === parseInt(id));
      resolve(product);
    }, 500);
  });
};

