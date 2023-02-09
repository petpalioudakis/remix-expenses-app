import React from 'react';
import {Link, Outlet} from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import {DUMMY_EXPENSES} from "~/dummy_data";
import {FaDownload, FaPlus} from "react-icons/fa";

export default function ExpensesLayout() {
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
                <ExpensesList expenses={DUMMY_EXPENSES}/>
            </main>
        </>

    );
}

