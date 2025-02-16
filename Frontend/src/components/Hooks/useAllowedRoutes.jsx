import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const useAllowedRoutes = () => {
  const { user, login } = useAuth();
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = location.state?.token;
      if (token && !user.role) {
        try {
          const response = await axios.get('http://localhost:3000/api/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { username, role } = response.data;
          console.log('User data:', { username, role });
          login({ name: username, role: role });

          if (role === 'diretor') {
            setAllowedRoutes(['/', '/home', '/alunos', '/professores', '/newclass', '/frequencia', '/diagnostico', '/diario', '/relatorios', '/login', '/register']);
          } else if (role === 'professor') {
            setAllowedRoutes(['/professor/frequencia', '/relatorios', '/diario', '/diagnostico']);
          } else {
            setAllowedRoutes([]);
          }
        } catch (err) {
          console.error('Erro ao buscar dados do usuário:', err);
        }
      } else if (user.role) {
        if (user.role === 'diretor') {
          setAllowedRoutes(['/', '/home', '/alunos', '/professores', '/newclass', '/frequencia', '/diagnostico', '/diario', '/relatorios', '/login', '/register']);
        } else if (user.role === 'professor') {
          setAllowedRoutes(['/professor/frequencia', '/relatorios', '/diario', '/diagnostico']);
        } else {
          setAllowedRoutes([]);
        }
      }
    };

    fetchUserRole();
  }, [location.state?.token, login, user.role]);

  const isRouteAllowed = (path) => {
    return allowedRoutes.includes(path);
  };

  const handleNavigation = (path) => {
    if (isRouteAllowed(path)) {
      navigate(path);
    } else {
      navigate('/access-denied');
    }
  };

  return { allowedRoutes, handleNavigation };
};

export default useAllowedRoutes;