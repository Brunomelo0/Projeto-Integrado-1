import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DropdownButton, DropdownContainer, DropdownItem } from './styles';

const DropdownMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage
        const response = await axios.get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    onLogout();
    window.location.href = '/login';
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <img src={user.image || "src/assets/images/img/logoDire.jpg"} alt="User" />
      </DropdownButton>
      {isOpen && (
        <div className="dropdown-content">
          <DropdownItem onClick={() => window.location.href = '/profile'}>Perfil</DropdownItem>
          <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
        </div>
      )}
    </DropdownContainer>
  );
};

export default DropdownMenu;