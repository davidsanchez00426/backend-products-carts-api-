import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import ItemCount from './ItemCount'

function ItemDetail({ product }) {
  const { addToCart } = useContext(CartContext)
  const [itemAdded, setItemAdded] = useState(false)

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity)
    setItemAdded(true)
  }

  if (!product) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>Producto no encontrado</p>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <img src={product.img} alt={product.name} style={{ width: '100%', maxWidth: '400px' }} />
      <h2>{product.name}</h2>
      <p style={{ fontSize: '24px', color: 'green' }}>${product.price}</p>
      <p>{product.description}</p>
      <p>Tamaño: {product.size}</p>
      <p>Stock: {product.stock}</p>
      
      {product.stock === 0 ? (
        <p style={{ color: 'red', fontSize: '18px', marginTop: '20px' }}>Producto sin stock</p>
      ) : itemAdded ? (
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: 'green', fontSize: '18px', marginBottom: '15px' }}>¡Producto agregado al carrito!</p>
          <Link to="/cart">
            <button style={{ 
              padding: '10px 30px', 
              backgroundColor: 'blue', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px',
              marginRight: '10px'
            }}>
              Ir al Carrito
            </button>
          </Link>
          <Link to="/">
            <button style={{ 
              padding: '10px 30px', 
              backgroundColor: 'gray', 
              color: 'white', 
              border: 'none', 
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              Seguir Comprando
            </button>
          </Link>
        </div>
      ) : (
        <ItemCount stock={product.stock} onAdd={handleAddToCart} />
      )}
    </div>
  )
}

export default ItemDetail

