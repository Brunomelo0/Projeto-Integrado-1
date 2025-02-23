import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FilterBar from "../../components/FilterBarPageFrequencia";
import PageHeader from "../../components/PageHeader";
import {
  Container,
  Content,
  Form,
  Modal,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from './styles';

const RollCall = () => {
  const [error, setError] = useState(null);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState("");
  const [date, setDate] = useState("");

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
    const fetchAlunos = async () => {
      if (selectedTurma) {
        try {
          const response = await axios.get(`http://localhost:3000/api/turmas/${selectedTurma}/alunos`);
          setAlunos(response.data);
        } catch (error) {
          console.error('Erro ao buscar alunos da turma selecionada:', error);
          setError('Erro ao buscar alunos da turma selecionada');
        }
      }
    };

    fetchAlunos();
  }, [selectedTurma]);

  useEffect(() => {
    const fetchFrequencias = async () => {
      if (selectedTurma && date) {
        try {
          const response = await axios.get(`http://localhost:3000/api/frequencias?turma_id=${selectedTurma}&data=${date}`);
          const frequencias = response.data;

          setAlunos(prevAlunos => prevAlunos.map(aluno => {
            const frequencia = frequencias.find(f => f.aluno_id === aluno.id);
            return {
              ...aluno,
              presenca: frequencia ? frequencia.presenca : false,
              porcentagem_presencas: frequencia ? frequencia.porcentagem_presencas : 'N/A'
            };
          }));
        } catch (error) {
          console.error('Erro ao buscar frequências:', error);
          setError('Erro ao buscar frequências');
        }
      }
    };

    fetchFrequencias();
  }, [selectedTurma, date]);

  const handleCreatePresencas = async () => {
    if (!date) {
      toast.error('Por favor, selecione uma data.');
      return;
    }

    if (!selectedTurma) {
      toast.error('Por favor, selecione uma turma.');
      return;
    }

    try {
      const presencas = alunos.map(aluno => ({
        aluno_id: aluno.id,
        turma_id: selectedTurma,
        data: date,
        presenca: aluno.presenca === true // Garantir que presenca seja um booleano
      }));

      // Verificar se já existe uma frequência para o dia selecionado
      const existingFrequencias = await axios.get(`http://localhost:3000/api/frequencias?turma_id=${selectedTurma}&data=${date}`);
      if (existingFrequencias.data.length > 0) {
        // Atualizar frequências existentes
        await Promise.all(presencas.map(async (frequencia) => {
          await axios.put(`http://localhost:3000/api/frequencias/${frequencia.aluno_id}/${frequencia.turma_id}/${frequencia.data}`, { presenca: frequencia.presenca });
        }));
        toast.success('Frequências atualizadas com sucesso.');
      } else {
        // Criar novas frequências
        const response = await axios.post('http://localhost:3000/api/frequencias', presencas);
        setAlunos([...alunos, ...response.data]);
        console.log(response.data);
        toast.success('Frequências criadas com sucesso.');
      }

      setModalCadastroAberto(false);
    } catch (error) {
      console.error('Erro ao criar ou atualizar frequência:', error);
      setError('Erro ao criar ou atualizar frequência');
    }
  };

  const handleSelectChange = (alunoId, presenca) => {
    setAlunos(alunos.map(aluno => aluno.id === alunoId ? { ...aluno, presenca } : aluno));
  };

  const cadastrarFrequenciaModal = () => {
    if (!date) {
      toast.error('Por favor, selecione uma data.');
      return;
    }

    if (!selectedTurma) {
      toast.error('Por favor, selecione uma turma.');
      return;
    }

    setModalCadastroAberto(true);
  };

  const fecharModal = () => {
    setModalCadastroAberto(false);
  };

  const handleTurmaChange = (turmaId) => {
    setSelectedTurma(turmaId);
  };

  return (
    <Container>
      <PageHeader title="Frequência" />
      <Content>
        <FilterBar
          showDateFilter={true}
          showCreateButton={true}
          selectedTurma={selectedTurma}
          setSelectedTurma={setSelectedTurma}
          date={date}
          setDate={setDate}
          onTurmaChange={handleTurmaChange}
          cadastrarFrequenciaModal={cadastrarFrequenciaModal}
        />
        {error ? (
          <p>{error}</p>
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Aluno</TableHeader>
                <TableHeader>Porcentagem de Frequência</TableHeader>
                <TableHeader>Presença</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {alunos.map(aluno => (
                <TableRow key={aluno.id}>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.porcentagem_presencas ? aluno.porcentagem_presencas : 'N/A'}%</TableCell>
                  <TableCell>
                    <select
                      value={aluno.presenca ? 'false' : 'true'}
                      onChange={(e) => handleSelectChange(aluno.id, e.target.value === 'false')}
                    >
                      <option value="true">Presente</option>
                      <option value="false">Ausente</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </Content>
      <ToastContainer />

      {modalCadastroAberto && (
        <Modal>
          <h2>Cadastrar Nova Frequência</h2>
          <Form>
            <label>Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="modal-buttons">
              <button type="button" onClick={fecharModal}>Cancelar</button>
              <button type="button" onClick={handleCreatePresencas}>Salvar</button>
            </div>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default RollCall;