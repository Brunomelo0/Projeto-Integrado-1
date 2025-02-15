import { Route, Routes as RoutesDOM } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Attendance from './pages/Attendance';
import Diario from './pages/Daily';
import Diagnostico from './pages/Diagnosis/Diagnostico';
import Home from './pages/Home';
import Login from './pages/Login';
import NewClass from './pages/NewClass';
import NewRollCall from './pages/NewRollCall';
import NewStudent from './pages/NewStudent';
import Professores from "./pages/Professores/Professores";
import Register from './pages/Register';
import RollCall from './pages/RollCall';
import Students from './pages/Students';

export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/new" element={<ProtectedRoute element={<NewStudent />} />} />
      <Route path="/alunos" element={<ProtectedRoute element={<Students />} />} />
      <Route path="/frequencia" element={<ProtectedRoute element={<Attendance />} />} />
      <Route path="/professores" element={<ProtectedRoute element={<Professores />} />} />
      <Route path="/diagnostico" element={<ProtectedRoute element={<Diagnostico />} />} />
      <Route path="/diario" element={<ProtectedRoute element={<Diario />} />} />
      <Route path="/newClass" element={<ProtectedRoute element={<NewClass />} />} />
      <Route path="/professor/frequencia" element={<ProtectedRoute element={<RollCall />} />} />
      <Route path="/professor/fazerchamada" element={<ProtectedRoute element={<NewRollCall />} />} />
    </RoutesDOM>
  );
}
