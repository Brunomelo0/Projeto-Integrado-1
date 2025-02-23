import PropTypes from 'prop-types';
import React from 'react';
import { StyledTable, TableContainer } from './styles';

const RollCallTable = ({ data, origin, onEdit, onDelete }) => {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Data</th>
            <th>Presença</th>
            <th>Porcentagem de Presença</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.aluno_nome}</td>
              <td>{item.data}</td>
              <td>{item.presenca ? 'Presente' : 'Ausente'}</td>
              <td>{item.porcentagem_presencas}%</td>
              <td>
                <button onClick={() => onEdit(item)}>Editar</button>
                <button onClick={() => onDelete(item.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

RollCallTable.propTypes = {
  data: PropTypes.array.isRequired,
  origin: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RollCallTable;
