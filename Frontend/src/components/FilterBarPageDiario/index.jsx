import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  FilterContainer,
  Label,
  RightGroup,
  SearchInput,
} from "./styles";

export default function FilterBar({ showCreateButton, searchTerm, setSearchTerm, cadastrarDiarioModal, role }) {
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

  return (
    <FilterContainer>
      <RightGroup>
        <Label>Buscar:</Label>
        <SearchInput
          type="text"
          placeholder="Digite o nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {showCreateButton && role !== 'diretor' && (
          <Button onClick={cadastrarDiarioModal}>Cadastrar</Button>
        )}
      </RightGroup>
    </FilterContainer>
  );
}

FilterBar.propTypes = {
  showCreateButton: PropTypes.bool,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};