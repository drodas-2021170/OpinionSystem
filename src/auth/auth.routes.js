import { Router } from "express"
import { login, register, test } from "./auth.controller.js"
import { registerValidate } from "../../middleware/validate.js"

const api = Router()
//RUTAS PUBLICAS
api.get('/',test)

api.post('/register',[registerValidate], register)
api.post('/login', login)
export default api