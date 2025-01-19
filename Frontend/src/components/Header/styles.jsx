import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.main}; /* Cor de fundo */
  padding: 10px 20px;
`;

export const Menu = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: white;
    font-weight: bold;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light}; /* Cor ao passar o mouse */
    }

    &.active {
      color: #7DEC6F; /* Apenas muda a cor do texto para a rota ativa */
    }
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;

  .info {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-right: 10px;

    .name {
      font-weight: bold;
    }

    .role {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;