import { BrowserRouter, Route, Routes as RouterRoutes, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import AccessDenied from '../../pages/AccessDenied/AccessDenied';
import Attendance from '../../pages/Attendance';
import Diario from '../../pages/Daily';
import Diagnostico from '../../pages/Diagnosis/Diagnostico';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NewClass from '../../pages/NewClass';
import NewRollCall from '../../pages/NewRollCall';
import NewStudent from '../../pages/NewStudent';
import Professores from '../../pages/Professores/Professores';
import Register from '../../pages/Register';
import Report from '../../pages/Report';
import RollCall from '../../pages/RollCall';
import Students from '../../pages/Students';
import TurmaDetails from '../../pages/TurmaDetails/TurmaDetails';
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
        <RouterRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<NewStudent />} />
          <Route path="/alunos" element={<Students />} />
          <Route path="/frequencia" element={<Attendance />} />
          <Route path="/newClass" element={<NewClass />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/professor/frequencia" element={<RollCall />} />
          <Route path="/professor/fazerchamada" element={<NewRollCall />} />
          <Route path="/relatorios" element={<Report />} />
          <Route path="/register" element={<Register />} />
          <Route path="/turma/:id" element={<TurmaDetails />} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </RouterRoutes>
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