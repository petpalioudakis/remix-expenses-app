import type {LoaderArgs} from "@remix-run/node";
import {redirect} from "@remix-run/node";
import {Links, Meta, Scripts, useCatch} from "@remix-run/react";

export function loader({params}: LoaderArgs){
if(params['*'] === 'exp') {
    return redirect('/expenses');
}
throw new Response('Not Found', {status: 404});
}
