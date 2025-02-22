import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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