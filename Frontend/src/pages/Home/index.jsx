import { Link } from 'react-router-dom';

import { Container, Header, Card, Content } from './styles';

export default function Home() {
  return (
    <Container>
      <Content>
      <Header>
        <strong>Turmas</strong>
      </Header>

      <Link className='link-style'>
      <Card>
        <div className="info">
          <div className="classroom-name">
            <strong>Turma III A</strong>
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
            <strong>Turma III B</strong>
            <small>Vespertino</small>
          </div>
          <span>Alunos: 14</span>
          <span>Maria Lívia</span>
        </div>
      </Card>
      </Link>
      <Link className='link-style'>
      <Card>
        <div className="info">
          <div className="classroom-name">
            <strong>Turma IV A</strong>
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
            <strong>Turma IV B</strong>
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
            <strong>Turma IV C</strong>
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
      </Content>
  </Container>
  );
} 