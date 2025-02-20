import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Publication from "./publication.model.js"

export const addPublication = async(req,res) =>{
    try {
        let data = req.body
        let user = await User.findOne({_id: req.user.uid})

        if(!user) return res.status(403).send({success:false,message: 'User not found'})
        
        let category = await Category.findOne({_id: data.category})

        if(!category) return res.status(404).send({success:false, message:'Category not found'})
        
        let publication = new Publication({...data, user:req.user.uid })
        
        await publication.save()

        return res.send({success: true, message:'Publication saved'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const getAllPublication = async(req,res) =>{
    try {
        let publications = await Publication.find().populate('user', 'username').populate('category', 'name')
        if(!publications)return res.status(404).send({success:false, message:'Publications does not found'})
            return res.send({success:true, message:'Publications found',publications})
    } catch (error) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const updatePublication = async(req,res) =>{
    try {
        let id = req.body.id
        let data = req.body


        let user = await User.findById(req.user.uid)
        
        let category = await Category.findById(data.category)
        
        let publication = await Publication.findById(id)
        
        if(!publication) return res.status(404).send({success:false, message:'Publication not found'})
            
        if(user.id !== publication.user.toString()) return res.status(404).send({success:false, message:'You are not the owner of this publicartion'})
        
        if(!category) return res.status(404).send({success:false, message:'Category not found'})
        
        let publicartions = await Publication.findByIdAndUpdate(id, data, {new:true})
        
        return res.send({success: true, message: 'Course updated successfully', publicartions})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

export const deletePublication = async(req,res) =>{
    try {
        let id = req.body.id

        let user = await User.findById(req.user.uid)

        let publication = await Publication.findById(id)

        if(!publication) return res.status(404).send({sucess:false, message:'Publication not found'}
            
        )
        if(user.id !== publication.user.toString()) return res.status(404).send({success:false, message:'You are not the owner of this publicartion'})
        
        let deletePublication  = await Publication.deleteOne({_id:id})
        if(deletePublication.deletedCount <=0)return res.status(404).send({success:false, message:'Category not found'})
            return res.send({success:true, message:'Publication deleted'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}
