import React from 'react';
import {Outlet} from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import {DUMMY_EXPENSES} from "~/dummy_data";

export default function ExpensesLayout() {
    return (
        <>
            <Outlet/>
            <main>
                <ExpensesList expenses={DUMMY_EXPENSES} />
            </main>
        </>

    );
}

