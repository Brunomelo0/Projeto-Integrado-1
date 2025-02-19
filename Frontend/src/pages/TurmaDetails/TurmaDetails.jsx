import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Content, Header, List } from './styles';

export default function TurmaDetails() {
  const { id } = useParams();
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        console.log('Fetching alunos for turma ID:', id); // Log do ID da turma
        const response = await axios.get(`http://localhost:3000/api/turmas/${id}/alunos`);
        console.log('API Response:', response.data); // Log da resposta da API
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
          {alunos.length > 0 ? (
            alunos.map((aluno) => (
              <li key={aluno.id}>
                {aluno.nome}
              </li>
            ))
          ) : (
            <li>Nenhum aluno cadastrado nesta turma.</li>
          )}
        </List>
      </Content>
    </Container>
  );
}