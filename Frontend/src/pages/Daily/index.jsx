import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterBar from "../../components/FilterBar";
import {
  ActionButton,
  Container,
  Form,
  Modal,
  Table,
  ToastButton,
  ToastNoButton,
} from "./style";

const Diario = () => {
  const [aulas, setAulas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  const [novaAula, setNovaAula] = useState({ titulo: "", descricao: "", professor_id: 1, data: getCurrentDate() });

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
    setNovaAula({ titulo: "", descricao: "", professor_id: 1, data: getCurrentDate() });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovaAula({ titulo: "", descricao: "", professor_id: 1, data: getCurrentDate() });
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
      <FilterBar
        showDateFilter={false}
        showCreateButton={true}
        selectedTurma={turma}
        setSelectedTurma={setTurma}
        searchTerm={filtroNome}
        setSearchTerm={setFiltroNome}
        cadastrarAulaModal={cadastrarAulaModal} // Passando a função para o FilterBar
      />

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
            <label>Data</label>
            <input
              type="date"
              value={novaAula.data}
              onChange={(e) => setNovaAula({ ...novaAula, data: e.target.value })}
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
            <th>Data</th>
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
                <td>{aula.data}</td>
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