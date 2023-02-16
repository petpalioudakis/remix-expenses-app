function isValidTitle(value: string) {
    return value && value.trim().length > 0 && value.trim().length <= 30;
}

function isValidAmount(value: string|number) {
    let amount: number = value as number;
    return !isNaN(amount) && amount > 0;
}

function isValidDate(value: string) {
    return value && new Date(value).getTime() < new Date().getTime();
}

export function validateExpenseInput(input: { title: string, amount: string, date: string }): boolean {
    let validationErrors: {title?: string, amount?: string, date?: string} = {};

    if (!isValidTitle(input.title)) {
        validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
    }

    if (!isValidAmount(input.amount)) {
        validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
    }

    if (!isValidDate(input.date)) {
        validationErrors.date = 'Invalid date. Must be a date before today.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors;
    }

    return true;
}

function isValidEmail(value: string) {
    return value && value.includes('@');
}

function isValidPassword(value: string) {
    return value && value.trim().length >= 7;
}

export function validateCredentials(input: any) {
    let validationErrors : {email?: string, password?: string} = {};

    if (!isValidEmail(input.email)) {
        validationErrors.email = 'Invalid email address.'
    }

    if (!isValidPassword(input.password)) {
        validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors;
    }
}
