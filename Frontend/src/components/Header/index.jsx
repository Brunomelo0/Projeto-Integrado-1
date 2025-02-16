import { useLocation, useNavigate } from "react-router-dom";
import home from "../../assets/images/icons/home.svg";
import { useAuth } from '../../components/AuthContext/AuthContext';
import useAllowedRoutes from '../../components/Hooks/useAllowedRoutes';
import { Menu, NavbarContainer, UserContainer } from "./styles";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { allowedRoutes, handleNavigation } = useAllowedRoutes();

  const handleLinkClick = (path) => {
    handleNavigation(path);
  };

  const handleLogout = () => {
    logout();
    handleNavigation('/login');
  };

  const renderLinks = () => {
    return allowedRoutes.map((path) => {
      const routeName = path === '/' ? 'Home' : path.charAt(1).toUpperCase() + path.slice(2);
      return (
        <a key={path} onClick={() => handleLinkClick(path)} className={location.pathname === path ? "active" : ""}>
          {routeName}
        </a>
      );
    });
  };

  return (
    <NavbarContainer>
      <Menu>
        <a href="/">
          <img src={home} alt="Home" style={{ filter: "invert(1)" }} />
        </a>
        {renderLinks()}
      </Menu>
      <UserContainer>
        <div className="info">
          <span className="name">{user.name}</span>
          <span className="role">{user.role}</span>
        </div>
        <img src="src/assets/images/img/logoDire.jpg" alt={user.name} />
        <button onClick={handleLogout}>Sair</button>
      </UserContainer>
    </NavbarContainer>
  );
}