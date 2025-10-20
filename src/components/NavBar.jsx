import React from 'react'
import CartWidget from './CartWidget'

function NavBar() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #eee' }}>
      <div style={{ fontWeight: 700 }}>Mi Tienda</div>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
        <li>Balones tamaño 1</li>
        <li>Balones tamaño 2</li>
        <li>Balones tamaño 5</li>
      </ul>
      <CartWidget />
    </nav>
  )
}

export default NavBar
