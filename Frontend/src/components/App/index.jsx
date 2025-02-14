import { ThemeProvider } from 'styled-components';
import { BrowserRouter, useLocation } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Routes from '../../Routes';
import Header from '../Header';

import { Container } from './styles';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/login'];

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Container>
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes />
      </Container>
    </ThemeProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
