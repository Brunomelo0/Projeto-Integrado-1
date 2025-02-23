import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthContext/AuthContext';
import { ProfileButton, ProfileContainer, ProfileContent, ProfileForm, ProfileHeader, ProfileImage, ProfileInput } from './styles';

const Profile = () => {
  const { user, login } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    role: '',
    image: '',
    password: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('User from useAuth:', user); // Log dos dados do usuário do login
        const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage
        const response = await axios.get(`http://localhost:3000/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('API Response:', response.data); // Log da resposta da API
        setProfileData((prevData) => ({
          ...prevData,
          name: response.data.username, // Certifique-se de que o campo de resposta está correto
          role: response.data.role,
          image: response.data.image || 'default-profile.png', // Usar imagem padrão se não houver imagem
        }));
        console.log('Profile Data:', profileData); // Log dos dados do perfil
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
      }
    };

    fetchProfileData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('User on Submit:', user); // Log dos dados do usuário no submit
      const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage
      await axios.put(`http://localhost:3000/api/users/${user.id}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      login({ ...user, name: profileData.name, image: profileData.image });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil.');
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={profileData.image} alt="Profile" />
        <h1>{profileData.name}</h1>
        <p>{profileData.role}</p>
      </ProfileHeader>
      <ProfileContent>
        <ProfileForm onSubmit={handleSubmit}>
          <label htmlFor="image">Imagem de Perfil</label>
          <ProfileInput type="file" name="image" accept="image/*" onChange={handleImageChange} />
          <label htmlFor="name">Nome</label>
          <ProfileInput type="text" name="name" value={profileData.name} onChange={handleChange} />
          <label htmlFor="password">Senha Atual</label>
          <ProfileInput type="password" name="password" value={profileData.password} onChange={handleChange} />
          <label htmlFor="newPassword">Nova Senha</label>
          <ProfileInput type="password" name="newPassword" value={profileData.newPassword} onChange={handleChange} />
          <ProfileButton type="submit">Atualizar Perfil</ProfileButton>
        </ProfileForm>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;