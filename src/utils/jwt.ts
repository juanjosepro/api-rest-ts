import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = "token"

const generateToken = (identify: string) => {
  const jwt = sign({ identify }, JWT_SECRET, { expiresIn: "2h" })
  return jwt
}

const verifyToken = (token: string) => verify(token, JWT_SECRET)

export { generateToken, verifyToken }