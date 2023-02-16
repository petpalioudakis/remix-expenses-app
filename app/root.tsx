import type {MetaFunction} from "@remix-run/node";
import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useCatch, useMatches,
} from "@remix-run/react";
import sharedStylesUrl from "~/styles/shared.css";
import Error from "~/components/util/Error";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Expenses App",
    viewport: "width=device-width,initial-scale=1",
});

function Document({title, children}: any) {

    const matches = useMatches();
    const disableJs = matches.some((match) => match.handle?.disableJs === true);
    return (
        <html lang="en">
        <head>
            {title && <title>{title}</title>}
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        {!disableJs && <Scripts/>}
        <LiveReload/>
        </body>
        </html>
    );
}

export default function App() {
    return (
        <Document>
            <Outlet/>
        </Document>
    );
}

export function CatchBoundary() {
    const caughtResponse = useCatch();

    return (
        <Document title={caughtResponse.statusText}>
            <main>
                <Error title={caughtResponse.statusText}>
                    <p>
                        {caughtResponse.data?.message ||
                            'Something went wrong. Please try again later.'}
                    </p>
                    <p>
                        Back to <Link to="/">safety</Link>.
                    </p>
                </Error>
            </main>
        </Document>
    );
}

export function ErrorBoundary({error}: any) {
    return (
        <Document title="An error occurred">
            <main>
                <Error title="An error occurred">
                    <p>
                        {error.message || 'Something went wrong. Please try again later.'}
                    </p>
                    <p>
                        Back to <Link to="/">safety</Link>.
                    </p>
                </Error>
            </main>
        </Document>
    );
}

export function links() {
    return [{rel: 'stylesheet', href: sharedStylesUrl}];
}
