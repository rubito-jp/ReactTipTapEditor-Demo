import './global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'
import './lib/i18n'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';  
const container = document.querySelector('#root')
if (container) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ToastContainer/>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  )
}
