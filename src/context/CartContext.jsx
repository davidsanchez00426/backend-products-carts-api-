import React, { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity }])
    }
  }

  const removeItem = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeItem,
      clearCart,
      updateQuantity,
      getTotalItems, 
      getTotalPrice 
    }}>
      {children}
    </CartContext.Provider>
  )
}


