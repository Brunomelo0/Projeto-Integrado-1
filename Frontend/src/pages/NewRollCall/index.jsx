import PageHeader from "../../components/PageHeader";
import RollCallTable from "../../components/RollCall";
import FilterBar from "../../components/FilterBar";
import axios from "axios";

import { Container, Content } from './styles';
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";



const data = [{id: 1, matricula: "1234", nome: "João"}, {id: 2, matricula: "1235", nome: "Maria"}];

export default function NewRollCall() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const alunoPresente = (aluno, falta = false) => {
    if(falta) {
      setStudents(students.filter((student) => student !== aluno.id));
      return;
    }
    setStudents([...students, aluno.id]);
  }
  
  const handleSubmit = async () => {
    try {
      const response = await axios({
        url: "http://localhost:3000/",
        method: "POST",
        data: {alunosPresentes: students},
      });
      navigate("/professor/frequencia");
    } catch (error) {
      console.log(error);
      navigate("/professor/frequencia");
    }
  }

  return (
    <Container>
      <PageHeader title="Alunos" />
      <Content>
        <FilterBar showDateFilter={true} showCreateButton={false} showCreateRollCall={false}/>
        <RollCallTable data={data} alunoPresente={alunoPresente} origin="newrollcall"/>
        <Button onClick={ handleSubmit } >Salvar</Button>
      </Content>
    </Container>
  );
}