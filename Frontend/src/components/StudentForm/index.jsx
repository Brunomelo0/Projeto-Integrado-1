import PropTypes from "prop-types";

import { Form, ButtonContainer, Container } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { useState } from "react";

export default function StudentForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState();
  const [matricula, setMatricula] = useState();
  const [contato, setContato] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [turma, setTurma] = useState();

  return (
    <Container>
    <Form>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)}/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Matrícula" value={matricula} onChange={(event) => setMatricula(event.target.value)}/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone do responsável" value={contato} onChange={(event) => setContato(event.target.value)}/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Data de nascimento" value={dataNascimento} onChange={(event) => setDataNascimento(event.target.value)}/>
      </FormGroup>

      <FormGroup>
        <Select value={turma} onChange={(event) => setTurma(event.target.value)}>
          <option value="3A">Turma III A</option>
          <option value="3B">Turma III A</option>
          <option value="4A">Turma IV A</option>
          <option value="4B">Turma IV B</option>
          <option value="4C">Turma IV C</option>
          <option value="5A">Turma V A</option>
          <option value="5B">Turma V B</option>
          <option value="5C">Turma V C</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type='button' onClick={() => onSubmit(name, matricula, contato, dataNascimento, turma)}>
          { buttonLabel }
        </Button>
      </ButtonContainer>
    </Form>
    </Container>
  );
}

StudentForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};