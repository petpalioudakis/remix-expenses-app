import Modal from "~/components/util/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import useNavigateBack from "~/hooks/useNavigateBack";

export default function ExpenseUpdatePage() {
    const navigateBack = useNavigateBack('..');

    return (
        <Modal onClose={navigateBack}><ExpenseForm/></Modal>
    );
}
