import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ErrorMessage, Form, Input } from './style';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão do formulário
    if (username && password) {
      try {
        console.log('Senha enviada para autenticação:', password); // Adiciona um console.log para ver a senha
        console.log('Usuario enviada para autenticação:', username); // Adiciona um console.log para ver a senha
        const response = await axios.post('http://localhost:3000/api/users/login', {
          username,
          password,
        });
        if (response.status === 200) {
          const { token, role } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          // Navegar para a próxima página com base na função do usuário
          if (role === 'diretor') {
            navigate('/alunos');
          } else if (role === 'professor') {
            navigate('/professor/frequencia');
          }
        }
      } catch (err) {
        setError('Credenciais inválidas');
        console.error('Erro ao fazer login:', err);
      }
    } else {
      setError('Todos os campos são obrigatórios');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
    </Container>
  );
};

export default Login;