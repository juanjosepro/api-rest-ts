import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt"
import { JwtPayload } from "jsonwebtoken"

interface RequestExt extends Request {
  user?: string | JwtPayload
}

const checkJWT = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtBearer =  req.headers.authorization || ""
    const jwt = jwtBearer.split(" ").pop()

    const isValidTokenUser = verifyToken(`${jwt}`)

    if(!isValidTokenUser)  {
      res.status(401)
      res.send("NOT_HAS_TOKEN_VALID")
    } else {
      req.user = isValidTokenUser
      next()
    }
  } catch (error) {
    res.status(400)
    res.send("SESSION_NO_VALID")
  }
}

export { checkJWT }