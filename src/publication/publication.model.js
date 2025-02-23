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
        comment:[{
            type: Schema.Types.ObjectId,
            ref:'Coment'
        }],
        category:{
            type: Schema.Types.ObjectId,
            ref:'Category'
        },
        status:{
            type:Boolean,
            default: true
        }
    }
)

export default model('Publication', publicationSchema)