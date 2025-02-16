import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ClassForm from "../../components/ClassForm";
import PageHeader from "../../components/PageHeader";

import { Container, Content } from './styles';

export default function NewClass() {
  const handleSubmit = async (nome, periodo, professor_id, alunos) => {
    if (!nome || !periodo || !professor_id || !alunos) {
      toast.warn("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios({
        url: "http://localhost:3000/api/turmas",
        method: "POST",
        data: { nome, periodo, professor_id },
      });
      console.log(response.data);
      toast.success("Turma cadastrada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar turma.");
    }
  }

  return (
    <Container>
      <PageHeader title="Nova turma" />
      <Content>
        <ClassForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
        <ToastContainer />
      </Content>
    </Container>
  );
}