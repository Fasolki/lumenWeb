import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { languageForPath, redirectToPreferredLanguage } from './contexts/LanguageContext'
import './index.css'

redirectToPreferredLanguage()

const language = languageForPath(window.location.pathname)

// The page is prerendered at build time, so attach to that markup rather than
// discarding it — otherwise the first paint would flash empty.
ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App language={language} />
  </React.StrictMode>,
)
