import { Auth } from "./auth";

export interface User extends Auth {
  name: string
  profession: string
}