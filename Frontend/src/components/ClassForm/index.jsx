import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { Form, ButtonContainer, Container, Table, TableHeader, TableRow, TableCell, Checkbox } from "./styles";

import FormGroup from "../FormGroup";
import Input from "../Input";
import Button from "../Button";
import Select from "../Select";



export default function ClassForm({ buttonLabel, onSubmit }) {
  const [nome, setName] = useState("");
  const [periodo, setPeriodo] = useState("Matutino");

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

        <ButtonContainer>
          <Button type="button" onClick={() => onSubmit(nome, periodo)}>
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
