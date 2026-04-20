import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import Header        from './components/Header'
import Footer        from './components/Footer'
import Home          from './pages/Home'
import Shop          from './pages/Shop'
import Product       from './pages/Product'
import Cart          from './pages/Checkout'
import Collaboration from './pages/Collaboration'
import Contact       from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/shop"          element={<Shop />} />
              <Route path="/product/:id"   element={<Product />} />
              <Route path="/cart"          element={<Cart />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/contact"       element={<Contact />} />
              <Route path="*"              element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </LangProvider>
    </BrowserRouter>
  )
}
