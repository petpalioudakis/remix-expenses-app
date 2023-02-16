import React from 'react';
import AuthForm from "~/components/auth/AuthForm";
import stylesUrl from "~/styles/auth.css";
import {validateCredentials} from "~/util/validation.server";
import {login, signup} from "~/util/auth.server";
import {redirect} from "@remix-run/node";

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
    try {
        await validateCredentials(credentials);
    } catch (e) {
        return e;
    }
    try {
        if (authMode === 'login') {
            // @ts-ignore
            return login(credentials);
        } else {
            // @ts-ignore
            return  signup(credentials);
        }
    } catch (error) {
        // @ts-ignore
        if(error.status === 422){
            // @ts-ignore
           return {credentials: error.message}
        }
    }
}

