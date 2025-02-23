import { Router } from "express"
import { validateJwt } from "../../middleware/validate.jwt.js"
import { addPublication, deletePublication, getAllPublication, getMyPublication, updatePublication } from "./publication.controller.js"
import { addPublicationValidate, updatePublicationValidate } from "../../middleware/validate.js"

const api = Router()

api.post('/addPublication', [validateJwt, addPublicationValidate], addPublication)

api.get('/',[validateJwt],getAllPublication)
api.get('/getMyPublication', [validateJwt], getMyPublication)

api.put('/updatedPublication', [validateJwt, updatePublicationValidate], updatePublication)
api.delete('/deletedPublication', [validateJwt], deletePublication)
export default api