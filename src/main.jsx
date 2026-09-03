import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BookingProvider } from './context/BookingContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

createRoot(document.getElementById('root')).render(  
  <StrictMode>

    <AuthProvider>
      <BookingProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </BookingProvider>
    </AuthProvider>

  </StrictMode>,
)