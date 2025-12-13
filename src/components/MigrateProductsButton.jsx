import React, { useState } from 'react'
import { migrateProductsToFirestore } from '../firebase/migrateProducts'

function MigrateProductsButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleMigrate = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      await migrateProductsToFirestore()
      setMessage('✅ ¡Productos migrados exitosamente! Puedes eliminar este componente ahora.')
    } catch (error) {
      setMessage(`❌ Error: ${error.message}. Verifica que Firebase esté configurado correctamente.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #4CAF50', 
      borderRadius: '8px',
      backgroundColor: '#f0f8f0',
      textAlign: 'center'
    }}>
      <h3>Migrar Productos a Firestore</h3>
      <p>Haz clic en el botón para copiar los productos de products.js a Firestore</p>
      <button 
        onClick={handleMigrate} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Migrando...' : 'Migrar Productos'}
      </button>
      {message && (
        <p style={{ 
          marginTop: '10px', 
          color: message.includes('✅') ? '#4CAF50' : '#f44336',
          fontWeight: 'bold'
        }}>
          {message}
        </p>
      )}
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        ⚠️ Solo ejecuta esto UNA VEZ. Después puedes eliminar este componente.
      </p>
    </div>
  )
}

export default MigrateProductsButton

