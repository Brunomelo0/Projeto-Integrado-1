import { Route, Routes as RoutesDOM } from 'react-router-dom';
import Attendance from './pages/Attendance';
import Diario from './pages/Daily';
import Diagnostico from './pages/Diagnosis/Diagnostico';
import Home from './pages/Home';
import Login from './pages/Login';
import NewClass from './pages/NewClass';
import NewRollCall from './pages/NewRollCall';
import NewStudent from './pages/NewStudent';
import RollCall from './pages/RollCall';
import Students from './pages/Students';
import Professores from "./pages/Professores/Professores";
import Report from './pages/Report';
import Register from './pages/Register';
import AccessDenied from './pages/AccessDenied';
import useAllowedRoutes from './components/Hooks/useAllowedRoutes';

export default function Routes() {
  const { allowedRoutes } = useAllowedRoutes();

  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {allowedRoutes.includes('/new') && <Route path="/new" element={<NewStudent />} />}
      {allowedRoutes.includes('/alunos') && <Route path="/alunos" element={<Students />} />}
      {allowedRoutes.includes('/frequencia') && <Route path="/frequencia" element={<Attendance />} />}
      {allowedRoutes.includes('/newClass') && <Route path="/newClass" element={<NewClass />} />}
      {allowedRoutes.includes('/professores') && <Route path="/professores" element={<Professores />} />}
      {allowedRoutes.includes('/diagnostico') && <Route path="/diagnostico" element={<Diagnostico />} />}
      {allowedRoutes.includes('/diario') && <Route path="/diario" element={<Diario />} />}
      {allowedRoutes.includes('/professor/frequencia') && <Route path="/professor/frequencia" element={<RollCall />} />}
      {allowedRoutes.includes('/professor/fazerchamada') && <Route path="/professor/fazerchamada" element={<NewRollCall />} />}
      {allowedRoutes.includes('/relatorios') && <Route path="/relatorios" element={<Report />} />}
      {allowedRoutes.includes('/register') && <Route path="/register" element={<Register />} />}
      <Route path="/access-denied" element={<AccessDenied />} />
    </RoutesDOM>
  );
}
