import { createContext, useContext, useState } from 'react'
import { T } from '../i18n/index.js'

export const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState('FR')
  return (
    <LangContext.Provider value={{ lang, setLang, t: T[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
