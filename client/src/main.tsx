import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.scss'
import { UserProvider } from './hooks/UserContext.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
      <App />
   
  </React.StrictMode>

)
