import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Philosophy from './pages/Philosophy'
import MenuPage from './pages/MenuPage'
import Delivery from './pages/Delivery'
import Contacts from './pages/Contacts'
import Booking from './pages/Booking'
import Promo from './pages/Promo'
import MenuPDF from './pages/MenuPDF'
import Policy from './pages/Policy'
import CartPage from './pages/CartPage'
import OrderSuccessPage from './pages/OrderSuccessPage'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="filosofija" element={<Philosophy />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="dostavka" element={<Delivery />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="bron" element={<Booking />} />
          <Route path="akcii" element={<Promo />} />
          <Route path="menupdf" element={<MenuPDF />} />
          <Route path="politika" element={<Policy />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order-success" element={<OrderSuccessPage />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}
