'use strict'

import jwt from "jsonwebtoken"

export const validateJwt = async(req, res, next) =>{
    try {
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers

        if(!authorization) return res.status(401).send({success: false, message: 'You most be logged in'})

        let user = jwt.verify(authorization, secretKey)

        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({success: false, message:'Invalid Token', err})
    }
}

export const isAdmin = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user  || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You dont have access to this function, only an Admin can access`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized role'
            }
        )
    }
}
