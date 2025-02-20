import { Router } from "express"
import { updateUser } from "./user.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"
import { updateUserValidate } from "../../middleware/validate.js"

const api = Router()

//Private Routes

api.put('/updateUser',[validateJwt, updateUserValidate], updateUser)
export default api