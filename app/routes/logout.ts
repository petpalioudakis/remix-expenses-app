import {json} from "@remix-run/node";
import {destroyUserSession} from "~/util/auth.server";

export function action({request}: any) {
    if(request.method === "POST") {
        return destroyUserSession(request);
    }
    return json({message: "Invalid request method"}, {status: 400});
}
