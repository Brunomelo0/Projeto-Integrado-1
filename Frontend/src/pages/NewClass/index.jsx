import axios from "axios";

import PageHeader from "../../components/PageHeader";
import ClassForm from "../../components/ClassForm";

import { Container, Content } from './styles';

export default function NewClass() {
  const handleSubmit = async (nome, periodo, professor, alunos) => {
    try {
      const response = await axios({
        url: "", 
        method: "POST",
        data: {nome, periodo, professor, alunos},
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Container>
    <PageHeader
      title="Nova turma"
    />
    <Content>
   <ClassForm onSubmit={handleSubmit} buttonLabel="Cadastrar"/>
   </Content>
    </Container>
  );
}