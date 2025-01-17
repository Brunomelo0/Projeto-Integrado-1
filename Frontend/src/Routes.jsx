import { Routes as RoutesDOM, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewStudent from './pages/NewStudent';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import NewClass from './pages/NewClass';
import NewRollCall from './pages/NewRollCall';


export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewStudent />} />
      <Route path="/alunos" element={<Students />}/>
      <Route path="/frequencia" element={<Attendance />}/>
      <Route path="/newClass" element={<NewClass />}/>
      <Route path="/professor/frequencia" element={<NewRollCall />} />
    </RoutesDOM>
  );
}