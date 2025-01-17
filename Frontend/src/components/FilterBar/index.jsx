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

export default function FilterBar({ showDateFilter, showCreateButton, showCreateRollCall }) {
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
  }, [])

  return (
    <FilterContainer>
      <LeftGroup>
        <Label>Turma:</Label>
        <Select>
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
        <SearchInput type="text" placeholder="Digite o nome" />
        {showCreateButton && (
          <>
            <Button href="/new">+ Cadastrar</Button>
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
