import React, { useState } from 'react';
import { DropdownContainer, DropdownItem, DropdownButton } from './styles';

const DropdownMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <img src="src/assets/images/img/logoDire.jpg" alt="User" />
      </DropdownButton>
      {isOpen && (
        <div className="dropdown-content">
          <DropdownItem onClick={() => window.location.href = '/profile'}>Perfil</DropdownItem>
          <DropdownItem onClick={onLogout}>Sair</DropdownItem>
        </div>
      )}
    </DropdownContainer>
  );
};

export default DropdownMenu;