import { Schema, Types, model, Model } from "mongoose";
import { Car } from "../interfaces/car";

const ItemShema = new Schema<Car>(
  {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    gas: {
      type: String,
      enum: ["gasoline", "electric"],
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ItemModel = model("items", ItemShema)
export default ItemModel
