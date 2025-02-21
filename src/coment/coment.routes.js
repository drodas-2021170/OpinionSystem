import { Router } from "express"
import { addComment, deleteComment, getAllCommentPublication, updateComment } from "./coment.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()


api.post('/addComment', [validateJwt],addComment)
api.get('/getComments', [validateJwt], getAllCommentPublication)
api.put('/updateComment',[validateJwt], updateComment)
api.delete('/deleteComment', [validateJwt, deleteComment])

export default api