import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DateInput,
  FilterContainer,
  Label,
  LeftGroup,
  Select
} from "./styles";

export default function FilterBar({ showDateFilter, selectedTurma, setSelectedTurma, date, setDate, onTurmaChange, cadastrarFrequenciaModal }) {
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

  const handleTurmaChange = (e) => {
    const turmaId = e.target.value;
    setSelectedTurma(turmaId);
    onTurmaChange(turmaId);
  };

  return (
    <FilterContainer>
      <LeftGroup>
        <Label>Turma:</Label>
        <Select value={selectedTurma} onChange={handleTurmaChange}>
          <option value="">Selecione uma turma</option>
          {data.map((turma, index) => <option key={index} value={turma.id}>{turma.nome}</option>)}
        </Select>
        {showDateFilter && (
          <>
            <Label>Data:</Label>
            <DateInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </>
        )}
      </LeftGroup>

      <Button onClick={cadastrarFrequenciaModal}>+ Cadastrar</Button>
    </FilterContainer>
  );
}