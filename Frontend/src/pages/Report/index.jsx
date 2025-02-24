import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye, FaFilePdf } from 'react-icons/fa'; // Import FaFilePdf
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import {
  ActionButton,
  Container,
  Content,
  Table,
  ToastButton,
  ToastNoButton,
  Modal,
  Form
} from './styles';
import {
  Button,
  DateInput,
  FilterContainer,
  Label,
  LeftGroup,
  RightGroup,
  SearchInput,
  Select,
} from '../../components/FilterBar/styles';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVisualizacaoAberto, setModalVisualizacaoAberto] = useState(false);
  const [reportSelecionado, setReportSelecionado] = useState(null);
  const [filterProfessor, setFilterProfessor] = useState("");
  const [filterTurma, setFilterTurma] = useState("");
  const [filterData, setFilterData] = useState("");
  const [filterAluno, setFilterAluno] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [diagnostico, setDiagnostico] = useState(null);
  const [presenca, setPresenca] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/relatorios');
        setReports(response.data);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      }
    };
    fetchReports();
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

  useEffect(() => {
    const filtered = reports.filter(report =>
      report.titulo && report.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
      report.professor_id && report.professor_id.toString().includes(filterProfessor) &&
      report.turma_id && report.turma_id.toString().includes(filterTurma) &&
      report.data && report.data.includes(filterData) &&
      report.aluno_nome && report.aluno_nome.toLowerCase().includes(filterAluno.toLowerCase())
    );
    setFilteredData(filtered);
  }, [reports, searchTerm, filterProfessor, filterTurma, filterData, filterAluno]);

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja excluir este relatório?</p>
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
      await axios.delete(`http://localhost:3000/api/relatorios/${id}`);
      const novosReports = reports.filter((report) => report.id !== id);
      setReports(novosReports);
      closeToast();
    } catch (error) {
      console.error('Erro ao excluir relatório:', error);
    }
  };

  const editarModal = (report) => {
    if (report) {
      setReportSelecionado(report);
      fetchDiagnostico(report.aluno_id);
      fetchPresenca(report.aluno_id, report.turma_id);
      setModalAberto(true);
    } else {
      console.error('Relatório inválido');
    }
  };

  const visualizarModal = (report) => {
    if (report) {
      setReportSelecionado(report);
      fetchDiagnostico(report.aluno_id);
      fetchPresenca(report.aluno_id, report.turma_id);
      setModalVisualizacaoAberto(true);
    } else {
      console.error('Relatório inválido');
    }
  };

  const fetchDiagnostico = async (alunoId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/diagnosticos/${alunoId}`);
      setDiagnostico(response.data);
    } catch (error) {
      console.error('Erro ao buscar diagnóstico:', error);
    }
  };

  const fetchPresenca = async (alunoId, turmaId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/frequencias/${alunoId}`);
      setPresenca(response.data);
    } catch (error) {
      console.error('Erro ao buscar presença:', error);
    }
  };

  const confirmEdit = async () => {
    if (reportSelecionado) {
      try {
        const response = await axios.put(`http://localhost:3000/api/relatorios/${reportSelecionado.id}`, {
          id: reportSelecionado.id,
          titulo: reportSelecionado.titulo,
          descricao: reportSelecionado.descricao,
          data: reportSelecionado.data,
          professor_id: reportSelecionado.professor_id,
          turma_id: reportSelecionado.turma_id,
          aluno_id: reportSelecionado.aluno_id,
        });
  
        const novosReports = reports.map((r) =>
          r.id === reportSelecionado.id ? { ...response.data, aluno_nome: r.aluno_nome } : r
        );
        setReports(novosReports);
        setModalAberto(false);
      } catch (error) {
        console.error('Erro ao editar relatório:', error);
      }
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setReportSelecionado(null);
    setDiagnostico(null);
    setPresenca(null);
  };

  const fecharModalVisualizacao = () => {
    setModalVisualizacaoAberto(false);
    setReportSelecionado(null);
    setDiagnostico(null);
    setPresenca(null);
  };

  const abrirModalCadastro = () => {
    setReportSelecionado({
      id: '',
      titulo: '',
      descricao: '',
      data: '',
      professor_id: '',
      turma_id: '',
      aluno_id: ''
    });
    setDiagnostico(null);
    setPresenca(null);
    setModalAberto(true);
  };

  const exportarPDF = (id) => {
    window.open(`http://localhost:3000/api/relatorios/${id}/pdf`, '_blank');
  };

  return (
    <Container>
      <Content>
        <FilterContainer>
          <LeftGroup>
            <Label>Turma:</Label>
            <Select value={filterTurma} onChange={(e) => setFilterTurma(e.target.value)}>
              <option value="">Selecione uma turma</option>
              {turmas.map((turma, index) => <option key={index} value={turma.id}>{turma.nome}</option>)}
            </Select>
            <Label>Data:</Label>
            <DateInput type="date" value={filterData} onChange={(e) => setFilterData(e.target.value)} />
          </LeftGroup>

          <RightGroup>
            <Label>Buscar:</Label>
            <SearchInput
              type="text"
              placeholder="Digite o nome do aluno"
              value={filterAluno}
              onChange={(e) => setFilterAluno(e.target.value)}
            />
            <Button onClick={abrirModalCadastro}>+ Cadastrar</Button>
          </RightGroup>
        </FilterContainer>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Aluno</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.titulo}</td>
                <td>{report.aluno_nome}</td>
                <td>{format(new Date(report.data), 'dd/MM/yyyy')}</td>
                <td>
                  <ActionButton
                    className="editar"
                    onClick={() => editarModal(report)}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    className="deletar"
                    onClick={() => handleDelete(report.id)}
                  >
                    <FaTrash />
                  </ActionButton>
                  <ActionButton
                    className="visualizar"
                    onClick={() => visualizarModal(report)}
                  >
                    <FaEye />
                  </ActionButton>
                  <ActionButton
                    className="exportar"
                    onClick={() => exportarPDF(report.id)}
                  >
                    <FaFilePdf />
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
          <h2>{reportSelecionado.id ? 'Editar Relatório' : 'Cadastrar Relatório'}</h2>
          <Form>
            <label>Título</label>
            <input
              type="text"
              value={reportSelecionado.titulo}
              onChange={(e) => setReportSelecionado({ ...reportSelecionado, titulo: e.target.value })}
            />
            <label>Descrição</label>
            <input
              type="text"
              value={reportSelecionado.descricao}
              onChange={(e) => setReportSelecionado({ ...reportSelecionado, descricao: e.target.value })}
            />
            {diagnostico && (
              <div>
                <h3>Diagnóstico</h3>
                <p>{diagnostico.descricao}</p>
                <p>Status: {diagnostico.status}</p>
                <p>Semestre: {diagnostico.semestre}</p>
              </div>
            )}
            {presenca && (
              <div>
                <h3>Presença</h3>
                <p>Porcentagem de Presença: {presenca.porcentagem_presencas}%</p>
              </div>
            )}
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={confirmEdit}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}

      {modalVisualizacaoAberto && (
        <Modal>
          <h2>Visualizar Relatório</h2>
          <Form>
            <label>Título</label>
            <p>{reportSelecionado.titulo}</p>
            <label>Descrição</label>
            <p>{reportSelecionado.descricao}</p>
            {diagnostico && (
              <div>
                <h3>Diagnóstico</h3>
                <p>{diagnostico.descricao}</p>
                <p>Status: {diagnostico.status}</p>
                <p>Semestre: {diagnostico.semestre}</p>
              </div>
            )}
            {presenca && (
              <div>
                <h3>Presença</h3>
                <p>Porcentagem de Presença: {presenca.porcentagem_presencas}%</p>
              </div>
            )}
            <div className="modal-buttons">
              <button type="button" onClick={fecharModalVisualizacao}>Fechar</button>
            </div>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default Report;