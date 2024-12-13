import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';

export default function Student() {
  return (
    <Container>
    <PageHeader title="Alunos"/>
    <Content>
    <FilterBar showDateFilter={false} showCreateButton/>
    <Table />
    </Content>
    </Container>
  );
}