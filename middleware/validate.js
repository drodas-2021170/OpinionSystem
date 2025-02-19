import { body } from "express-validator"
import { validateErrors } from "./validate.errors.js"
import { existEmail, existUsername } from "./db.validators.js"

export const registerValidate =[
    body('name', 'Name is required').notEmpty(),
    body('surname', 'Surname is required').notEmpty(),
    body('email', 'Email is required').notEmpty().custom(existEmail),
    body('username', 'Username is required').notEmpty().custom(existUsername),
    body('password', 'Password is required').notEmpty().isStrongPassword().withMessage('The password must be strong'),
    validateErrors
]