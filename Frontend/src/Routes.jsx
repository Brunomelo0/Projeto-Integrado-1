import { Routes as RoutesDOM, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewStudent from './pages/NewStudent';
import Students from './pages/Students';


export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewStudent />} />
      <Route path="/alunos" element={<Students />}/>
    </RoutesDOM>
  );
}