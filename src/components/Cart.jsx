import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import CartItem from './CartItem'

function Cart() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const total = getTotalPrice()

  if (cart.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Tu carrito está vacío</h2>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          No hay productos en tu carrito de compras
        </p>
        <Link to="/">
          <button style={{ 
            padding: '12px 30px', 
            backgroundColor: 'blue', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '5px'
          }}>
            Ir a Comprar
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px' }}>Carrito de Compras</h2>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div style={{ 
          width: '300px', 
          padding: '20px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          <h3 style={{ marginTop: '0' }}>Resumen de Compra</h3>
          
          <div style={{ marginBottom: '20px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '10px',
                fontSize: '14px'
              }}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ 
            borderTop: '2px solid #ccc', 
            paddingTop: '15px', 
            marginTop: '15px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '20px', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link to="/checkout">
              <button style={{ 
                width: '100%',
                padding: '12px', 
                backgroundColor: 'green', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '5px',
                marginBottom: '10px'
              }}>
                Finalizar Compra
              </button>
            </Link>

            <button 
              onClick={clearCart}
              style={{ 
                width: '100%',
                padding: '12px', 
                backgroundColor: 'red', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '5px'
              }}
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

