import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';

export default function NewStudent() {
  return (
    <Container>
    <PageHeader title="Alunos"/>
    <Content>
    <FilterBar/>
    <Table />
    </Content>
    </Container>
  );
}