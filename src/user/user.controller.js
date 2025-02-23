'use strict'

import { checkPassword, encrypt } from "../../utils/encrypt.js"
import User from "./user.model.js"

//Se crea la función que actuliza algunos datos del usuario
export const updateUser = async(req,res) =>{
    try {
        
        let data = req.body
        let{oldPassword, newPassword} = req.body
        let user = await User.findById(req.user.uid)
        
        if(data.role) return res.status(403).send({success:false, mesage:'You cant update your role'})
        if(oldPassword){
            let match = await checkPassword(user.password, oldPassword)
            if (!match) {
                return res.status(400).send({ success: false, message: 'Old password is incorrect' });
            }

            if (newPassword) {
                data.password = await encrypt(newPassword);
            }
        }
            let updateUser = await User.findByIdAndUpdate(
                req.user.uid, data , {new:true}
            )
            return res.send({success: true, message:'Password Updated',updateUser})
    } catch (err) {
        console.error('General Error', err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

//Se función que obtiene todos los usuarios
export const getUsers = async(req,res) =>{
    try {
        let users = await User.find()
        
        if(!users) return res.status(404).send({success:false, message:'Users not found'})
            return res.send({success:true, message:'User found', users, total: users.length})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message: 'General Error', err})
    }
}
