import React from 'react';
import {Link, Outlet, useLoaderData} from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import {FaDownload, FaPlus} from "react-icons/fa";
import {getExpenses} from "~/util/expenses.server";
import {getUserFromSession, requireUserUsession} from "~/util/auth.server";

export default function ExpensesLayout() {
    const expenses = useLoaderData();
    const hasExpenses = expenses.length > 0;
    return (
        <>
            <Outlet/>
            <main>
                <section id="expenses-actions">
                    <Link to="add">
                        <FaPlus/>
                        <span>Add Expense</span>
                    </Link>
                    <a href="/expenses/raw" target={'_blank'} download>
                        <FaDownload/>
                        <span>Load Raw Data</span>
                    </a>
                </section>
                {hasExpenses && <ExpensesList expenses={expenses}/>}
                {!hasExpenses && (
                    <section id="no-expenses">
                        <h1>No expenses found</h1>
                        <p>
                            Start <Link to="add">adding some</Link> today.
                        </p>
                    </section>
                )}
            </main>
        </>
    );

}

export async function loader({request}: any) {
    await requireUserUsession(request);
    const userId = await getUserFromSession(request);
    return await getExpenses(userId);
}

