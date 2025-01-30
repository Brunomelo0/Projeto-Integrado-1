import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 32px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f4f4f4;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #ccc;
    font-weight: bold;
  }

  td {
    background-color: #fff;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 4px;

  &:hover {
    color: #ff6347;
  }
`;