import React from "react";
import {
  FilterContainer,
  LeftGroup,
  RightGroup,
  Label,
  Select,
  SearchInput,
  Button,
  DateInput,
} from "./styles";

import { useState, useEffect } from "react";
import axios from "axios";

export default function FilterBar({ showDateFilter, showCreateButton, selectedTurma, setSelectedTurma, searchTerm, setSearchTerm, cadastrarAulaModal }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/turmas", 
          method: "GET",
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <FilterContainer>
      <LeftGroup>
        <Label>Turma:</Label>
        <Select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)}>
          <option value="">Selecione uma turma</option>
          {data.map((turma, index) => <option key={index} value={turma.id}>{turma.nome}</option>)}
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
            <Button onClick={cadastrarAulaModal}>+ Cadastrar</Button>
          </>
        )}
      </RightGroup>
    </FilterContainer>
  );
}