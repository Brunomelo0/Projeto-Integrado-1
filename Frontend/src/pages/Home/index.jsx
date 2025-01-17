import { Link } from 'react-router-dom';

import { Container, Header, Card, Content, ButtonContainer, LinkNew } from './styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios({
          url: "http://localhost:3000/api/turmas", 
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
      <Header>
        <strong>Turmas</strong>
      </Header>
      <Content>

      {data.map((turma, index) => <Link key={index} className='link-style'>
      <Card>
        <div className="info">
          <div className="classroom-name">
            <strong>{turma.nome}</strong>
            <small>{turma.periodo}</small>
          </div>
        </div>
      </Card>
      </Link>)}

      <ButtonContainer>
          <LinkNew type="button" href="/newClass">Cadastrar turma</LinkNew>
      </ButtonContainer>
      </Content>
  </Container>
  );
} 