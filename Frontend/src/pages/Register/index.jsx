import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, ErrorMessage, Form, Input, Select } from './style';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('professor');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username && password) {
      try {
        const response = await axios.post('http://localhost:3000/api/users', {
          username,
          password,
          role,
        });
        if (response.status === 201) {
          navigate('/login');
        }
      } catch (err) {
        setError('Erro ao cadastrar usuário: ' + err.response.data.error);
      }
    } else {
      setError('Todos os campos são obrigatórios');
    }
  };

  return (
    <Container>
      <Form>
        <h2>Cadastro de Usuário</h2>
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
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="professor">Professor</option>
          <option value="diretor">Diretor</option>
        </Select>
        <Button onClick={handleRegister}>Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default Register;