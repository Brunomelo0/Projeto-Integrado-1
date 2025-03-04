import { useEffect } from 'react';
import { Route, Routes as RouterRoutes, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext/AuthContext';
import useAllowedRoutes from './components/Hooks/useAllowedRoutes';
import AccessDenied from './pages/AccessDenied/AccessDenied';
import Attendance from './pages/Attendance';
import Diario from './pages/Daily';
import Diagnostico from './pages/Diagnosis/Diagnostico';
import Home from './pages/Home';
import Login from './pages/Login';
import NewClass from './pages/NewClass';
import NewRollCall from './pages/NewRollCall';
import NewStudent from './pages/NewStudent';
import Professores from './pages/Professores/Professores';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register';
import Report from './pages/Report';
import RollCall from './pages/RollCall';
import Students from './pages/Students';
import TurmaDetails from './pages/TurmaDetails/TurmaDetails';
import Welcome from './pages/Welcome/Welcome';

export default function Routes() {
  const { allowedRoutes, fetchUserRole } = useAllowedRoutes();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user.role) {
      fetchUserRole(token);
    } else if (!allowedRoutes.includes(location.pathname)) {
      navigate('/access-denied');
    }
  }, [location.pathname, user.role, fetchUserRole, allowedRoutes, navigate]);

  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Welcome />} />
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
      <Route path="/turma/:id" element={<TurmaDetails />} />
      <Route path="/access-denied" element={<AccessDenied />} />
    </RouterRoutes>
  );
}