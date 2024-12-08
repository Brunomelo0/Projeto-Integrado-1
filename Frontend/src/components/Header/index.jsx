import { NavbarContainer, Menu, UserContainer  } from "./styles";
import { Link } from 'react-router-dom';

import home from '../../assets/images/icons/home.svg'

export default function Header() {
  return (
    <NavbarContainer>
    <Menu>
      <a href="/">
      <img src={ home } alt="Home"/>
      </a>
      <Link to="/alunos">Alunos</Link>
      <Link to="/frequencia">Frequência</Link>
      <Link to="/diagnostico">Diagnóstico</Link>
      <Link to="/diario">Diário</Link>
      <Link to="/relatorios">Relatórios</Link>
    </Menu>
    <UserContainer>
      <div className="info">
      <span classname="name">Maria Lívia</span>
      <span className="role">Diretor(a)</span>
      </div>
      <img
        src="https://via.placeholder.com/40"
        alt="Maria Isabel"
      />
    </UserContainer>
  </NavbarContainer>
  )
}
