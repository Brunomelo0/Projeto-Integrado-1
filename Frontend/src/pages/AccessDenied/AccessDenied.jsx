import React from 'react';
import { Container, Title, Message, LoginLink } from './style';

const AccessDenied = () => {
  return (
    <Container>
      <Title>Acesso Negado</Title>
      <Message>Você não tem permissão para acessar esta página.</Message>
      <LoginLink to="/login">Voltar para o Login</LoginLink>
    </Container>
  );
};

export default AccessDenied;