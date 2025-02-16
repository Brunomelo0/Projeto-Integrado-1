import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;

  strong {
    font-size: 24px;
    text-align: center;
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const Content = styled.div`
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;

  li {
    background: #fff;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
`;