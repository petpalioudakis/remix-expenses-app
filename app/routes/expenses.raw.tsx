import {getExpenses} from "~/util/expenses.server";

/**
 * This is a Remix route loader. It is used to load data for a route.
 */
export async function loader() {
    return await getExpenses();
}
