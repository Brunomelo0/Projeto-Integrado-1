import React from 'react';
import { Container, Title, Message, LoginLink } from './styles';
const Welcome = () => {
   return (
      <Container>
        <Title>Bem Vindo</Title>
        <Message>Que bom que esta volta vamos fazer o</Message>
        <LoginLink to="/login">Login.</LoginLink>
      </Container>
    );
  };

export default Welcome;