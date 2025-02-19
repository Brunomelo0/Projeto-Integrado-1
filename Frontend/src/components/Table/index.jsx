import React, { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { ActionButton, EditableInput, StyledTable, TableContainer } from './styles';

const Table = ({ data = [], onEdit, onDelete, onSave }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (row) => {
    setEditingRow(row.id);
    setEditedData(row);
  };

  const handleSaveClick = () => {
    onSave(editedData);
    setEditingRow(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>ID da turma</th>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.turma_id}</td>
              <td>{row.matricula}</td>
              <td>{editingRow === row.id ? (
                <EditableInput
                  type="text"
                  name="nome"
                  value={editedData.nome}
                  onChange={handleChange}
                />
              ) : (
                row.nome
              )}</td>
              <td>{editingRow === row.id ? (
                <EditableInput
                  type="text"
                  name="contato"
                  value={editedData.contato}
                  onChange={handleChange}
                />
              ) : (
                row.contato
              )}</td>
              <td>
                {editingRow === row.id ? (
                  <ActionButton onClick={handleSaveClick}>
                    <FaSave />
                  </ActionButton>
                ) : (
                  <ActionButton onClick={() => handleEditClick(row)}>
                    <FaEdit />
                  </ActionButton>
                )}
                <ActionButton onClick={() => onDelete(row.id)}>
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
