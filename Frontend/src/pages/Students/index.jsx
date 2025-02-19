import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FilterBar from '../../components/FilterBar';
import Table from '../../components/Table';
import { Container, Content, Header } from './styles';

export default function Students() {
  const [selectedTurma, setSelectedTurma] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        let response;
        if (selectedTurma) {
          response = await axios.get(`http://localhost:3000/api/turmas/${selectedTurma}/alunos`);
        } else {
          response = await axios.get('http://localhost:3000/api/alunos');
        }
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };
    fetchAlunos();
  }, [selectedTurma]);

  useEffect(() => {
    const filtered = alunos.filter(aluno => aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [alunos, searchTerm]);

  const handleRemoveFromTurma = async (id) => {
    try {
      // Lógica para remover aluno da turma
    } catch (error) {
      console.error('Erro ao remover aluno da turma:', error);
    }
  };

  const handleSaveEdit = async (editedData) => {
    try {
      // Lógica para salvar edição do aluno
    } catch (error) {
      console.error('Erro ao salvar edição do aluno:', error);
    }
  };

  const handleTurmaChange = (turmaId) => {
    setSelectedTurma(turmaId);
  };

  return (
    <Container>
      <Header>
        <strong>Alunos</strong>
      </Header>
      <Content>
        <FilterBar
          showDateFilter={false}
          showCreateButton
          selectedTurma={selectedTurma}
          setSelectedTurma={setSelectedTurma}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          date={date}
          setDate={setDate}
          onTurmaChange={handleTurmaChange}
        />
        <Table data={filteredData} onEdit={handleSaveEdit} onDelete={handleRemoveFromTurma} onSave={handleSaveEdit} />
      </Content>
    </Container>
  );
}