import React, { useState } from 'react'

function ItemCount({ stock, onAdd }) {
  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 1
    if (value >= 1 && value <= stock) {
      setQuantity(value)
    }
  }

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAdd = () => {
    onAdd(quantity)
  }

  return (
    <div>
      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          onClick={handleDecrease} 
          disabled={quantity <= 1}
          style={{ 
            padding: '5px 15px', 
            fontSize: '18px',
            backgroundColor: quantity <= 1 ? '#ccc' : '#f0f0f0',
            border: '1px solid #ccc',
            cursor: quantity <= 1 ? 'not-allowed' : 'pointer'
          }}
        >
          -
        </button>
        <input
          type="number"
          min="1"
          max={stock}
          value={quantity}
          onChange={handleChange}
          style={{ 
            width: '60px', 
            textAlign: 'center', 
            fontSize: '18px',
            padding: '5px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }}
        />
        <button 
          onClick={handleIncrease} 
          disabled={quantity >= stock}
          style={{ 
            padding: '5px 15px', 
            fontSize: '18px',
            backgroundColor: quantity >= stock ? '#ccc' : '#f0f0f0',
            border: '1px solid #ccc',
            cursor: quantity >= stock ? 'not-allowed' : 'pointer'
          }}
        >
          +
        </button>
        <span style={{ marginLeft: '10px', color: '#666' }}>
          (Stock disponible: {stock})
        </span>
      </div>
      
      <button 
        onClick={handleAdd}
        disabled={quantity < 1 || quantity > stock}
        style={{ 
          marginTop: '20px', 
          padding: '10px 30px', 
          backgroundColor: (quantity < 1 || quantity > stock) ? '#ccc' : 'green', 
          color: 'white', 
          border: 'none', 
          cursor: (quantity < 1 || quantity > stock) ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          borderRadius: '5px'
        }}
      >
        Agregar al Carrito
      </button>
    </div>
  )
}

export default ItemCount


