import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './components/App';
import GlobalStyle from './GlobalStyle';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <AppWrapper />
  </StrictMode>,
);
