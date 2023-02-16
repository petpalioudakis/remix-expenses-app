import {prisma} from './database.server'

export async function addExpense(expenseData: any, userId: any) {
    try {
         return await prisma.expense.create({
            data: {
                amount: parseFloat(expenseData.amount),
                title: expenseData.title,
                date: new Date(expenseData.date),
                User: {connect: {id: userId}}
            }
        })
    } catch (e) {
        console.log(e);
        throw new Error('Failed to add expense.');

    }
}


export async function getExpenses(userId: any) {
    if(!userId) throw new Error('No user id provided');
    try {
        const expenses = await prisma.expense.findMany( {
            where: {
                userId
            },
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

export async function getExpense(id: string | undefined) {
    try {
        const expense = await prisma.expense.findFirst({
            where: {
                id
            }
        })
        return expense;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function updateExpense(id: string | undefined, expenseData: any) {
    try {
        const expense = await prisma.expense.update({
            where: {
                id
            },
            data: {
                amount: parseFloat(expenseData.amount),
                title: expenseData.title,
                date: new Date(expenseData.date),
            }
        })
        return expense;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function deleteExpense(id: string | undefined) {
    try {
        const expense = await prisma.expense.delete({
            where: {
                id
            }
        })
        return expense;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
