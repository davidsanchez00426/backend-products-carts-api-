import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'
import { getProductById } from '../firebase/promises'

function ItemDetailContainer() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)
    
    getProductById(itemId).then(data => {
      setProduct(data)
      setLoading(false)
    })
  }, [itemId])

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>
          Cargando producto...
        </p>
      ) : !product ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
            Producto no encontrado
          </p>
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
            Volver al catálogo
          </a>
        </div>
      ) : (
        <ItemDetail product={product} />
      )}
    </div>
  )
}

export default ItemDetailContainer

