import User from "../src/user/user.model.js"

export const existUsername = async(username) =>{
    const userUsername = await User.findOne({username})
    if(userUsername){
        console.error(`This username is already taken`)
        throw new Error(`This username is already taken`)
    }
}

export const existEmail = async(email) =>{
    const userEmail = await User.findOne({email})
    if(userEmail){
        console.error(`This email is already taken`)
        throw new Error(`This email is already taken`)
    }
}