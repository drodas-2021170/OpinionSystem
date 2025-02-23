import { Router } from "express"
import { addComment, deleteComment, getAllCommentPublication, updateComment } from "./coment.controller.js"
import { validateJwt } from "../../middleware/validate.jwt.js"
import { addCommentValidate,updateCommentValidate } from "../../middleware/validate.js"

const api = Router()


api.post('/addComment', [validateJwt, addCommentValidate],addComment)
api.get('/getComments', [validateJwt], getAllCommentPublication)
api.put('/updateComment',[validateJwt,updateCommentValidate], updateComment)
api.delete('/deleteComment', [validateJwt, deleteComment])

export default api