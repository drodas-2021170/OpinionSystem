import { Router } from "express"
import { login, register, test } from "./auth.controller.js"

const api = Router()
//RUTAS PUBLICAS
api.get('/',test)

api.post('/register', register)
api.post('/login', login)
export default api