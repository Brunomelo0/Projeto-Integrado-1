import React from "react";
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

import axios from "axios";
import { useEffect, useState } from "react";

export default function FilterBar({ showDateFilter, showCreateButton, showCreateRollCall, selectedTurma, setSelectedTurma, searchTerm, setSearchTerm, cadastrarAulaModal }) {
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
        {showCreateRollCall && (
          <>
            <Button href="/professor/fazerchamada">+ Chamada</Button>
          </>
        )}
      </RightGroup>
    </FilterContainer>
  );
}