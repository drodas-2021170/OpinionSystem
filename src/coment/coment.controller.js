import User from "../user/user.model.js"
import Publication from "../publication/publication.model.js"
import Comment from "./coment.model.js"

export const addComment = async(req,res) =>{
    try {
        let data = req.body

        let publication = await Publication.findOne({_id:data.publication})

        if(!publication) return res.status(404).send({success: false, message:'Publication not found'})
        
        if(publication.status === false) return res.status(404).send({success: false, message:'Publication not exist'})
        let comment = new Comment({...data, user: req.user.uid})

        publication.comment.push(comment._id)

        await publication.save()
        await comment.save()
        return res.send({success: true, message:'Comment Saved'})
    } catch (err) {
        console.error('General Error',err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}



export const getAllCommentPublication = async(req, res) =>{
    try {
        let comment = await Comment.find({
            $and: [
                { user: req.user.uid },
                { status: true }
            ]
        })
        .populate('user','username -_id')
        .select('-status')
        .populate({
            path:'publication', 
            select:'title principal -_id',
            populate:{
                path: 'category',
                select: 'name -_id'
            }
        }
    )
        
            return res.send({success:true, message:'Comments found', comment, total: comment.length})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}


export const updateComment = async(req,res) =>{
    try {
        let id = req.body.id
        let data = req.body

        let comment = await Comment.findById(id)

        if(!comment) return res.status(404).send({success:false, message:'Comment not found'})
            
        if(req.user.uid !== comment.user.toString()) return res.status(403).send({success:false, message:'Only the owner can edit this comment'})
        
        let updatedComment = await Comment.findByIdAndUpdate(
            id, data, {new:true}
        )

        return res.send({success:true, message:'Comment updated successfully', updatedComment})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}


export const deleteComment = async(req,res) =>{
    try{
        let id = req.body.id

        let comment = await Comment.findById(id)
        
        if(!comment) return res.status(404).send({success:false, message:'Comment not found'})
        
        if(comment.status === false) return res.status(404).send({success:false, message:'Comment not exist'})

        if(req.user.uid !== comment.user.toString()) return res.status(403).send({success:false, message:'Only the owner can delete this comment'})
    
        let commentPublication  = await Comment.findByIdAndUpdate(
                    id, {status:false}, {new:true}
                )
        return res.send({success:true, message:'Comment deleted',})
    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}
