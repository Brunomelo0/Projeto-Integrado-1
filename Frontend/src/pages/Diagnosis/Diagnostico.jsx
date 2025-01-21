import axios from "axios";
import { useEffect, useState } from "react";
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
  const [alunos, setAlunos] = useState([]);
  const [turma, setTurma] = useState("5A");
  const [filtroNome, setFiltroNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [novoAluno, setNovoAluno] = useState({
    matricula: "",
    nome: "",
    semestre: "",
    desenvolvimento: "Não desenvolvido",
  });

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/alunos');
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };
    fetchAlunos();
  }, []);



  const handleDelete = (matricula) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Tem certeza que deseja excluir este aluno?</p>
          <ToastButton onClick={() => confirmDelete(matricula, closeToast)}>Sim</ToastButton>
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

  const confirmDelete = async (matricula, closeToast) => {
    try {
      await axios.delete(`http://localhost:3000/api/alunos/${matricula}`);
      const novosAlunos = alunos.filter((aluno) => aluno.matricula !== matricula);
      setAlunos(novosAlunos);
      closeToast();
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    }
  };

  const abrirModal = (aluno = null) => {
    if (aluno) {
      setAlunoSelecionado(aluno);
    } else {
      setAlunoSelecionado(null);
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleSalvar = async () => {
    if (alunoSelecionado) {
      try {
        const response = await axios.put(`http://localhost:3000/api/alunos/${alunoSelecionado.matricula}`, alunoSelecionado);
        const novosAlunos = alunos.map((aluno) =>
          aluno.matricula === alunoSelecionado.matricula ? response.data : aluno
        );
        setAlunos(novosAlunos);
      } catch (error) {
        console.error('Erro ao salvar diagnóstico:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/alunos', novoAluno);
        setAlunos([...alunos, response.data]);
      } catch (error) {
        console.error('Erro ao cadastrar novo aluno:', error);
      }
    }
    setModalAberto(false);
  };


  return (
    <Container>
      <Filter>
        <label>Busca</label>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <label>Turma</label>
        <select value={turma} onChange={(e) => setTurma(e.target.value)}>
          <option value="5A">5 A</option>
          <option value="6B">6 B</option>
        </select>
        <button className="cadastrar" onClick={() => abrirModal()}>+ Cadastrar</button>
      </Filter>
      {modalAberto && (
        <Modal>
          <h2>{alunoSelecionado ? "Editar Diagnóstico" : "Cadastrar Novo Diagnóstico"}</h2>
          <Form>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome"
              value={alunoSelecionado ? alunoSelecionado.nome : novoAluno.nome}

            />
            <label>Desenvolvimento</label>
            <select
              value={alunoSelecionado ? alunoSelecionado.desenvolvimento : novoAluno.desenvolvimento}
              onChange={(e) => {
                if (alunoSelecionado) {
                  setAlunoSelecionado({ ...alunoSelecionado, desenvolvimento: e.target.value });
                } else {
                  setNovoAluno({ ...novoAluno, desenvolvimento: e.target.value });
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
              value={alunoSelecionado ? alunoSelecionado.comentario : novoAluno.comentario}
              onChange={(e) => {
                if (alunoSelecionado) {
                  setAlunoSelecionado({ ...alunoSelecionado, comentario: e.target.value });
                } else {
                  setNovoAluno({ ...novoAluno, comentario: e.target.value });
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
          {alunos
            .filter((aluno) =>
              aluno.nome.toLowerCase().includes(filtroNome.toLowerCase())
            )
            .map((aluno) => (
              <tr key={aluno.matricula}>
                <td>{aluno.matricula}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.desenvolvimento}</td>
                <td>
                  <ActionButton
                    className="editar"
                    onClick={() => abrirModal(aluno)}
                  >
                    ✏️
                  </ActionButton>
                  <ActionButton
                    className="deletar"
                    onClick={() => handleDelete(aluno.matricula)}
                  >
                    🗑️
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
