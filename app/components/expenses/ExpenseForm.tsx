import {Form, Link, useActionData, useMatches, useNavigation, useParams} from "@remix-run/react";

function ExpenseForm() {
    const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
    const params = useParams();
    const matches = useMatches();
    const expenses = matches.find((match) => match.id === 'routes/__app/expenses')?.data;
    const expenseData = expenses?.find((expense: any) => expense.id === params.id);
    const validationErrors = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle';

    const defaultValues = expenseData ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date.slice(0, 10)
    } : {
        title: '',
        amount: 0,
        date: ''
    }
    console.log(defaultValues);
    return (
        <Form method={params?.id ? `patch` : 'post'} className="form" id="expense-form">
            <p>
                <label htmlFor="title">Expense Title</label>
                <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues.title}/>
            </p>

            <div className="form-row">
                <p>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        min="0"
                        step="0.01"
                        defaultValue={defaultValues.amount}
                        required
                    />
                </p>
                <p>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" max={today} required defaultValue={defaultValues.date}/>
                </p>
            </div>
            {validationErrors && <ul>
                {Object.values(validationErrors).map((error: any, index: number) => <li key={index}>{error}</li>)}
            </ul>}
            <div className="form-actions">
                <button disabled={isSubmitting}>{isSubmitting ? '...' : 'Save Expense'}</button>
                <Link to="..">Cancel</Link>
            </div>
        </Form>
    );
}

export default ExpenseForm;
