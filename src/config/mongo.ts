import "dotenv/config"
import { connect } from "mongoose"

const dbConnect = async (): Promise<void> => {
  const dbURI = <string> process.env.DB_URI
  await connect(dbURI) 
}

export default dbConnect