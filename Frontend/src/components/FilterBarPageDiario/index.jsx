import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DateInput,
  FilterContainer,
  Label,
  LeftGroup,
  RightGroup,
  SearchInput,
  Select,
} from "./styles";

export default function FilterBar({ showDateFilter, showCreateButton, searchTerm, setSearchTerm, cadastrarDiarioModal }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
        {showCreateButton && (
          <>
            <Button onClick={cadastrarDiarioModal}>Cadastrar</Button>
          </>
        )}
      </RightGroup>
    </FilterContainer>
  );
}

FilterBar.propTypes = {
  showDateFilter: PropTypes.bool,
  showCreateButton: PropTypes.bool,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};