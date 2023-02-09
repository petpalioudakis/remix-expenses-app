import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import {DUMMY_EXPENSES} from "~/dummy_data";


export default function ExpensesAnalysisPage() {
    return (
        <main>
            <Chart expenses={DUMMY_EXPENSES}/>
            <ExpenseStatistics expenses={DUMMY_EXPENSES} />
        </main>
    );
}
