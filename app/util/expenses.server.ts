import {prisma} from './database.server'

export async function addExpense(expenseData: any) {
    try {
        const expense = await prisma.expense.create({
            data: {
                amount: parseFloat(expenseData.amount),
                title: expenseData.title,
                date: new Date(expenseData.date),
            }
        })
        return expense;
    } catch (e) {
        console.log(e);
    }
}


export async function getExpenses() {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: {
                date: 'desc'
            }
        })
        return expenses;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
