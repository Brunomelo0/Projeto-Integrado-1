import axios from 'axios';
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { ButtonContainer, Container, Form } from "./styles";

import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";



export default function ClassForm({ buttonLabel, onSubmit }) {
  const [nome, setNome] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/professores');
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(nome, periodo, professorId, alunos);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Input placeholder="Período" value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Select value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
            <option value="">Selecione um professor</option>
            {professores.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Input placeholder="Alunos" value={alunos} onChange={(e) => setAlunos(e.target.value.split(','))} />
        </FormGroup>

        <ButtonContainer>
          <Button type="submit">
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

ClassForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
