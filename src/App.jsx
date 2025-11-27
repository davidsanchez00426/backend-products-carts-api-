import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'

function App() {
  return (
   <CartProvider>
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenidos a la tienda" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por categoría" />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </div>
    </BrowserRouter>
   </CartProvider>
  )
}

export default App
