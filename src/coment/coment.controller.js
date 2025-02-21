import User from "../user/user.model.js"
import Publication from "../publication/publication.model.js"
import Comment from "./coment.model.js"

export const addComment = async(req,res) =>{
    try {
        let data = req.body

        let publication = await Publication.findOne({_id:data.publication})

        if(!publication) return res.status(404).send({success: false, message:'Publication not found'})
        
        let comment = new Comment({...data, user: req.user.uid})

        await comment.save()
        return res.send({success: true, message:'Comment Saved'})
    } catch (err) {
        console.error('General Error',err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const getAllCommentPublication = async(req, res) =>{
    try {
        let {id} = req.body
        console.log(id)
        let comment = await Comment.find({publication:id}).populate('user','username').populate({
            path:'publication', 
            select:'title principal -_id',
            populate:{
                path: 'category',
                select: 'name -_id'
            }
        }
    )
        
        if(comment.length === 0) return res.status(404).send({success:false, message:'Publication not found'})
            return res.send({success:true, message:'Publication found', comment})
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
            
        if(req.user.uid !== comment.user.toString()) return res.status(403).send({success:false, message:'Only the owner can delete this comment'})
    
        let deletedComment = await Comment.deleteOne({_id:id})

        if(deletedComment.deletedCount <=0)return res.status(404).send({success:false, message:'Comment not deleted'})
            return res.send({success:true, message:'Comment deleted'})
    }catch(err){
        console.log(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}
