import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

const routeNames = {
  '/': 'Inicio',
  '/diagnostico': 'Diagnóstico',
  '/diario': 'Diário',
  '/alunos': 'Alunos',
  '/professores': 'Professores',
  '/home': 'Turmas',
  '/newclass': 'Nova Turma',
  '/frequencia': 'Frequência',
  '/relatorios': 'Relatórios',
  '/login': 'Login',
  '/register': 'Registrar',
  '/professor/frequencia': 'Frequência',
};

const useAllowedRoutes = () => {
  const { user, login } = useAuth();
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserRole = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { username, role } = response.data;
      console.log('User data:', { username, role });
      login({ name: username, role: role });

      if (role === 'diretor') {
        setAllowedRoutes(['/', '/home', '/diagnostico', '/diario', '/alunos', '/professores', '/newclass', '/frequencia', '/relatorios', '/login', '/register']);
      } else if (role === 'professor') {
        setAllowedRoutes(['/diario', '/diagnostico', '/professor/frequencia', '/relatorios', '/login', '/profile']);
      } else {
        setAllowedRoutes([]);
      }
    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err);
    }
  }, [login]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user.role) {
      fetchUserRole(token);
    } else if (user.role) {
      if (user.role === 'diretor') {
        setAllowedRoutes(['/home', '/alunos', '/professores', '/newclass', '/frequencia', '/diagnostico', '/diario', '/relatorios']);
      } else if (user.role === 'professor') {
        setAllowedRoutes(['/diario', '/diagnostico', '/professor/frequencia', '/relatorios',]);
      } else {
        setAllowedRoutes([]);
      }
    }
  }, [location.state?.token, user.role, fetchUserRole]);

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

  const getRouteName = (path) => {
    return routeNames[path] || path;
  };

  return { allowedRoutes, handleNavigation, getRouteName, fetchUserRole };
};

export default useAllowedRoutes;