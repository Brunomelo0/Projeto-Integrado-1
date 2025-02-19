import React, { useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { ActionButton, EditableInput, PaginationButton, PaginationContainer, StyledTable, TableContainer } from './styles';

const Table = ({ data = [], onEdit, onDelete, onSave }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

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
          {currentRows.map((row) => (
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
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            $active={currentPage === index + 1}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>
    </TableContainer>
  );
};

export default Table;
