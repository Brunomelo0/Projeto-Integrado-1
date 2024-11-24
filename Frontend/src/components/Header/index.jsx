import { Container, InputSearchContainer } from "./styles";

export default function Header() {
  return (
    <Container>
      <h1 width="201">SIGA</h1>

      <InputSearchContainer>

      <input type="text" placeholder="Nome do aluno"/>
      </InputSearchContainer>
    </Container>
  )
}
