import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './ItemList'
import { getProducts, getProductsByCategory } from '../firebase/promises'

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    
    const fetchFunction = categoryId 
      ? getProductsByCategory(categoryId)
      : getProducts()

    fetchFunction.then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [categoryId])

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>{greeting}</h1>
      
      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
          Cargando productos...
        </p>
      ) : products.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
          No se encontraron productos en esta categoría
        </p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  )
}

export default ItemListContainer
