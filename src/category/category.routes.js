import { Router } from "express"
import { addCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js"
import { isAdmin, validateJwt } from "../../middleware/validate.jwt.js"

const api = Router()

//Private Routes, Only admin can access to those

api.get('/',[validateJwt, isAdmin], getCategories )
api.post('/addCategory', [validateJwt, isAdmin],addCategory)

api.put('/updatedCategory',[validateJwt, isAdmin], updateCategory)

api.delete('/deleteCategory', [validateJwt,isAdmin], deleteCategory)
export default api