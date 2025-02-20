import { Router } from "express"
import { addComment, getAllCommentPublication } from "./coment.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()


api.post('/addComment', [validateJwt],addComment)
api.get('/getComments', [validateJwt], getAllCommentPublication)

export default api