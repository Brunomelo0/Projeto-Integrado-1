import PropTypes from "prop-types";

import { Form, ButtonContainer, Container } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

export default function StudentForm({ buttonLabel }) {
  return (
    <Container>
    <Form>
      <FormGroup>
        <Input placeholder="Nome"/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Matrícula"/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone do responsável"/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Data de nascimento"/>
      </FormGroup>

      <FormGroup>
        <Select>
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
        <Button type='submit'>
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