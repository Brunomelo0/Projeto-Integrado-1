import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Content, List } from './styles';

export default function TurmaDetails() {
  const { id } = useParams();
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/turmas/${id}/alunos`);
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };
    fetchAlunos();
  }, [id]);

  return (
    <Container>
      <Header>
        <strong>Alunos da Turma</strong>
      </Header>
      <Content>
        <List>
          {alunos.map((aluno) => (
            <li key={aluno.id}>
              {aluno.nome}
            </li>
          ))}
        </List>
      </Content>
    </Container>
  );
}