import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';

export default function Attendance() {
  return (
    <Container>
      <PageHeader title="Alunos" />
      <Content>
        <FilterBar showDateFilter={true} showCreateButton={false}/>
        <Table />
      </Content>
    </Container>
  );
}