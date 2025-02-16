import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import home from "../../assets/images/icons/home.svg";
import { useAuth } from '../../components/AuthContext/AuthContext';
import useAllowedRoutes from '../../components/Hooks/useAllowedRoutes';
import { Menu, NavbarContainer, UserContainer } from "./styles";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();
  const { allowedRoutes, handleNavigation, getRouteName, fetchUserRole } = useAllowedRoutes();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user.role) {
      fetchUserRole(token);
    }
  }, [user.role, fetchUserRole]);

  const handleLinkClick = (path) => {
    handleNavigation(path);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    handleNavigation('/login');
  };

  const renderLinks = () => {
    return allowedRoutes
      .filter(path => path !== '/home' && path !== '/newclass')
      .map((path) => {
        const routeName = getRouteName(path);
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
        <a href="/home">
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