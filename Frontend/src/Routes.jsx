import { Routes as RoutesDOM, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewStudent from './pages/NewStudent';
import Students from './pages/Students';
import Frequency from './pages/Frequency';
import NewClass from './pages/NewClass';


export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewStudent />} />
      <Route path="/alunos" element={<Students />}/>
      <Route path="/frequencia" element={<Frequency />}/>
      <Route path="/newClass" element={<NewClass />}/>
    </RoutesDOM>
  );
}