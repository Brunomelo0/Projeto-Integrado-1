import React from 'react';
import { Container, Title, Message, HomeLink } from './style';

const AccessDenied = () => {
  return (
    <Container>
      <Title>Acesso Negado</Title>
      <Message>Você não tem permissão para acessar esta página.</Message>
      <HomeLink to="/home">Voltar para a Home</HomeLink>
    </Container>
  );
};

export default AccessDenied;