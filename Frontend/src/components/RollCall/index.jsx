import React from 'react';

import { TableContainer, StyledTable } from './styles';

const Table = ({data = [], origin, alunoPresente}) => {
  console.log(origin);
  
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            {origin==="rollcall" && (
              <>
                <th>Presença(%)</th>
              </>
            )}
            {origin==="newrollcall" && (
              <>
                <th>Presença</th>
                <th>Falta</th>
                <th>Chamada</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.matricula}</td>
              <td>{row.nome}</td>
              {origin==="rollcall" && (
              <>
                <td>{row.presencapercente}</td>
              </>
            )}
            {origin==="newrollcall" && (
              <>
                <td>{row.presenca}</td>
                <td>{row.falta}</td>
                <td>
                  <select onChange={(e) => alunoPresente(row, e.target.value === "ausente")}>
                    <option value="">Selecione</option>
                    <option value="presente">Presente</option>
                    <option value="ausente">Ausente</option>
                  </select>
                </td>
              </>
            )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
