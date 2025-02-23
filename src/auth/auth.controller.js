import User from "../user/user.model.js"
import { encrypt, checkPassword } from "../../utils/encrypt.js"
import {generatejwt} from "../../utils/jwt.js"


export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message:'Test is running'})
}

//Se crea la funcion defaultAdmin que crea el admin por defecto
export const defaultAdmin = async(req,res) =>{
    try {
        let adminRole = await User.findOne({role: 'ADMIN'})
        if(!adminRole)
            adminRole = await User.create(
                {
                    name: 'Dilan Andre', 
                    surname:'Rodas Aldana', 
                    email: 'dili@gmail.com',
                    username: 'Dili',
                    password: await encrypt(process.env.PASSWORD_ADMIN),
                    role: 'ADMIN'
                }
                
            )
            await adminRole.save()
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({success: false, message: 'General Error', err})
    }
}

// Se crea la función para registrar a los usuarios con un role de USER por defecto
export const register = async(req,res) =>{
    try {
        let data = req.body

        let user = new User(data)

        user.role = 'USER'
        user.password = await encrypt(user.password)
        await user.save()

        return res.send({success: true, message:`Hello ${user.username} `})
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({success: false, message: 'General Error',err})
    }
}

//Se crea la función login que deja inciar sesión al usuario
export const login = async(req,res) =>{
    try {
        let{userData, password} = req.body
        console.log(userData)
        let user = await User.findOne(
            {
                $or:[
                    {email: userData},
                    {username:userData}
                ]
            }
        )
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.name,
                email: user.email,
                role: user.role
            }

            let token = await generatejwt(loggedUser)
            return res.send({success: true, message: `Welcome: ${user.username}`, loggedUser, token})
        }
        return res.status(404).send({success:false, message: 'Wrong username o email'})
    } catch (err) {
        console.error('General Error', err)
        return res.status(500).send({success: false, message:'General Message', err})
    }
}