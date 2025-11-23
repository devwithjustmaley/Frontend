import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import "./assets/styles/index.css"
import { AuthProvider } from './api/AuthContext.jsx';
import { ErrorProvider } from './api/ErrorContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorProvider>
  </BrowserRouter>
);
