import PageHeader from "../../components/PageHeader";
import StudentForm from "../../components/StudentForm";

import { Container, Content } from './styles';

export default function NewStudent() {
  return (
    <Container>
    <PageHeader
      title="Novo estudante"
    />
    <Content>
   <StudentForm buttonLabel="Cadastrar"/>
   </Content>
    </Container>
  );
}