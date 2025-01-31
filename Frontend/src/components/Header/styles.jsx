import styled from "styled-components";

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.main}; /* Cor de fundo */
  padding: 10px 20px;
  font-family: 'Merriweather Sans', sans-serif; /* Aplica a fonte Merriweather Sans */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    a {
      width: 100%;
      text-align: left;
      padding: 10px 0;
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.light};
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

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;

    .info {
      margin-right: 0;
    }

    img {
      width: 30px;
      height: 30px;
    }
  }
`;