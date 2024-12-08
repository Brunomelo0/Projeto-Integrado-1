import PageHeader from "../../components/PageHeader";
import StudentForm from "../../components/StudentForm";

export default function EditStudent() {
  return (
    <>
    <PageHeader 
      title="Editar Bruno Melo"
    />

    <StudentForm buttonLabel="Salvar alterações"/>
    </>
  );
}