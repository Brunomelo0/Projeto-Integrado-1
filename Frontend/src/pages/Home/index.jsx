import { Link } from 'react-router-dom';

import { Container, Header, Card, Content, ButtonContainer, LinkNew } from './styles';

export default function Home() {
  return (
    <Container>
      <Header>
        <strong>Turmas</strong>
      </Header>
      <Content>

      <Link className='link-style'>
      <Card>
        <div className="info">
          <div className="classroom-name">
            <strong>Turma V A</strong>
            <small>Vespertino</small>
          </div>
          <span>Alunos: 12</span>
          <span>Maria Lívia</span>
        </div>
      </Card>
      </Link>
      <Link className='link-style'>
      <Card>
        <div className="info">
          <div className="classroom-name">
            <strong>Turma V B</strong>
            <small>Matutino</small>
          </div>
          <span>Alunos: 12</span>
          <span>Maria Lívia</span>
        </div>
      </Card>
      </Link>
      <Link className='link-style'>
      <Card>
        <div className="info">
          <div className="classroom-name">
            <strong>Turma V C</strong>
            <small>Vespertino</small>
          </div>
          <span>Alunos: 12</span>
          <span>Maria Lívia</span>
        </div>
      </Card>
      </Link>

      <ButtonContainer>
          <LinkNew type="button" href="/newClass">Cadastrar turma</LinkNew>
      </ButtonContainer>
      </Content>
  </Container>
  );
} 