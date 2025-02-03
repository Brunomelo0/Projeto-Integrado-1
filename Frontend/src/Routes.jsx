import { Route, Routes as RoutesDOM } from 'react-router-dom';

import Attendance from './pages/Attendance';
import Diario from './pages/Daily';
import Diagnostico from './pages/Diagnosis/Diagnostico';
import Home from './pages/Home';
import NewClass from './pages/NewClass';
import NewRollCall from './pages/NewRollCall';
import NewStudent from './pages/NewStudent';
import RollCall from './pages/RollCall';
import Students from './pages/Students';


export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewStudent />} />
      <Route path="/alunos" element={<Students />} />
      <Route path="/frequencia" element={<Attendance />} />
      <Route path="/newClass" element={<NewClass />} />
      <Route path="/diario" element={<Diario />} />
      <Route path="/professor/frequencia" element={<RollCall />} />
      <Route path="/professor/fazerchamada" element={<NewRollCall />} />
      <Route path="/diagnostico" element={<Diagnostico />} />

    </RoutesDOM>
  );
}