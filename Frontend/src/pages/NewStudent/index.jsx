import axios from "axios";

import PageHeader from "../../components/PageHeader";
import StudentForm from "../../components/StudentForm";

import { Container, Content } from './styles';

export default function NewStudent() {
  const handleSubmit = async (nome, matricula, contato, dataNascimento, turma) => {
    try {
      const response = await axios({
        url: "http://localhost:3000/api/alunos", 
        method: "POST",
        data: {nome, matricula, contato, data_nascimento: dataNascimento, turma_id: turma},
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Container>
    <PageHeader
      title="Novo estudante"
    />
    <Content>
   <StudentForm onSubmit={handleSubmit} buttonLabel="Cadastrar"/>
   </Content>
    </Container>
  );
}