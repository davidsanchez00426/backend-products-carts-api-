import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function CartItem({ item }) {
  const { removeItem, updateQuantity } = useContext(CartContext)

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    } else {
      removeItem(item.id)
    }
  }

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px', 
      padding: '15px', 
      borderBottom: '1px solid #eee',
      marginBottom: '10px'
    }}>
      <img 
        src={item.img} 
        alt={item.name} 
        style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
      />
      
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
        <p style={{ margin: '5px 0', color: '#666' }}>Tamaño: {item.size}</p>
        <p style={{ margin: '5px 0', fontSize: '18px', color: 'green' }}>${item.price} c/u</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          onClick={handleDecrease}
          style={{ 
            padding: '5px 15px', 
            fontSize: '18px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          -
        </button>
        <span style={{ fontSize: '18px', minWidth: '30px', textAlign: 'center' }}>
          {item.quantity}
        </span>
        <button 
          onClick={handleIncrease}
          disabled={item.quantity >= item.stock}
          style={{ 
            padding: '5px 15px', 
            fontSize: '18px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            cursor: item.quantity >= item.stock ? 'not-allowed' : 'pointer',
            opacity: item.quantity >= item.stock ? 0.5 : 1
          }}
        >
          +
        </button>
      </div>

      <div style={{ minWidth: '100px', textAlign: 'right' }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>
          ${subtotal.toFixed(2)}
        </p>
      </div>

      <button 
        onClick={() => removeItem(item.id)}
        style={{ 
          padding: '5px 15px', 
          backgroundColor: 'red', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Eliminar
      </button>
    </div>
  )
}

export default CartItem

