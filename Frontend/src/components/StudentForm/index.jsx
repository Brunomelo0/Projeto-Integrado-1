import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ButtonContainer, Form, FormGroup, Input, Label, Select } from "../../pages/NewStudent/styles";

export default function StudentForm({ buttonLabel, onSubmit }) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [contato, setContato] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [turma, setTurma] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/turmas");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(nome, matricula, contato, dataNascimento, turma);
    window.location.href = "/alunos";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Nome</Label>
        <Input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </FormGroup>

      <FormGroup>
        <Label>Matrícula</Label>
        <Input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
      </FormGroup>

      <FormGroup>
        <Label>Telefone do responsável</Label>
        <Input type="text" value={contato} onChange={(e) => setContato(e.target.value)} />
      </FormGroup>

      <FormGroup>
        <Label>Data de nascimento</Label>
        <Input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
      </FormGroup>

      <FormGroup>
        <Label>Turma</Label>
        <Select value={turma} onChange={(e) => setTurma(e.target.value)} required>
          <option value="">Selecione uma turma</option>
          {data.map((turmaItem, index) => (
            <option key={index} value={turmaItem.id}>
              {turmaItem.nome}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <button className="back-button" onClick={() => window.location.href = "/"}>Cancelar</button>
        <button type="submit" className="save-button">
          {buttonLabel}
        </button>
      </ButtonContainer>
    </Form>
  );
}

StudentForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};