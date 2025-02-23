import axios from "axios";
import { useEffect, useState } from "react";
import FilterBar from "../../components/FilterBar";
import PageHeader from "../../components/PageHeader";
import RollCall from "../../components/RollCall";
import { Container, Content } from './styles';

export default function Attendance() {
  const [data, setData] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/frequencias");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de frequência:", error);
      }
    };

    const fetchTurmas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/turmas");
        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      }
    };

    fetchData();
    fetchTurmas();
  }, []);

  useEffect(() => {
    let filteredData = data;
    if (selectedTurma) {
      filteredData = filteredData.filter((frequencia) => frequencia.turma_id === selectedTurma);
    }
    if (searchTerm) {
      filteredData = filteredData.filter((frequencia) => frequencia.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (date) {
      filteredData = filteredData.filter((frequencia) => frequencia.data === date);
    }
    setFilteredData(filteredData);
  }, [data, searchTerm, selectedTurma, date]);

  const handleTurmaChange = (turmaId) => {
    setSelectedTurma(turmaId);
  };

  return (
    <Container>
      <PageHeader title="AlunosATTTENCIA" />
      <Content>
        <FilterBar
          showDateFilter={true}
          showCreateButton={false}
          selectedTurma={selectedTurma}
          setSelectedTurma={setSelectedTurma}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          date={date}
          setDate={setDate}
          onTurmaChange={handleTurmaChange}
        />
        <RollCall data={filteredData} origin={'rollcall'} />
      </Content>
    </Container>
  );
}