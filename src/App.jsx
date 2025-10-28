import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainMenu from './pages/MainMenu/MainMenu'
import CreateProduct from './pages/CreateProduct'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  )
}

export default App
