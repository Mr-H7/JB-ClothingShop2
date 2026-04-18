import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import GoldDivider from '../../components/GoldDivider'
import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const { lang }    = useLang()
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const location    = useLocation()
  const nextPath    = new URLSearchParams(location.search).get('next') || '/account'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy,  setBusy]  = useState(false)

  const L = lang === 'FR' ? {
    badge: 'Connexion', h1: 'Ravis de vous revoir',
    email: 'Email', password: 'Mot de passe',
    submit: 'Se connecter', connecting: 'Connexion…',
    noAcc: 'Pas encore membre ?', register: 'Créer un compte',
    emailPh: 'votre@email.com', pwPh: '••••••••',
  } : {
    badge: 'Sign In', h1: 'Welcome Back',
    email: 'Email', password: 'Password',
    submit: 'Sign In', connecting: 'Signing in…',
    noAcc: 'Not a member yet?', register: 'Create an account',
    emailPh: 'your@email.com', pwPh: '••••••••',
  }

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(form.email, form.password)
      navigate(nextPath)
    } catch (err) {
      setError(err.message || 'Login failed')
      setBusy(false)
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-28">
      <div className="container-luxury py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <p className="label-gold mb-2">{L.badge}</p>
            <h1 className="heading-luxury text-4xl text-white">{L.h1}</h1>
            <GoldDivider variant="ornament" />
          </div>

          <form onSubmit={onSubmit} className="luxury-card p-8 md:p-10 space-y-5">
            <div>
              <label className="label-gold block mb-2">{L.email} <span className="text-gold/50">*</span></label>
              <input
                type="email" name="email" required autoComplete="email"
                value={form.email} onChange={onChange}
                className="input-luxury" placeholder={L.emailPh}
              />
            </div>
            <div>
              <label className="label-gold block mb-2">{L.password} <span className="text-gold/50">*</span></label>
              <input
                type="password" name="password" required autoComplete="current-password"
                value={form.password} onChange={onChange}
                className="input-luxury" placeholder={L.pwPh}
              />
            </div>

            {error && (
              <div className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-red-400 text-xs">
                {error}
              </div>
            )}

            <GoldDivider />

            <button type="submit" disabled={busy} className="btn-gold-solid w-full py-4 disabled:opacity-50">
              {busy ? L.connecting : L.submit}
            </button>

            <p className="text-center text-[#5a5a5a] text-xs font-light pt-2">
              {L.noAcc}{' '}
              <Link to={`/register${location.search}`} className="text-gold hover:underline">
                {L.register}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
