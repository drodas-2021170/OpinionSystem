import { Schema, model } from "mongoose"

const comentSchema = Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        description:{
            type:String,
            maxLength:[150,'Description cant be overcome 150 characters'],
            required: [true, 'Description is required']
        },
        publication:{
            type: Schema.Types.ObjectId,
            ref:'Publication'
        }
    }
) 

export default model('Coment', comentSchema)