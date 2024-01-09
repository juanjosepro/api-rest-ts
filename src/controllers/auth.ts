import { Request, Response } from "express";
import UserModel from "../models/user";
import { User } from "../interfaces/user";
import { encrypt, verified } from "../utils/bcrypt";
import { handleHttp } from "../utils/errors.handle";
import { Auth } from "../interfaces/auth";
import { generateToken } from "../utils/jwt";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password, } = <Auth>req.body

    const checkIs = await UserModel.findOne({ email })
  
    if(!checkIs) {
      res.status(401)
      res.send("NOT FOUND USER")
    } else {
      const isCorrect = await verified(password, checkIs.password)
  
      if(!isCorrect) {
        res.status(401)
        res.send("PASSWORD_INCORRECT")
      }
  
      const token = generateToken(checkIs.email)
  
      res.send({
        token,
        user: checkIs
      })
    }


  } catch (error) {
    handleHttp(res, "ERROR_LOGIN", error)
  }
}

const register = async (req: Request, res: Response) => {
  try {
    const { name, profession, email, password, } = <User>req.body
    const checkIs = await UserModel.findOne({ email })
  
    if(checkIs) return "ALREADY USER"
  
    const passwordHash = await encrypt(password)
    const user = await UserModel.create({ name, profession, email, password: passwordHash })

    res.send(user)
  } catch (error) {
    handleHttp(res, "ERROR_REGISTER_USER", error)
  }
}

export { login, register }