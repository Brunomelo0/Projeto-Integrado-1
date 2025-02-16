import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './components/App';
import { AuthProvider } from './components/AuthContext/AuthContext';
import GlobalStyle from './GlobalStyle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <AppWrapper />
    </AuthProvider>
  </StrictMode>,
);
