import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterBarPageAlunos from "../../components/FilterBarPageAlunos";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import { Container, Content } from './styles';

export default function Student() {
  const [data, setData] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/alunos");
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

  useEffect(() => {
    if (selectedTurma) {
      const fetchFilteredData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/alunos?turma=${selectedTurma}`);
          setData(response.data);
        } catch (error) {
          console.error('Erro ao buscar alunos filtrados:', error);
        }
      };
      fetchFilteredData();
    }
  }, [selectedTurma]);

  const handleSaveEdit = async (editedStudent) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/alunos/${editedStudent.id}`, editedStudent);
      setData(data.map((s) => s.id === editedStudent.id ? response.data : s));
      toast.success('Aluno atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      toast.error('Erro ao atualizar aluno.');
    }
  };

  const handleRemoveFromTurma = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/alunos/${id}/removeFromTurma`);
      setData(data.map((student) => student.id === id ? { ...student, turma_id: null } : student));
      toast.success('Aluno removido da turma com sucesso!');
    } catch (error) {
      console.error('Erro ao remover aluno da turma:', error);
      toast.error('Erro ao remover aluno da turma.');
    }
  };

  return (
    <Container>
      <PageHeader title="Alunos" />
      <Content>
        <FilterBarPageAlunos
          showDateFilter={false}
          showCreateButton
          selectedTurma={selectedTurma}
          setSelectedTurma={setSelectedTurma}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Table data={data} onEdit={handleSaveEdit} onDelete={handleRemoveFromTurma} onSave={handleSaveEdit} />
        <ToastContainer />
      </Content>
    </Container>
  );
}