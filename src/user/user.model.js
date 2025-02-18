import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name:{
            type: String,
            maxLenght: [25, 'Cant be overcome 25 characters'],
            required: [true, 'Name is requiered']
        },
        surname:{
            type:String,
            maxLenght:[25, 'Cant be overcome 25 characters'],
            required:[true, 'Surname is required']
        },
        email:{
            type:String,
            required:[true, 'Email is required']
        },
        username:{
            type:String,
            required:[true, 'Username is required']
        },
        password:{
            type: String,
            minLength:[8, 'Password must be 8 characters'],
            required: [true, 'Password is required']
        },
        role:{
            type: String,
            required:[true, 'Role is required'],
            uppercase: [true]
        }
    }
)

export default model('User', userSchema)