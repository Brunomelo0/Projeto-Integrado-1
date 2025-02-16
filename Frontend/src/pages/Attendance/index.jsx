import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import RollCall from "../../components/RollCall";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';
import { use } from "react";

export default function Attendance() {
  const [data, setData] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState();
  
  useEffect(() => {
    let filteredData = data;
    if (selectedTurma) {
      filteredData = data.filter((frequencia) => frequencia.turma_id === selectedTurma);
    }
    if (searchTerm) {
      filteredData = data.filter((frequencia) => frequencia.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (date) {
      filteredData = data.filter((frequencia) => frequencia.data === date);
    }
    setFilteredData(filteredData);

  }, [data, selectedData, searchTerm, selectedTurma, date]);


  return (
    <Container>
      <PageHeader title="Alunos" />
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
        />
        <RollCall data={filteredData} origin={'rollcall'}/>
      </Content>
    </Container>
  );
}