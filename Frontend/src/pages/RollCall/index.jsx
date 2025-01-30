import PageHeader from "../../components/PageHeader";
import RollCallTable from "../../components/RollCall";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';

export default function RollCall() {
  return (
    <Container>
      <PageHeader title="Alunos" />
      <Content>
        <FilterBar showDateFilter={true} showCreateButton={false} showCreateRollCall={true}/>
        <RollCallTable origin="rollcall"/>
      </Content>
    </Container>
  );
}