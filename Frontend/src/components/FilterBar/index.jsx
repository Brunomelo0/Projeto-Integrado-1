import { FilterContainer, LeftGroup, RightGroup, Label, Select, SearchInput, Button } from "./styles";

export default function FilterBar() {
  return(
      <FilterContainer>
        <LeftGroup>
          <Label>Turma:</Label>
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
        </LeftGroup>
  
        <RightGroup>
          <Label>Buscar:</Label>
          <SearchInput type="text" placeholder="Digite o nome" />
          <Button href="/new">+ Cadastrar</Button>
        </RightGroup>
      </FilterContainer>
    );
}