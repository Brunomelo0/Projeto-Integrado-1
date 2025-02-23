import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterBar from '../../components/FilterBarPageDiagnostico';
import {
  ActionButton,
  Container,
  Content,
  Form,
  Modal,
  Table,
  ToastButton,
  ToastNoButton
} from "./styles";

const Diagnostico = () => {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [diagnosticoSelecionado, setDiagnosticoSelecionado] = useState(null);
  const [novoDiagnostico, setNovoDiagnostico] = useState({
    descricao: "",
    status: "Não desenvolvido",
    aluno_id: "",
    semestre: "",
  });
  const [alunosSemDiagnostico, setAlunosSemDiagnostico] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    console.log('selectedTurma:', selectedTurma);
    const fetchDiagnosticos = async () => {
      try {
        const response = selectedTurma
          ? await axios.get(`http://localhost:3000/api/turmas/${selectedTurma}/diagnosticos`)
          : await axios.get('http://localhost:3000/api/diagnosticos');
        setDiagnosticos(response.data);
      } catch (error) {
        console.error('Erro ao buscar diagnósticos:', error);
      }
    };
    fetchDiagnosticos();
  }, [selectedTurma]);

  useEffect(() => {
    const filtered = diagnosticos.filter(diagnostico =>
      diagnostico.aluno_nome && diagnostico.aluno_nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [diagnosticos, searchTerm]);

  const fetchAlunosSemDiagnostico = async () => {
    try {
      const responseAlunos = await axios.get('http://localhost:3000/api/alunos');
      const responseDiagnosticos = await axios.get('http://localhost:3000/api/diagnosticos');
      const alunosComDiagnostico = responseDiagnosticos.data.map(d => d.aluno_id);
      const alunosSemDiagnostico = responseAlunos.data.filter(aluno => !alunosComDiagnostico.includes(aluno.id));
      setAlunosSemDiagnostico(alunosSemDiagnostico);
    } catch (error) {
      console.error('Erro ao buscar alunos sem diagnóstico:', error);
    }
  };

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

  const editarModal = (diagnostico) => {
    if (diagnostico) {
      setDiagnosticoSelecionado(diagnostico);
      setModalAberto(true);
    } else {
      console.error('Diagnóstico inválido');
    }
  };

  const confirmEdit = async () => {
    if (diagnosticoSelecionado) {
      try {
        const response = await axios.put(`http://localhost:3000/api/diagnosticos/${diagnosticoSelecionado.id}`, {
          descricao: diagnosticoSelecionado.descricao,
          status: diagnosticoSelecionado.status,
          aluno_id: diagnosticoSelecionado.aluno_id,
          semestre: diagnosticoSelecionado.semestre,
        });
        const novosDiagnosticos = diagnosticos.map((d) =>
          d.id === diagnosticoSelecionado.id ? response.data : d
        );
        setDiagnosticos(novosDiagnosticos);
        setModalAberto(false);
      } catch (error) {
        console.error('Erro ao editar diagnóstico:', error);
      }
    }
  };

  const cadastrarDiagModal = () => {
    fetchAlunosSemDiagnostico();
    setNovoDiagnostico({
      descricao: "",
      status: "Não desenvolvido",
      aluno_id: "",
      semestre: "",
    });
    setModalCadastroAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setModalCadastroAberto(false);
    setDiagnosticoSelecionado(null);
  };

  const handleSalvar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/diagnosticos', {
        descricao: novoDiagnostico.descricao,
        status: novoDiagnostico.status,
        aluno_id: novoDiagnostico.aluno_id,
        semestre: novoDiagnostico.semestre,
      });
      setDiagnosticos([...diagnosticos, response.data]);
      setModalCadastroAberto(false);
    } catch (error) {
      console.error('Erro ao cadastrar novo diagnóstico:', error);
    }
  };

  return (
    <Container>
      <Content>
        <FilterBar
          showDateFilter={false}
          showCreateButton={true}
          selectedTurma={selectedTurma}
          setSelectedTurma={setSelectedTurma}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onTurmaChange={setSelectedTurma}
          cadastrarDiagModal={cadastrarDiagModal}
        />
        <Table>
          <thead>
            <tr>
              <th>Turma</th>
              <th>Matrícula</th>
              <th>Nome</th>              
              <th>Desenvolvimento</th>
              <th>Semestre</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((diagnostico) => (
              <tr key={diagnostico.id}>
                <td>{diagnostico.turma_id}</td>
                <td>{diagnostico.matricula}</td>
                <td>{diagnostico.aluno_nome}</td>               
                <td>{diagnostico.status}</td>
                <td>{diagnostico.semestre}</td>
                <td>
                  <ActionButton
                    className="editar"
                    onClick={() => editarModal(diagnostico)}
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
      </Content>
      <ToastContainer />

      {modalAberto && (
        <Modal>
          <h2>Editar Diagnóstico</h2>
          <Form>
            <label>Desenvolvimento</label>
            <select
              value={diagnosticoSelecionado.status}
              onChange={(e) => setDiagnosticoSelecionado({ ...diagnosticoSelecionado, status: e.target.value })}
            >
              <option value="Não desenvolvido">Não desenvolvido</option>
              <option value="Em Desenvolvimento">Em Desenvolvimento</option>
              <option value="Desenvolvido">Desenvolvido</option>
            </select>
            <label>Comentário</label>
            <textarea
              placeholder="Comentário do progresso do aluno"
              value={diagnosticoSelecionado.descricao}
              onChange={(e) => setDiagnosticoSelecionado({ ...diagnosticoSelecionado, descricao: e.target.value })}
            />
            <label>Semestre</label>
            <input
              type="text"
              placeholder="Semestre (ex: 2023-1)"
              value={diagnosticoSelecionado.semestre}
              onChange={(e) => setDiagnosticoSelecionado({ ...diagnosticoSelecionado, semestre: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={confirmEdit}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}
      {modalCadastroAberto && (
        <Modal>
          <h2>Cadastrar Novo Diagnóstico</h2>
          <Form>
            <label>Aluno</label>
            <select
              value={novoDiagnostico.aluno_id || ""}
              onChange={(e) => setNovoDiagnostico({ ...novoDiagnostico, aluno_id: e.target.value })}
            >
              <option value="">Selecione um aluno</option>
              {alunosSemDiagnostico.map((aluno) => (
                <option key={aluno.id} value={aluno.id}>
                  {aluno.nome}
                </option>
              ))}
            </select>
            <label>Desenvolvimento</label>
            <select
              value={novoDiagnostico.status}
              onChange={(e) => setNovoDiagnostico({ ...novoDiagnostico, status: e.target.value })}
            >
              <option value="Não desenvolvido">Não desenvolvido</option>
              <option value="Em Desenvolvimento">Em Desenvolvimento</option>
              <option value="Desenvolvido">Desenvolvido</option>
            </select>
            <label>Comentário</label>
            <textarea
              placeholder="Comentário do progresso do aluno"
              value={novoDiagnostico.descricao}
              onChange={(e) => setNovoDiagnostico({ ...novoDiagnostico, descricao: e.target.value })}
            />
            <label>Semestre</label>
            <input
              type="text"
              placeholder="Semestre (ex: 2023-1)"
              value={novoDiagnostico.semestre}
              onChange={(e) => setNovoDiagnostico({ ...novoDiagnostico, semestre: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={handleSalvar}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default Diagnostico;