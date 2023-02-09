import {DUMMY_EXPENSES} from "~/dummy_data";

/**
 * This is a Remix route loader. It is used to load data for a route.
 */
export function loader() {
    return DUMMY_EXPENSES;
}
