import PropTypes from "prop-types";

import { Form, ButtonContainer, Container } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import { useState, useEffect } from "react";

import axios from "axios";

export default function StudentForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState();
  const [matricula, setMatricula] = useState();
  const [contato, setContato] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [turma, setTurma] = useState();

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
          <option value="">Selecione uma turma</option>
          {data.map((turma, index) => <option key={index} value={turma.id}>{turma.nome}</option>)}
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