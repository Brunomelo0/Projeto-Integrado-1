import axios from "axios";

import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import FilterBar from "../../components/FilterBar";

import { Container, Content } from './styles';
import { useEffect, useState } from "react";

export default function Student() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/alunos", 
          method: "GET",
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
        
      }
    };
    getData();
  }, [])

  return (
    <Container>
    <PageHeader title="Alunos"/>
    <Content>
    <FilterBar showDateFilter={false} showCreateButton/>
    <Table data={data}/>
    </Content>
    </Container>
  );
}