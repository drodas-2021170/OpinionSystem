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
        let comment = await Comment.find({publication:id}).populate('user','username').populate('publication', 'title principal')
        
        if(comment.length === 0) return res.status(404).send({success:false, message:'Publication not found'})
            return res.send({success:true, message:'Publication found', comment})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}


