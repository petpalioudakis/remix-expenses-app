import {Outlet} from "@remix-run/react";
import stylesUrl from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";
import {getUserFromSession} from "~/util/auth.server";

export default function MarketingLayout() {
    return <>
        <MainHeader/>
        <Outlet/>
    </>
}

/**
 * This function is called on every request to the server.
 * @param request
 */
export async function loader({request}: { request: Request}) {
    return await getUserFromSession(request);
}
export function links() {
    return [
        {rel: "stylesheet", href: stylesUrl},
    ];
}

export function headers() {
    return {
        'Cache-Control': 'max-age=3600',
    }
}
