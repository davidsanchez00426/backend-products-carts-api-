import './App.css'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'

function App() {
  return (
   <div>
    <NavBar />
    <ItemListContainer greeting="Bienvenido a la tienda de balones coleccionables" />
   </div>
  )
}

export default App
