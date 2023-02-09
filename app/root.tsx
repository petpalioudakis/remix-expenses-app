import type {MetaFunction} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useCatch,
} from "@remix-run/react";
import sharedStylesUrl from "~/styles/shared.css";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <html lang="en">
        <head>
            <Meta/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet"/>
            <Links/>
        </head>
        <body>
        <Outlet/>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

export function links() {
    return [{rel: "stylesheet", href: sharedStylesUrl}];
}

export function CatchBoundary() {
    const caught = useCatch();
    return (
        <html>
        <head>
            <title>Oops!</title>
            <Meta />
            <Links />
        </head>
        <body>
        <h1>
            {caught.status} {caught.statusText}
        </h1>
        <Scripts />
        </body>
        </html>
    );
}

