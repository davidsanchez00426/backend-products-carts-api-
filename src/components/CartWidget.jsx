import React from 'react'

function CartWidget() {
  return (
    <button aria-label="Carrito" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span role="img" aria-hidden="true">🛒</span>
      <span>3</span>
    </button>
  )
}

export default CartWidget
