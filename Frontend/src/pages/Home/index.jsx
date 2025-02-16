import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonContainer, Card, Container, Content, Header, LinkNew } from './styles';

export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  const handleCardClick = (id) => {
    navigate(`/turma/${id}`);
  };

  return (
    <Container>
      <Header>
        <strong>Turmas</strong>
      </Header>
      <Content>
        {data.map((turma, index) => (
          <Card key={index} className='link-style' onClick={() => handleCardClick(turma.id)}>
            <div className="info">
              <div className="classroom-name">
                <strong>{turma.nome}</strong>
                <small>{turma.periodo}</small>
              </div>
            </div>
          </Card>
        ))}
        <ButtonContainer>
          <LinkNew type="button" href="/newClass">Cadastrar turma</LinkNew>
        </ButtonContainer>
      </Content>
    </Container>
  );
} 