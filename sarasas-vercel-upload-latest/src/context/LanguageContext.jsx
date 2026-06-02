import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext({ lang: 'th', toggle: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('th')
  return (
    <LanguageContext.Provider value={{ lang, toggle: () => setLang(l => l === 'th' ? 'en' : 'th') }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
