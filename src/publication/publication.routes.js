import { Router } from "express"
import { validateJwt } from "../../middleware/validate.jwt.js"
import { addPublication, deletePublication, getAllPublication, updatePublication } from "./publication.controller.js"
import { updatePublicationValidate } from "../../middleware/validate.js"

const api = Router()

api.post('/addPublication', [validateJwt], addPublication)

api.get('/',[validateJwt],getAllPublication)

api.put('/updatedPublication', [validateJwt, updatePublicationValidate], updatePublication)
api.delete('/deletedPublication', [validateJwt], deletePublication)
export default api