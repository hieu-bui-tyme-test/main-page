import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProdductPage from './pages/ProductsPage.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProdductPage />
  </StrictMode>,
)
