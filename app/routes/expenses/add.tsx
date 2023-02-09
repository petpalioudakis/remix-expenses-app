import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import useNavigateBack from "~/hooks/useNavigateBack";

export default function ExpensesAddPage() {
  const navigateBack = useNavigateBack('..');
    return (
        <Modal onClose={navigateBack}><ExpenseForm/></Modal>
    );
}
