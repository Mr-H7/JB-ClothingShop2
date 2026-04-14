import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header       from './components/Header'
import Footer       from './components/Footer'
import Home         from './pages/Home'
import Shop         from './pages/Shop'
import Product      from './pages/Product'
import Checkout     from './pages/Checkout'
import Account      from './pages/Account'
import Collaboration from './pages/Collaboration'
import Contact      from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/shop"           element={<Shop />} />
            <Route path="/product/:id"    element={<Product />} />
            <Route path="/checkout"       element={<Checkout />} />
            <Route path="/account"        element={<Account />} />
            <Route path="/collaboration"  element={<Collaboration />} />
            <Route path="/contact"        element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
