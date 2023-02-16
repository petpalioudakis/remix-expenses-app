import {Outlet} from "@remix-run/react";
import stylesUrl from "~/styles/expenses.css";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import {getUserFromSession, requireUserUsession} from "~/util/auth.server";

export default function ExpensesAppLayout() {
    return <>
        <ExpensesHeader/>
        <Outlet/>
    </>
}



export async function loader({request}: any) {
    await requireUserUsession(request);
    return await getUserFromSession(request);
}

export function links() {
    return [
        {rel: "stylesheet", href: stylesUrl},
    ];
}
