import User from "../user/user.model.js"
import Category from "../category/category.model.js"
import Publication from "./publication.model.js"
import Comment from "../coment/coment.model.js"

//Se crea la función que crea la publicación
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

//Se crea la función que obtiene todas las publicaciónes
export const getAllPublication = async(req,res) =>{
    try {
        let publications = await Publication.find({status:true})
        .select('-status')
        .populate('user', 'username')
        .populate('category', 'name')
        .populate({
            path: 'comment',
            match:{status:true},
            select: 'description',
            populate:{
                path: 'user',
                select: 'username -_id'
            }
        }
    )
        if(!publications)return res.status(404).send({success:false, message:'Publications does not found'})
            return res.send({success:true, message:'Publications found',publications, total: publications.length})
    } catch (error) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

//Se crea la funcion que obtiene todas las publicaciones que el usuario que este logeado tiene
export const getMyPublication = async(req,res) =>{
    try {
        let publications = await Publication.find({
            $and: [
                { user: req.user.uid },
                { status: true }
            ]
        })
        .select('-status')
        .populate('user', 'username')
        .populate('category', 'name')
        .populate({
            path: 'comment',
            match:{status:true},
            select: 'description',
            populate:{
                path: 'user',
                select: 'username -_id'
            }
        }
    )
        if(!publications)return res.status(404).send({success:false, message:'Publications does not found',})
            return res.send({success:true, message:'Publications found',total: publications.length,publications})
    } catch (error) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

//Se crea la función que actualiza la publicación que el usuario haya hecho
export const updatePublication = async(req,res) =>{
    try {
        let id = req.body.id
        let data = req.body
        let {category} = req.body

        let user = await User.findById(req.user.uid)
        
        let categor = await Category.findById(category)
        
        let publication = await Publication.findById(id)
        
        if(!publication) return res.status(404).send({success:false, message:'Publication not found'})
            
        if(user.id !== publication.user.toString()) return res.status(404).send({success:false, message:'You are not the owner of this publication'})
        
        if(category){
            if(!categor) return res.status(404).send({success:false, message:'Category not found'})
        }
        
        let publicartions = await Publication.findByIdAndUpdate(id, data, {new:true})
        
        return res.send({success: true, message: 'Course updated successfully', publicartions})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}

//Se crea la función que elimina la publicación que el usuario haya hecho
export const deletePublication = async(req,res) =>{
    try {
        let id = req.body.id

        let publication = await Publication.findById(id)

    
        if(!publication) return res.status(404).send({sucess:false, message:'Publication not found'})
        
        if(req.user.uid !== publication.user.toString()) return res.status(404).send({success:false, message:'You are not the owner of this publication'})
        
        let deletePublication  = await Publication.findByIdAndUpdate(
            id, {status:false}, {new:true}
        )
        await Comment.updateMany(
            {publication:publication},
            {status: false}
        )
        return res.send({success:true, message:'Publication deleted' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}
