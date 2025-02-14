import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: #f4f4f4;
  padding: 12px;
  border-radius: 8px;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

export const Select = styled.select`
  padding: 6px 12px;
  margin-right: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

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

export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  select,
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .cadastrar {
    background: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: #45a049;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    select,
    input {
      width: 100%;
    }

    .cadastrar {
      width: 100%;
      padding: 10px;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background: #ddd;
    color: black;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 6px;
    }
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: black; /* Cor padrão dos ícones */

  &.editar {
    color: black; /* Cor padrão dos ícones de edição */
  }

  &.deletar {
    margin-left: 10px; /* Adiciona um espaço entre os ícones */
    color: black; /* Cor padrão dos ícones de deleção */
  }

  &:hover {
    color: red; /* Cor ao passar o mouse */
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    background: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background: #45a049;
    }
  }

  @media (max-width: 768px) {
    input,
    select {
      width: 100%;
    }

    button {
      width: 100%;
      padding: 10px;
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  width: 66.67%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;

  select {
    width: auto;
  }

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
  }

  h2 {
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:first-of-type {
    background-color: #f44336;
    color: white;
  }

  button:last-of-type {
    background-color: #4caf50;
    color: white;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .modal-buttons button {
    padding: 5px 10px;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;

    .button-group {
      flex-direction: column;
      align-items: stretch;
    }

    button {
      width: 100%;
      padding: 10px;
    }
  }
`;

export const ToastButton = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;

  &:hover {
    background: #45a049;
  }

  @media (max-width: 768px) {
    padding: 10px;
    margin: 5px 0;
  }
`;

export const ToastNoButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;

  &:hover {
    background: #d32f2f;
  }

  @media (max-width: 768px) {
    padding: 10px;
    margin: 5px 0;
  }
`;