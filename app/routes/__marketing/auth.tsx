import React from 'react';
import AuthForm from "~/components/auth/AuthForm";
import stylesUrl from "~/styles/auth.css";

export default function AuthPage() {
    return (
        <AuthForm/>
    );
}

export function links() {
    return [
        {rel: "stylesheet", href: stylesUrl},
    ];
}

export async function action({request}: any) {
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get('mode') || 'login';
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    //validate credentials
    if(authMode === 'login') {
        // login logic
    } else {
        // signup login
    }
}

