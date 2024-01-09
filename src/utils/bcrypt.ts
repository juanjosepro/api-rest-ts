import { hash, compare } from "bcryptjs";

const encrypt = async (password: string) => await hash(password, 10)

const verified = async (password: string, passwordHash: string) => await compare(password, passwordHash)

export { encrypt, verified }