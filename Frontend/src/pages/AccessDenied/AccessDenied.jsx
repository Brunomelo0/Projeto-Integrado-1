import React from 'react';
import { Container, Title, Message, LoginLink } from './style';

const AccessDenied = () => {
  return (
    <Container>
      <Title>Acesso Negado</Title>
      <Message>Você não tem permissão para acessar esta página.</Message>
      <LoginLink to="/">Voltar para o Inicio</LoginLink>
    </Container>
  );
};

export default AccessDenied;