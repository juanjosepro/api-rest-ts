import { Router } from "express"
import { readdirSync } from "fs"

const router = Router()

/**
 * @param fileName item.ts
 * @returns item
 */
const cleanFileName = (fileName: string) => fileName.split(".").shift()

readdirSync(__dirname).filter((fileName) => {
  const cleanName = cleanFileName(fileName)

  if (cleanName != "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }