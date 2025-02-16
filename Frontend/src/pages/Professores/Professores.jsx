import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ActionButton,
  Button,
  Container,
  FilterContainer,
  Form,
  Label,
  LeftGroup,
  Modal,
  RightGroup,
  SearchInput,
  Select,
  Table,
  ToastButton,
  ToastNoButton,
} from "./styles";

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);
  const [novoProfessor, setNovoProfessor] = useState({
    nome: "",
    contato: "",
    dataNascimento: "",
    turmas: [],
    username: "",
    password: ""
  });

  useEffect(() => {
    fetchProfessores();
    fetchTurmas();
  }, []);

  const fetchProfessores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/professores');
      setProfessores(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    }
  };

  const fetchTurmas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/turmas');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja excluir este professor?</p>
          <ToastButton onClick={() => confirmDelete(id, closeToast)}>Sim</ToastButton>
          <ToastNoButton onClick={closeToast}>Não</ToastNoButton>
        </div>
      ),
      {
        autoClose: false,
        position: "top-center",
        className: "custom-toast",
      }
    );
  };

  const confirmDelete = async (id, closeToast) => {
    try {
      await axios.delete(`http://localhost:3000/api/professores/${id}`);
      setProfessores(professores.filter((professor) => professor.id !== id));
      closeToast();
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
    }
  };

  const editarModal = (professor) => {
    if (professor) {
      setProfessorSelecionado(professor);
      setModalAberto(true);
    } else {
      console.error('Professor inválido');
    }
  };

  const confirmEdit = async () => {
    if (professorSelecionado) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/professores/${professorSelecionado.id}`,
          professorSelecionado
        );
        setProfessores(professores.map((p) =>
          p.id === professorSelecionado.id ? response.data : p
        ));
        setModalAberto(false);
      } catch (error) {
        console.error('Erro ao editar professor:', error);
      }
    }
  };

  const cadastrarProfessorModal = () => {
    setNovoProfessor({
      nome: "",
      contato: "",
      dataNascimento: "",
      turmas: [],
      username: "",
      password: ""
    });
    setModalCadastroAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setModalCadastroAberto(false);
    setProfessorSelecionado(null);
  };

  const handleSalvar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/professores', novoProfessor);
      setProfessores([...professores, response.data]);
      setModalCadastroAberto(false);
    } catch (error) {
      console.error('Erro ao cadastrar novo professor:', error);
    }
  };

  return (
    <Container>
      <FilterContainer>
        <LeftGroup>
          <Label>Turma:</Label>
          <Select value={turmaSelecionada} onChange={(e) => setTurmaSelecionada(e.target.value)}>
            <option value="">Selecione uma turma</option>
            {turmas.map((turma) => (
              <option key={turma.id} value={turma.id}>
                {turma.nome}
              </option>
            ))}
          </Select>
        </LeftGroup>
        <RightGroup>
          <Label>Busca</Label>
          <SearchInput
            type="text"
            placeholder="Filtrar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <Button className="cadastrar" onClick={cadastrarProfessorModal}>+ Cadastrar</Button>
        </RightGroup>
      </FilterContainer>

      {modalAberto && (
        <Modal>
          <h2>Editar Professor</h2>
          <Form>
            <label>Nome:</label>
            <input
              type="text"
              value={professorSelecionado?.nome || ""}
              onChange={(e) =>
                setProfessorSelecionado({ ...professorSelecionado, nome: e.target.value })
              }
            />
            <label>Contato:</label>
            <input
              type="text"
              value={professorSelecionado?.contato || ""}
              onChange={(e) =>
                setProfessorSelecionado({ ...professorSelecionado, contato: e.target.value })
              }
            />
            <label>Turmas:</label>
            <select
              multiple
              value={professorSelecionado?.turmas || []}
              onChange={(e) =>
                setProfessorSelecionado({
                  ...professorSelecionado,
                  turmas: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
            >
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.id}>
                  {turma.nome}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={confirmEdit}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}

      {modalCadastroAberto && (
        <Modal>
          <h2>Cadastrar Novo Professor</h2>
          <Form>
            <label>Nome:</label>
            <input
              type="text"
              value={novoProfessor.nome}
              onChange={(e) => setNovoProfessor({ ...novoProfessor, nome: e.target.value })}
            />
            <label>Contato:</label>
            <input
              type="text"
              value={novoProfessor.contato}
              onChange={(e) => setNovoProfessor({ ...novoProfessor, contato: e.target.value })}
            />
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={novoProfessor.dataNascimento}
              onChange={(e) => setNovoProfessor({ ...novoProfessor, dataNascimento: e.target.value })}
            />
            <label>Turmas (opcional):</label>
            <select
              multiple
              value={novoProfessor.turmas}
              onChange={(e) =>
                setNovoProfessor({
                  ...novoProfessor,
                  turmas: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
            >
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.id}>
                  {turma.nome}
                </option>
              ))}
            </select>
            <label>Username:</label>
            <input
              type="text"
              value={novoProfessor.username}
              onChange={(e) => setNovoProfessor({ ...novoProfessor, username: e.target.value })}
            />
            <label>Password:</label>
            <input
              type="password"
              value={novoProfessor.password}
              onChange={(e) => setNovoProfessor({ ...novoProfessor, password: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={handleSalvar}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Turmas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores
            .filter((professor) =>
              professor.nome.toLowerCase().includes(filtroNome.toLowerCase())
            )
            .map((professor) => (
              <tr key={professor.id}>
                <td>{professor.nome}</td>
                <td>{professor.contato}</td>
                <td>{(professor.turmas || []).join(", ")}</td>
                <td>
                  <ActionButton
                    className="editar"
                    onClick={() => editarModal(professor)}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    className="deletar"
                    onClick={() => handleDelete(professor.id)}
                  >
                    <FaTrash />
                  </ActionButton>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default Professores;