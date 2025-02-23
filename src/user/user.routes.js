import { Router } from "express"
import { getUsers, updateUser } from "./user.controller.js"
import { isAdmin, validateJwt } from "../../middleware/validate.jwt.js"
import { updateUserValidate } from "../../middleware/validate.js"

const api = Router()

//Private Routes
api.get('/', [validateJwt, isAdmin], getUsers)
api.put('/updateUser',[validateJwt, updateUserValidate], updateUser)
export default api