import styled from 'styled-components';

// Container principal
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: #f4f4f4;
  padding: 12px;
  border-radius: 8px;
`;

// Container para os elementos do lado esquerdo
export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
`;

// Container para os elementos do lado direito
export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// Estilização dos rótulos
export const Label = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

// Dropdown de seleção
export const Select = styled.select`
  padding: 6px 12px;
  margin-right: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Input de busca
export const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Input de data
export const DateInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Botão de cadastrar
export const Button = styled.a`
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 16px;
  text-decoration: none;

  &:hover {
    background-color: #45a049;
  }
`;

// Mensagem de carregamento
export const Loading = styled.div`
  font-size: 18px;
  color: #555;
`;

// Mensagem de erro
export const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
`;
