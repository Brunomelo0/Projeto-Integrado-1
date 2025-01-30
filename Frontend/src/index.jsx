import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import GlobalStyle from './GlobalStyle'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
);
