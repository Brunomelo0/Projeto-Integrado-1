import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

import { TableContainer, ActionButton, StyledTable } from './styles';

const data = [
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
  { id: 1, matricula: '001', nome: 'Ana Silva', telefone: '(85) 99999-9999' },
];

const Table = () => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.matricula}</td>
              <td>{row.nome}</td>
              <td>{row.telefone}</td>
              <td>
                <ActionButton>
                  <FaEdit />
                </ActionButton>
                <ActionButton>
                  <FaTrash />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
