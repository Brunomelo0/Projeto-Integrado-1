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
      const data = [
        { matricula: "2023001", nome: "João Silva", semestre: "1", desenvolvimento: "Em Desenvolvimento" },
        { matricula: "2023002", nome: "Maria Souza", semestre: "2", desenvolvimento: "Desenvolvido" },
      ];
      setAlunos(data);
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

  const confirmDelete = (matricula, closeToast) => {
    const novosAlunos = alunos.filter((aluno) => aluno.matricula !== matricula);
    setAlunos(novosAlunos);
    closeToast();
  };

  const handleCadastro = () => {
    if (alunoSelecionado) {
      const novosAlunos = alunos.map((aluno) =>
        aluno.matricula === alunoSelecionado.matricula ? alunoSelecionado : aluno
      );
      setAlunos(novosAlunos);
    } else {
      setAlunos([...alunos, novoAluno]);
    }
    setNovoAluno({ matricula: "", nome: "", semestre: "", desenvolvimento: "Não desenvolvido" });
    setModalAberto(false);
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

  return (
    <Container>
      <Filter>
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
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
            <input
              type="text"
              placeholder="Matrícula"
              value={alunoSelecionado ? alunoSelecionado.matricula : novoAluno.matricula}
              onChange={(e) => {
                if (alunoSelecionado) {
                  setAlunoSelecionado({ ...alunoSelecionado, matricula: e.target.value });
                } else {
                  setNovoAluno({ ...novoAluno, matricula: e.target.value });
                }
              }}
            />
            <input
              type="text"
              placeholder="Nome"
              value={alunoSelecionado ? alunoSelecionado.nome : novoAluno.nome}
              onChange={(e) => {
                if (alunoSelecionado) {
                  setAlunoSelecionado({ ...alunoSelecionado, nome: e.target.value });
                } else {
                  setNovoAluno({ ...novoAluno, nome: e.target.value });
                }
              }}
            />
            <input
              type="text"
              placeholder="Semestre"
              value={alunoSelecionado ? alunoSelecionado.semestre : novoAluno.semestre}
              onChange={(e) => {
                if (alunoSelecionado) {
                  setAlunoSelecionado({ ...alunoSelecionado, semestre: e.target.value });
                } else {
                  setNovoAluno({ ...novoAluno, semestre: e.target.value });
                }
              }}
            />
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
            <button type="button" onClick={fecharModal}>Cancelar</button>
            <button type="button" onClick={handleCadastro}>{alunoSelecionado ? "Salvar" : "Cadastrar"}</button>

          </Form>
        </Modal>
      )}

      <Table>
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Semestre</th>
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
                <td>{aluno.semestre}</td>
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
