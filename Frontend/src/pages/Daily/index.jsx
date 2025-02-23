import axios from "axios";
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterBar from "../../components/FilterBarPageDiario";
import {
  ActionButton,
  Container,
  Content,
  Form,
  Modal,
  Table,
  ToastButton,
  ToastNoButton,
} from "./style";

const Diario = () => {
  const [diarios, setDiarios] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  const [novoDiario, setNovoDiario] = useState({ titulo: "", descricao: "", professor_id: 1, data: getCurrentDate(), turma_id: "" });

  useEffect(() => {
    const fetchDiarios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/diarios?turma=${turma}`);
        setDiarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar diarios:', error);
      }
    };
    fetchDiarios();
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
          <p>Tem certeza que deseja excluir esta diario?</p>
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
      const novosDiarios = diarios.filter((diario) => diario.id !== id);
      setDiarios(novosDiarios);
      closeToast();
    } catch (error) {
      console.error('Erro ao excluir diario:', error);
    }
  };

  const editarModal = (diario) => {
    if (diario) {
      setNovoDiario(diario);
      setModalAberto(true);
    } else {
      console.error('Diario inválido');
    }
  };

  const confirmEdit = async () => {
    if (novoDiario) {
      try {
        const response = await axios.put(`http://localhost:3000/api/diarios/${novoDiario.id}`, novoDiario);
        const novosDiarios = diarios.map((a) =>
          a.id === novoDiario.id ? response.data : a
        );
        setDiarios(novosDiarios);
        setModalAberto(false);
      } catch (error) {
        console.error('Erro ao editar diario:', error);
      }
    }
  };

  const cadastrarDiarioModal = () => {
    setNovoDiario({ titulo: "", descricao: "", professor_id: 1, data: getCurrentDate(), turma_id: "" });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setNovoDiario({ titulo: "", descricao: "", professor_id: 1, data: getCurrentDate(), turma_id: "" });
  };

  const handleSalvar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/diarios', novoDiario);
      setDiarios([...diarios, response.data]);
      setModalAberto(false);
    } catch (error) {
      console.error('Erro ao cadastrar nova diario:', error);
    }
  };

  return (
    <Container>
      <Content>
        <FilterBar
          showDateFilter={true}
          showCreateButton={true}
          searchTerm={filtroNome}
          setSearchTerm={setFiltroNome}
          cadastrarDiarioModal={cadastrarDiarioModal} // Passando a função para o FilterBar
        />

        {modalAberto && (
          <Modal>
            <h2>{novoDiario.id ? "Editar Diario" : "Cadastrar Novo Diario"}</h2>
            <Form>
              <label>Turma</label>
              <select
                value={novoDiario.turma_id}
                onChange={(e) => setNovoDiario({ ...novoDiario, turma_id: e.target.value })}
              >
                <option value="">Selecione uma turma</option>
                {turmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.nome}
                  </option>
                ))}
              </select>
              <label>Título</label>
              <input
                type="text"
                placeholder="Título do diario"
                value={novoDiario.titulo}
                onChange={(e) => setNovoDiario({ ...novoDiario, titulo: e.target.value })}
              />
              <label>Descrição</label>
              <textarea
                placeholder="Descrição do diario"
                value={novoDiario.descricao}
                onChange={(e) => setNovoDiario({ ...novoDiario, descricao: e.target.value })}
              />
              <label>Data</label>
              <input
                type="date"
                value={novoDiario.data}
                onChange={(e) => setNovoDiario({ ...novoDiario, data: e.target.value })}
              />
              <div className="modal-buttons">
                <button type="button" onClick={fecharModal}>Cancelar</button>
                <button type="button" onClick={novoDiario.id ? confirmEdit : handleSalvar}>
                  {novoDiario.id ? "Salvar" : "Cadastrar"}
                </button>
              </div>
            </Form>
          </Modal>
        )}
        <Table>
          <thead>
            <tr>
              <th>Turma</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {diarios
              .filter((diario) =>
                diario.titulo ? diario.titulo.toLowerCase().includes(filtroNome.toLowerCase()) : false
              )
              .map((diario) => (
                <tr key={diario.id}>
                  <td>{turmas.find(t => t.id === diario.turma_id)?.nome || "N/A"}</td>
                  <td>{diario.titulo}</td>
                  <td>{diario.descricao}</td>
                  <td>{format(new Date(diario.data), 'dd/MM/yyyy')}</td>
                  <td>
                    <ActionButton
                      className="editar"
                      onClick={() => editarModal(diario)}
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      className="deletar"
                      onClick={() => handleDelete(diario.id)}
                    >
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Content>
      <ToastContainer />
    </Container>
  );
};

export default Diario;