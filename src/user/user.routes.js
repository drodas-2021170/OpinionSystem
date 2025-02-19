import { Router } from "express"
import { updateUser } from "./user.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()

//Private Routes

api.put('/updateUser',[validateJwt], updateUser)
export default api