import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import {getExpenses} from "~/util/expenses.server";
import {useLoaderData} from "@remix-run/react";
import {getUserFromSession, requireUserUsession} from "~/util/auth.server";


export default function ExpensesAnalysisPage() {
    const expenses = useLoaderData();
    return (
        <main>
            <Chart expenses={expenses}/>
            <ExpenseStatistics expenses={expenses}/>
        </main>
    );
}

export async function loader({request}: any) {
    await requireUserUsession(request);
    const userId = await getUserFromSession(request);
    return await getExpenses(userId);
}
