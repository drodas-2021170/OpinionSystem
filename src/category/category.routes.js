import { Router } from "express"
import { addCategory, deleteCategory, getCategories, updateCategory } from "./category.controller.js"
import { isAdmin, validateJwt } from "../../middleware/validate.jwt.js"
import { addCategoryValidate, updateCategoryValidate } from "../../middleware/validate.js"


const api = Router()

//Private Routes, Only admin can access to those

api.get('/',[validateJwt, isAdmin], getCategories )
api.post('/addCategory', [validateJwt, isAdmin,addCategoryValidate],addCategory)

api.put('/updatedCategory',[validateJwt, isAdmin, updateCategoryValidate], updateCategory)

api.delete('/deleteCategory', [validateJwt], deleteCategory)
export default api