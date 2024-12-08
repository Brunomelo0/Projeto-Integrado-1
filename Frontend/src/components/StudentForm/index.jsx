import PropTypes from "prop-types";

import { Form, ButtonContainer } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

export default function StudentForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome"/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Matrícula"/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone"/>
      </FormGroup>

      <FormGroup>
        <Input placeholder="Data de nascimento"/>
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="1A">1°A</option>
          <option value="1B">1°B</option>
          <option value="1C">1°C</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type='submit'>
          { buttonLabel }
        </Button>
      </ButtonContainer>
    </Form>
  );
}

StudentForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};