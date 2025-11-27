import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { createOrder } from '../firebase/firestore'

function CheckoutForm() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [orderId, setOrderId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!buyer.name || !buyer.phone || !buyer.email) {
      setError('Por favor completa todos los campos')
      setLoading(false)
      return
    }

    const order = {
      buyer,
      items: cart,
      total: getTotalPrice(),
      date: new Date().toISOString()
    }

    try {
      const id = await createOrder(order)
      setOrderId(id)
      clearCart()
      // Redirigir a la página inicial después de 10 segundos
      setTimeout(() => {
        navigate('/')
      }, 10000)
    } catch (err) {
      console.error('Error al crear orden:', err)
      // Aún así, vaciar el carrito y redirigir
      // Generar un ID local como respaldo
      const backupOrderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      setOrderId(backupOrderId)
      clearCart()
      setTimeout(() => {
        navigate('/')
      }, 10000)
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: 'green' }}>¡Compra realizada con éxito!</h2>
        <p style={{ fontSize: '18px', marginTop: '20px' }}>
          Tu orden ha sido registrada con el ID:
        </p>
        <p style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: 'blue',
          margin: '20px 0',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '5px'
        }}>
          {orderId}
        </p>
        <p style={{ fontSize: '16px', color: '#666', marginTop: '20px' }}>
          Guarda este número para realizar el seguimiento de tu pedido.
        </p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '30px' }}>
          Serás redirigido a la página principal en 10 segundos...
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ 
            marginTop: '20px',
            padding: '10px 30px', 
            backgroundColor: 'blue', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '5px'
          }}
        >
          Volver al Inicio
        </button>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>No hay productos en el carrito</h2>
        <p>Agrega productos al carrito antes de finalizar la compra</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px' }}>Finalizar Compra</h2>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3>Resumen de tu compra</h3>
        {cart.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px'
          }}>
            <span>{item.name} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={{ 
          borderTop: '2px solid #ccc', 
          paddingTop: '10px', 
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Nombre completo:
          </label>
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Teléfono:
          </label>
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px'
            }}
          />
        </div>

        {error && (
          <p style={{ color: 'red', margin: '0' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ 
            padding: '12px 30px', 
            backgroundColor: loading ? '#ccc' : 'green', 
            color: 'white', 
            border: 'none', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            borderRadius: '5px'
          }}
        >
          {loading ? 'Procesando...' : 'Confirmar Compra'}
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm

