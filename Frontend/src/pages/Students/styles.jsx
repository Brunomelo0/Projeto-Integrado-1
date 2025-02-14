import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .link-style {
    text-decoration: none;
    color: inherit;
    padding: 16px;
  }
`;

export const Content = styled.div`
  width: 80%;
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

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: #fff;
    }
  }
`;

export const ListContainer = styled.div`
  margin-top: 24px;

  header{
    margin-bottom: 8px;

    button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

      span {
      margin-right: 8px;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
      ;
      }
    }
  }
`;

export const Card = styled.div`
  background: #fff;
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  .info {
    .classroom-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }
    }

    span{
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
      display: flex;
      align-items: center;

      button {
        background: transparent;
        border: none;
        margin-left: 8px;
      }
    }
`
export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: #fff;
    border: none;
    border-radius: 25px;
    height: 58px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC
    }
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  margin: 0 2px;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;
