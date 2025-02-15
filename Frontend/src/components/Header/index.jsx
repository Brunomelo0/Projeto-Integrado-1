import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import home from "../../assets/images/icons/home.svg";
import { Menu, NavbarContainer, UserContainer } from "./styles";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', role: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Token:', token); // Adiciona um console.log para ver o token
          const response = await axios.get('http://localhost:3000/api/users/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { username, role } = response.data;
          setUser({ name: username, role: role });
        } catch (err) {
          console.error('Erro ao buscar dados do usuário:', err);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <NavbarContainer>
      <Menu>
        <a href="/">
          <img src={home} alt="Home" style={{ filter: "invert(1)" }} />
        </a>
        <Link to="/alunos" className={location.pathname === "/alunos" ? "active" : ""}>
          Alunos
        </Link>
        <Link to="/frequencia" className={location.pathname === "/frequencia" ? "active" : ""}>
          Frequência
        </Link>
        <Link to="/professor/frequencia" className={location.pathname === "/professor/frequencia" ? "active" : ""}>
          Chamada
        </Link>
        <Link to="/diagnostico" className={location.pathname === "/diagnostico" ? "active" : ""}>
          Diagnóstico
        </Link>
        <Link to="/diario" className={location.pathname === "/diario" ? "active" : ""}>
          Diário
        </Link>
        <Link to="/relatorios" className={location.pathname === "/relatorios" ? "active" : ""}>
          Relatórios
        </Link>
        <Link to="/professores" className={location.pathname === "/professores" ? "active" : ""}>
          Professores
        </Link>
      </Menu>
      <UserContainer>
        <div className="info">
          <span className="name">{user.name}</span>
          <span className="role">{user.role}</span>
        </div>
        <button onClick={handleLogout}>Sair</button>
        <img src="src/assets/images/img/logoDire.jpg" alt={user.name} />
      </UserContainer>
    </NavbarContainer>
  );
}