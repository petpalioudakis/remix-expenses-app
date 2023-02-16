import {prisma} from "~/util/database.server";
import {compare, hash} from "bcryptjs";
import {createCookieSessionStorage, redirect} from "@remix-run/node";
import * as process from "process";

const SESSION_SECRET: string = process.env.SESSION_SECRET as string;
const sessionStorage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === "production",
        secrets: [SESSION_SECRET],
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
    }
})

/**
 * Create a session for the user
 * @param userId
 */
async function createUserSession(userId: any, redirectPath: string) {
    const session = await sessionStorage.getSession();
    session.set("userId", userId);
    return redirect(redirectPath, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
        }
    });
}

/**
 * Sign up a new user
 * @param email
 * @param password
 */
export async function signup({email, password}: { email: string, password: string }) {
    const existingUser = await prisma.user.findFirst({where: {email}});

    if (existingUser) {
        const error = new Error("User already exists");
        // @ts-ignore
        error.status = 422;
        throw error;
    }

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    return createUserSession(user.id, "/expenses");

}

/**
 * Log in a user
 * @param string email
 * @param string  password
 */
export async function login({email, password}: { email: string, password: string }) {
    const user = await prisma.user.findFirst({where: {email}});
    // @ts-ignore
    const isValid = await compare(password, user?.password);

    if (!user || !isValid) {
        const error = new Error("Could not log you in, please check your credentials");
        // @ts-ignore
        error.status = 401;
        throw error;
    }


    return createUserSession(user.id, "/expenses");
}
