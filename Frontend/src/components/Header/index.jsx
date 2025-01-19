import { NavbarContainer, Menu, UserContainer } from "./styles";
import { Link, useLocation } from "react-router-dom";
import home from "../../assets/images/icons/home.svg";

export default function Header() {
  const location = useLocation();

  return (
    <NavbarContainer>
      <Menu>
        <a href="/">
          <img src={home} alt="Home" />
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
      </Menu>
      <UserContainer>
        <div className="info">
          <span className="name">Helioneide Azevedo</span>
          <span className="role">Diretora</span>
        </div>
        <img src="https://via.placeholder.com/40" alt="Helioneide Azevedo" />
      </UserContainer>
    </NavbarContainer>
  );
}
