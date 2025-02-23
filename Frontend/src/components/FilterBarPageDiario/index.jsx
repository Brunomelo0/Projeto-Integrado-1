import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DateInput,
  FilterContainer,
  Label,
  LeftGroup,
  RightGroup,
  SearchInput,
  Select,
} from "./styles";

export default function FilterBar({ showDateFilter, showCreateButton, selectedTurma, setSelectedTurma, searchTerm, setSearchTerm }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/turmas");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleButtonClick = () => {
    navigate("/new");
  };

  return (
    <FilterContainer>
      <LeftGroup>
        <Label>Turma:</Label>
        <Select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)}>
          <option value="">Selecione uma turma</option>
          {data.map((turma, index) => (
            <option key={index} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </Select>
        {showDateFilter && (
          <>
            <Label>Data:</Label>
            <DateInput type="date" />
          </>
        )}
      </LeftGroup>

      <RightGroup>
        <Label>Buscar:</Label>
        <SearchInput
          type="text"
          placeholder="Digite o nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {showCreateButton && (
          <>
            <Button onClick={handleButtonClick}>Cadastrar</Button>
          </>
        )}
      </RightGroup>
    </FilterContainer>
  );
}

FilterBar.propTypes = {
  showDateFilter: PropTypes.bool,
  showCreateButton: PropTypes.bool,
  selectedTurma: PropTypes.string.isRequired,
  setSelectedTurma: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};