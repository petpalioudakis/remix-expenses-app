import {getExpenses} from "~/util/expenses.server";
import {getUserFromSession, requireUserUsession} from "~/util/auth.server";

/**
 * This is a Remix route loader. It is used to load data for a route.
 */
export async function loader({request}: any) {
    await requireUserUsession(request);
    const userId = await getUserFromSession(request);
    return await getExpenses(userId);
}
