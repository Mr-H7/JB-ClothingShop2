import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from './contexts/LangContext'
import { AuthProvider } from './contexts/AuthContext'
import Header       from './components/Header'
import Footer       from './components/Footer'
import Home         from './pages/Home'
import Shop         from './pages/Shop'
import Product      from './pages/Product'
import Checkout     from './pages/Checkout'
import Account      from './pages/Account'
import Collaboration from './pages/Collaboration'
import Contact      from './pages/Contact'
import Login        from './pages/auth/Login'
import Register     from './pages/auth/Register'
import AdminLayout     from './pages/admin/AdminLayout'
import AdminDashboard  from './pages/admin/AdminDashboard'
import AdminProducts   from './pages/admin/AdminProducts'
import AdminOrders     from './pages/admin/AdminOrders'
import AdminCustomers  from './pages/admin/AdminCustomers'
import AdminLeads      from './pages/admin/AdminLeads'

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
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
                <Route path="/login"          element={<Login />} />
                <Route path="/register"       element={<Register />} />
                <Route path="/admin"          element={<AdminLayout />}>
                  <Route index              element={<AdminDashboard />} />
                  <Route path="products"    element={<AdminProducts />} />
                  <Route path="orders"      element={<AdminOrders />} />
                  <Route path="customers"   element={<AdminCustomers />} />
                  <Route path="leads"       element={<AdminLeads />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  )
}
