import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import useNavigateBack from "~/hooks/useNavigateBack";
import {addExpense} from "~/util/expenses.server";
import {redirect} from "@remix-run/node";
import {validateExpenseInput} from "~/util/validation.server";
import {getUserFromSession, requireUserUsession} from "~/util/auth.server";

export default function ExpensesAddPage() {
    const navigateBack = useNavigateBack('..');
    return (
        <Modal onClose={navigateBack}><ExpenseForm/></Modal>
    );
}

export async function action({request}: any) {
    await requireUserUsession(request);
    const userId = await getUserFromSession(request);
    const data = await request.formData();
    const input = Object.fromEntries(data);
    try {
        // @ts-ignore
        if (validateExpenseInput(input)) {
            await addExpense(input, userId);
        }
    } catch (error) {
        console.error(error);
        return error;
    }

    return redirect('/expenses');
}
