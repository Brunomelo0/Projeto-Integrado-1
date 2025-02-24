import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
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

const Report = () => {
  const [reports, setReports] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [reportSelecionado, setReportSelecionado] = useState(null);

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
    const filtered = reports.filter(report =>
      report.titulo && report.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [reports, searchTerm]);

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
      setModalAberto(true);
    } else {
      console.error('Relatório inválido');
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
  };

  return (
    <Container>
      <Content>
        <input
          type="text"
          placeholder="Buscar relatório"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
      <ToastContainer />

      {modalAberto && (
        <Modal>
          <h2>Editar Relatório</h2>
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
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={confirmEdit}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default Report;