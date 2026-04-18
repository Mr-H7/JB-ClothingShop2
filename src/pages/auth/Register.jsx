import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import GoldDivider from '../../components/GoldDivider'
import { useLang } from '../../contexts/LangContext'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const { lang }       = useLang()
  const { register }   = useAuth()
  const navigate       = useNavigate()
  const location       = useLocation()
  const nextPath       = new URLSearchParams(location.search).get('next') || '/account'

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy,  setBusy]  = useState(false)

  const L = lang === 'FR' ? {
    badge: 'Nouveau Compte', h1: 'Rejoindre la Maison',
    firstName: 'Prénom', lastName: 'Nom', email: 'Email', password: 'Mot de passe',
    submit: 'Créer mon compte', creating: 'Création…',
    hasAcc: 'Déjà membre ?', login: 'Se connecter',
    hint: '8 caractères minimum',
    firstNamePh: 'James', lastNamePh: 'Beaumont', emailPh: 'votre@email.com', pwPh: '••••••••',
  } : {
    badge: 'New Account', h1: 'Join the Maison',
    firstName: 'First Name', lastName: 'Last Name', email: 'Email', password: 'Password',
    submit: 'Create Account', creating: 'Creating…',
    hasAcc: 'Already a member?', login: 'Sign in',
    hint: '8 characters minimum',
    firstNamePh: 'James', lastNamePh: 'Beaumont', emailPh: 'your@email.com', pwPh: '••••••••',
  }

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await register(form)
      navigate(nextPath)
    } catch (err) {
      setError(err.message || 'Registration failed')
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label-gold block mb-2">{L.firstName}</label>
                <input
                  type="text" name="firstName" autoComplete="given-name"
                  value={form.firstName} onChange={onChange}
                  className="input-luxury" placeholder={L.firstNamePh}
                />
              </div>
              <div>
                <label className="label-gold block mb-2">{L.lastName}</label>
                <input
                  type="text" name="lastName" autoComplete="family-name"
                  value={form.lastName} onChange={onChange}
                  className="input-luxury" placeholder={L.lastNamePh}
                />
              </div>
            </div>

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
                type="password" name="password" required minLength={8} autoComplete="new-password"
                value={form.password} onChange={onChange}
                className="input-luxury" placeholder={L.pwPh}
              />
              <p className="text-[#3a3a3a] text-[0.6rem] mt-1.5 tracking-wide">{L.hint}</p>
            </div>

            {error && (
              <div className="border border-red-400/30 bg-red-400/5 px-4 py-3 text-red-400 text-xs">
                {error}
              </div>
            )}

            <GoldDivider />

            <button type="submit" disabled={busy} className="btn-gold-solid w-full py-4 disabled:opacity-50">
              {busy ? L.creating : L.submit}
            </button>

            <p className="text-center text-[#5a5a5a] text-xs font-light pt-2">
              {L.hasAcc}{' '}
              <Link to={`/login${location.search}`} className="text-gold hover:underline">
                {L.login}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
