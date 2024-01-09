import "dotenv/config"
import express from "express"
import cors from "cors"
import { router } from "./routes"
import db from "./config/mongo"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

db().then(() => {
  console.log("connect database mongodb")
}).catch((err) => {
  console.log("no connect database mongodb")
  console.log(err)
})

app.listen(
  process.env.PORT || 3001,
  () => console.log("Hi! guys")
)