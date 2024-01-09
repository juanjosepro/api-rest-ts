import { Router } from "express"
import { deleteItem, getItem, getItems, storeItem, updateItem } from "../controllers/item"
import { checkJWT } from "../middleware/session"

const router = Router()

router.get("/", checkJWT, getItems)
router.get("/:id", checkJWT, getItem)
router.post("/", checkJWT, storeItem)
router.put("/:id", checkJWT, updateItem)
router.delete("/:id", checkJWT, deleteItem)

export { router }