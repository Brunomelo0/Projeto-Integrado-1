import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './components/App';
import { AuthProvider } from './components/AuthContext/AuthContext';
import GlobalStyle from './GlobalStyle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <AppWrapper />
      </AuthProvider>
    </Router>
  </StrictMode>,
);
