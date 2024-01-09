import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user";

const UserShema = new Schema<User>(
  {
    name: {
      type: String,
      required: true
    },
    profession: {
      type: String,
      required: true,
      default: "developer"
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = model("users", UserShema)
export default UserModel
