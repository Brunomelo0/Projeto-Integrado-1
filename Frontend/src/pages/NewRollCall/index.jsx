import PageHeader from "../../components/PageHeader";
import RollCallTable from "../../components/RollCall";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';
import { useState, useEffect } from "react";


const data = [{id: 1, matricula: "1234", nome: "João"}, {id: 2, matricula: "1235", nome: "Maria"}];

export default function NewRollCall() {
  const [students, setStudents] = useState([]);
  const alunoPresente = (aluno, falta = false) => {
    if(falta) {
      setStudents(students.filter((student) => student !== aluno.id));
      return;
    }
    setStudents([...students, aluno.id]);
  }
  useEffect(() => {
    console.log(students);

  }, [students]);

  return (
    <Container>
      <PageHeader title="Alunos" />
      <Content>
        <FilterBar showDateFilter={true} showCreateButton={false} showCreateRollCall={false}/>
        <RollCallTable data={data} alunoPresente={alunoPresente} origin="newrollcall"/>
      </Content>
    </Container>
  );
}