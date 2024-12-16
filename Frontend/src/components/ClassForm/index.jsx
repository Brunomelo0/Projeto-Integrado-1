import PropTypes from "prop-types";
import { useState } from "react";

import { Form, ButtonContainer, Container, Table, TableHeader, TableRow, TableCell, Checkbox } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";

// Lista simulada de alunos (pode ser substituída por dados da API)
const mockStudents = [
  { id: 1, name: "Ana Souza" },
  { id: 2, name: "Carlos Pereira" },
  { id: 3, name: "Mariana Lima" },
  { id: 4, name: "João Silva" },
  { id: 5, name: "Fernanda Costa" },
];

export default function ClassForm({ buttonLabel, onSubmit }) {
  const [nome, setName] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [professor, setProfessor] = useState("");
  const [selectedAlunos, setSelectedAlunos] = useState([]);

  // Função para lidar com a seleção dos alunos
  const handleSelectAluno = (id) => {
    setSelectedAlunos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((alunoId) => alunoId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Container>
      <Form>
        <FormGroup>
          <Input placeholder="Nome" value={nome} onChange={(event) => setName(event.target.value)} />
        </FormGroup>

        <FormGroup>
                <Select value={periodo} onChange={(event) => setPeriodo(event.target.value)}>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                </Select>
        </FormGroup>

         <FormGroup>
                <Select value={professor} onChange={(event) => setProfessor(event.target.value)}>
                  <option value="1">Maria Clara</option>
                  <option value="2">Silvania</option>
                </Select>
        </FormGroup>

        <FormGroup>
          <h3>Selecione os Alunos:</h3>
          <Table>
            <thead>
              <TableRow>
                <TableHeader></TableHeader>
                <TableHeader>Nome do Aluno</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {mockStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell checkbox>
                    <Checkbox
                      type="checkbox"
                      checked={selectedAlunos.includes(student.id)}
                      onChange={() => handleSelectAluno(student.id)}
                    />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </FormGroup>

        <ButtonContainer>
          <Button type="button" onClick={() => onSubmit(nome, periodo, professor, selectedAlunos)}>
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
