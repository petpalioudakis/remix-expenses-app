import {prisma} from "~/util/database.server";
import {hash} from "bcryptjs";

export async function signup({email, password}: {email: string, password: string}) {
    const existingUser = await prisma.user.findFirst({where: {email}});

    if(existingUser) {
     const error = new Error("User already exists");
     // @ts-ignore
        error.status = 422;
        throw error;
    }

    const hashedPassword = await hash(password, 12);
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });
}
