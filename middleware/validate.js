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

export const loginValidate =[
    body('userData', 'User information is required').notEmpty(),
    body('password', 'Password is required').notEmpty(),
    validateErrors
]

export const updateUserValidate =[
    body('name', 'Name is required').optional().notEmpty(),
    body('surname', 'Surname is required').optional().notEmpty(),
    body('email', 'Email is required').optional().notEmpty(),
    body('oldPassword', 'Old password is required to update to the new password').optional().notEmpty(),
    body('newPassword', 'New password is required').optional().notEmpty().isStrongPassword().withMessage('Your new password could be strong'),
    validateErrors
]

export const updatePublicationValidate =[
    body('title', 'Title is required').optional().notEmpty(),
    body('principal', 'Principal is required').optional().notEmpty(),
    body('category', 'Category is required').optional().notEmpty(),
    validateErrors
]

