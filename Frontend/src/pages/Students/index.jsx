import axios from "axios";

import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';
import { useEffect, useState } from "react";

export default function Student() {
  const [data, setData] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/alunos", 
          method: "GET",
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/turmas');
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };
    fetchTurmas();
  }, []);

  const getTurmaNome = (turmaId) => {
    const turma = turmas.find(t => t.id === turmaId);
    return turma ? turma.nome : "N/A";
  };

  const columns = [
    { title: "Nome", field: "nome" },
    { title: "Turma", field: "turma_id", render: rowData => getTurmaNome(rowData.turma_id) },
    // Adicione outras colunas conforme necessário
  ];

  return (
    <Container>
      <PageHeader title="Alunos"/>
      <Content>
        <FilterBar showDateFilter={false} showCreateButton/>
        <Table data={data} columns={columns}/>
      </Content>
    </Container>
  );
}