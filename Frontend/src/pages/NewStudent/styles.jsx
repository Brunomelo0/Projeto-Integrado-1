import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 32px;
  }
`;

export const Content = styled.div`
  background-color: #f9f9f9;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    border: none;
  }

  .save-button {
    background-color: #2ecc71;
    color: white;
    &:hover { background-color: #27ae60; }
  }

  .back-button {
    background-color: #db3434;
    color: white;
    &:hover { background-color: #b92e29; }
  }
`;