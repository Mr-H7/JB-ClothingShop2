import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const NAV = [
  { to: '/admin',            label: 'Dashboard', end: true },
  { to: '/admin/products',   label: 'Products' },
  { to: '/admin/orders',     label: 'Orders' },
  { to: '/admin/customers',  label: 'Customers' },
  { to: '/admin/leads',      label: 'Leads' },
]

export default function AdminLayout() {
  const { user, loading, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen pt-28">
        <div className="container-luxury py-24 text-center text-[#4a4a4a] text-xs tracking-widest uppercase">Loading…</div>
      </div>
    )
  }
  if (!user) return <Navigate to="/login?next=/admin" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  const handleSignOut = async () => { await logout(); navigate('/') }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">
        <div className="text-center mb-10">
          <p className="label-gold mb-2">Administration</p>
          <h1 className="heading-luxury text-4xl text-white">Maison Console</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-1">
            <div className="luxury-card p-5 mb-5">
              <p className="label-gold mb-1">Signed in</p>
              <p className="font-serif text-sm text-white truncate">{user.email}</p>
              <p className="text-[#4a4a4a] text-[0.55rem] tracking-widest uppercase mt-1">{user.role}</p>
            </div>
            <nav className="space-y-1">
              {NAV.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `block px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase transition-all duration-300 ${
                      isActive
                        ? 'text-gold bg-[#161616] border-l-2 border-gold'
                        : 'text-[#5a5a5a] hover:text-gold hover:bg-[#111111] border-l-2 border-transparent'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-5 py-3.5 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#3a3a3a] hover:text-red-400 transition-colors mt-4 border-t border-[#1e1e1e]"
              >
                Sign Out
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
