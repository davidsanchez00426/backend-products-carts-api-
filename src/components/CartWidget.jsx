import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

function CartWidget() {
  const { getTotalItems } = useContext(CartContext)
  const totalItems = getTotalItems()

  return (
    <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span>🛒</span>
      {totalItems > 0 && <span>({totalItems})</span>}
    </Link>
  )
}

export default CartWidget
