import Modal from "~/components/util/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import useNavigateBack from "~/hooks/useNavigateBack";
import type {LoaderArgs} from "@remix-run/node";
import {getExpense} from "~/util/expenses.server";

export default function ExpenseUpdatePage() {
    const navigateBack = useNavigateBack('..');

    return (
        <Modal onClose={navigateBack}><ExpenseForm/></Modal>
    );
}

export async function loader({params}: LoaderArgs) {
   const id = params.id as string;
   const expense = await getExpense(id);

   return expense;
}
