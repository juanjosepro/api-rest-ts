import { Request, Response } from "express"
import { handleHttp } from "../utils/errors.handle"
import ItemModel from "../models/item"
import { Car } from "../interfaces/car"
import { JwtPayload } from "jsonwebtoken"

interface RequestExt extends Request {
  user?: string | JwtPayload
}

const getItem = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await ItemModel.findOne({_id: id})
    res.send(response)
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEM", error)
  }
}

const getItems = async (req: RequestExt, res: Response) => {
  try {
    const response = await ItemModel.find({})
    res.send({
      user: req.user,
      response
    })
  } catch (error) {
    handleHttp(res, "ERROR_GET_ITEMS", error)
  }
}

const storeItem = async(req: Request, res: Response) => {
  try {
    const item = <Car>req.body
    const response = await ItemModel.create(item)
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_STORE_ITEM", error)
  }
}

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body

    const response = await ItemModel.findOneAndUpdate({ _id: id }, data, { new: true })
    res.send(response);
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_ITEM", error)
  }
}

const deleteItem = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = await ItemModel.deleteOne({_id: id})
    res.send(response)
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_ITEM", error)
  }
}

export { getItem, getItems, storeItem, updateItem, deleteItem }