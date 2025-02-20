import { Schema, model } from "mongoose"

const publicationSchema = Schema(
    {
        title:{
            type:String,
            maxLength: [50 , 'Title cant overcome 25 characters'],
            required:[true, 'Title is required']
        },
        principal:{
            type:String,
            maxLength: [150 , 'Principal cant overcome 25 characters'],
            required:[true, 'Principal is required']
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        category:{
            type: Schema.Types.ObjectId,
            ref:'Category'
        }
    }
)

export default model('Publication', publicationSchema)