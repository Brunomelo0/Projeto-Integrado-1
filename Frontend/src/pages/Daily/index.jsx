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
} from "./style";

const Diario = () => {
  const [aulas, setAulas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState("5A");
  const [filtroNome, setFiltroNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [novaAula, setNovaAula] = useState({ titulo: "", descricao: "", professor_id: 1 });

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/diarios?turma=${turma}`);
        setAulas(response.data);
      } catch (error) {
        console.error('Erro ao buscar aulas:', error);
      }
    };
    fetchAulas();
  }, [turma]);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/turmas');
        setTurmas(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };
    fetchTurmas();
  }, []);

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja excluir esta aula?</p>
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
      await axios.delete(`http://localhost:3000/api/diarios/${id}`);
      const novasAulas = aulas.filter((aula) => aula.id !== id);
      setAulas(novasAulas);
      closeToast();
    } catch (error) {
      console.error('Erro ao excluir aula:', error);
    }
  };

  const editarModal = (aula) => {
    if (aula) {
      setNovaAula(aula);
      setModalAberto(true);
    } else {
      console.error('Aula inválida');
    }
  };

  const confirmEdit = async () => {
    if (novaAula) {
      try {
        const response = await axios.put(`http://localhost:3000/api/diarios/${novaAula.id}`, novaAula);
        const novasAulas = aulas.map((a) =>
          a.id === novaAula.id ? response.data : a
        );
        setAulas(novasAulas);
        setModalAberto(false);
      } catch (error) {
        console.error('Erro ao editar aula:', error);
      }
    }
  };

  const cadastrarAulaModal = () => {
    setNovaAula({ titulo: "", descricao: "", professor_id: 1 });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovaAula({ titulo: "", descricao: "", professor_id: 1 });
  };

  const handleSalvar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/diarios', novaAula);
      setAulas([...aulas, response.data]);
      setModalAberto(false);
    } catch (error) {
      console.error('Erro ao cadastrar nova aula:', error);
    }
  };

  return (
    <Container>
      <FilterContainer>
        <LeftGroup>
          <Label>Turma:</Label>
          <Select value={turma} onChange={(e) => setTurma(e.target.value)}>
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
            placeholder="Filtrar por título"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <Button className="cadastrar" onClick={cadastrarAulaModal}>+ Cadastrar</Button>
        </RightGroup>
      </FilterContainer>

      {modalAberto && (
        <Modal>
          <h2>{novaAula.id ? "Editar Aula" : "Cadastrar Nova Aula"}</h2>
          <Form>
            <label>Título</label>
            <input
              type="text"
              placeholder="Título da aula"
              value={novaAula.titulo}
              onChange={(e) => setNovaAula({ ...novaAula, titulo: e.target.value })}
            />
            <label>Descrição</label>
            <textarea
              placeholder="Descrição da aula"
              value={novaAula.descricao}
              onChange={(e) => setNovaAula({ ...novaAula, descricao: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={novaAula.id ? confirmEdit : handleSalvar}>
                {novaAula.id ? "Salvar" : "Cadastrar"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
      <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {aulas
            .filter((aula) =>
              aula.titulo ? aula.titulo.toLowerCase().includes(filtroNome.toLowerCase()) : false
            )
            .map((aula) => (
              <tr key={aula.id}>
                <td>{aula.titulo}</td>
                <td>{aula.descricao}</td>
                <td>
                  <ActionButton
                    className="editar"
                    onClick={() => editarModal(aula)}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    className="deletar"
                    onClick={() => handleDelete(aula.id)}
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

export default Diario;
