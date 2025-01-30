import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importe os ícones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ActionButton,
  Container,
  Filter,
  Form,
  Modal,
  Table,
  ToastButton,
  ToastNoButton,
} from "./styles";

const Diagnostico = () => {
  const [diagnosticos, setDiagnosticos] = useState([]); // Estado para armazenar os diagnósticos
  const [turmas, setTurmas] = useState([]); // Estado para armazenar as turmas
  const [turma, setTurma] = useState(""); // Estado para armazenar a turma selecionada
  const [filtroNome, setFiltroNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [diagnosticoSelecionado, setDiagnosticoSelecionado] = useState(null);
  const [novoDiagnostico, setNovoDiagnostico] = useState({
    descricao: "",
    status: "Não desenvolvido",
    aluno_id: null,
  });

  useEffect(() => {
    const fetchDiagnosticos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/diagnosticos');
        setDiagnosticos(response.data);
      } catch (error) {
        console.error('Erro ao buscar diagnósticos:', error);
      }
    };
    fetchDiagnosticos();
  }, []);

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
          <p>Tem certeza que deseja excluir este diagnóstico?</p>
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
      await axios.delete(`http://localhost:3000/api/diagnosticos/${id}`);
      const novosDiagnosticos = diagnosticos.filter((diagnostico) => diagnostico.id !== id);
      setDiagnosticos(novosDiagnosticos);
      closeToast();
    } catch (error) {
      console.error('Erro ao excluir diagnóstico:', error);
    }
  };

  const abrirModal = (diagnostico = null) => {
    if (diagnostico) {
      setDiagnosticoSelecionado(diagnostico);
    } else {
      setDiagnosticoSelecionado({
        descricao: "",
        status: "Não desenvolvido",
        aluno_id: null,
      });
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDiagnosticoSelecionado(null);
  };

  const handleSalvar = async () => {
    if (diagnosticoSelecionado) {
      try {
        const response = await axios.put(`http://localhost:3000/api/diagnosticos/${diagnosticoSelecionado.id}`, {
          descricao: diagnosticoSelecionado.descricao,
          status: diagnosticoSelecionado.status,
          aluno_id: diagnosticoSelecionado.aluno_id,
        });
        const novosDiagnosticos = diagnosticos.map((diagnostico) =>
          diagnostico.id === diagnosticoSelecionado.id ? response.data : diagnostico
        );
        setDiagnosticos(novosDiagnosticos);
      } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/diagnosticos', novoDiagnostico);
        setDiagnosticos([...diagnosticos, response.data]);
      } catch (error) {
        console.error('Erro ao cadastrar novo diagnóstico:', error);
      }
    }
    setModalAberto(false);
  };

  return (
    <Container>
      <Filter>
        <label>Turma:</label>
        <select value={turma} onChange={(e) => setTurma(e.target.value)}>
          <option value="">Selecione uma turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.nome}>
              {turma.nome}
            </option>
          ))}
        </select>
        <label>Busca</label>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <button className="cadastrar" onClick={() => abrirModal()}>+ Cadastrar</button>
      </Filter>
      {modalAberto && (
        <Modal>
          <h2>{diagnosticoSelecionado ? "Editar Diagnóstico" : "Cadastrar Novo Diagnóstico"}</h2>
          <Form>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={diagnosticoSelecionado ? diagnosticoSelecionado.nome : novoDiagnostico.nome}
              onChange={(e) => {
                if (diagnosticoSelecionado) {
                  setDiagnosticoSelecionado({ ...diagnosticoSelecionado, nome: e.target.value });
                } else {
                  setNovoDiagnostico({ ...novoDiagnostico, nome: e.target.value });
                }
              }}
            />
            <label>Desenvolvimento</label>
            <select
              value={diagnosticoSelecionado ? diagnosticoSelecionado.status : novoDiagnostico.status}
              onChange={(e) => {
                if (diagnosticoSelecionado) {
                  setDiagnosticoSelecionado({ ...diagnosticoSelecionado, status: e.target.value });
                } else {
                  setNovoDiagnostico({ ...novoDiagnostico, status: e.target.value });
                }
              }}
            >
              <option value="Não desenvolvido">Não desenvolvido</option>
              <option value="Em Desenvolvimento">Em Desenvolvimento</option>
              <option value="Desenvolvido">Desenvolvido</option>
            </select>
            <label>Comentário</label>
            <textarea
              placeholder="Comentário do progresso do aluno"
              value={diagnosticoSelecionado ? diagnosticoSelecionado.descricao : novoDiagnostico.descricao}
              onChange={(e) => {
                if (diagnosticoSelecionado) {
                  setDiagnosticoSelecionado({ ...diagnosticoSelecionado, descricao: e.target.value });
                } else {
                  setNovoDiagnostico({ ...novoDiagnostico, descricao: e.target.value });
                }
              }}
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
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Desenvolvimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {diagnosticos
            .filter((diagnostico) =>
              diagnostico.aluno_nome ? diagnostico.aluno_nome.toLowerCase().includes(filtroNome.toLowerCase()) : false
            )
            .map((diagnostico) => (
              <tr key={diagnostico.id}>
                <td>{diagnostico.matricula}</td>
                <td>{diagnostico.aluno_nome}</td>
                <td>{diagnostico.status}</td>
                <td>
                  <ActionButton
                    className="editar"
                    onClick={() => abrirModal(diagnostico)}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    className="deletar"
                    onClick={() => handleDelete(diagnostico.id)}
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

export default Diagnostico;
