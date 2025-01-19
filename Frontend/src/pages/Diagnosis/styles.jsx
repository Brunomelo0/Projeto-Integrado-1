import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #f9f9f9;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Filter = styled.div`
  display: flex;
  gap: 10px;

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
    background: #4caf50;
    color: white;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &.editar {
    color: #2196f3;
  }

  &.deletar {
    color: #f44336;
  }

  &:hover {
    opacity: 0.8;
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
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1000;

  h2 {
    margin-bottom: 20px;
  }

  select {
    margin-left: 10px;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
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
`;
