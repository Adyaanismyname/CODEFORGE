import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScrollDebugTest from './test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <ScrollDebugTest /> */}
  </StrictMode>,
)
