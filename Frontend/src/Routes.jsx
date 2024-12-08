import { Routes as RoutesDOM, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewStudent from './pages/NewStudent'


export default function Routes() {
  return (
    <RoutesDOM>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewStudent />} />
    </RoutesDOM>
  );
}