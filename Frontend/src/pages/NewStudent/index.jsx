import PageHeader from "../../components/PageHeader";
import StudentForm from "../../components/StudentForm";

export default function NewStudent() {
  return (
    <>
    <PageHeader
      title="Novo estudante"
    />

   <StudentForm buttonLabel="Cadastrar"/>
    </>
  );
}