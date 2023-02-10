import Modal from "~/components/util/Modal";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import useNavigateBack from "~/hooks/useNavigateBack";
import {validateExpenseInput} from "~/util/validation.server";
import {deleteExpense, updateExpense} from "~/util/expenses.server";
import {redirect} from "@remix-run/node";

export default function ExpenseUpdatePage() {
    const navigateBack = useNavigateBack('..');

    return (
        <Modal onClose={navigateBack}><ExpenseForm/></Modal>
    );
}

export async function action({params, request}: any) {
    const expenseId = params.id;
    const requestMethod = (request.method as string).toLowerCase();
    if (requestMethod === 'delete') {
        // @ts-ignore
        await deleteExpense(expenseId);
    } else if (requestMethod === 'patch') {
        const data = await request.formData();

        const input = Object.fromEntries(data);
        try {
            // @ts-ignore
            if (validateExpenseInput(input)) {
                await updateExpense(expenseId, input);
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    return redirect('/expenses');
}

