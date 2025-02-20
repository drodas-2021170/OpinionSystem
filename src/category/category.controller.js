import Category from "./category.model.js"
import Publication from "../publication/publication.model.js"

export const defaultCategory = async(req,res) =>{
    try {
        let deCategory = await Category.findOne({name: 'Default Category'})
        if(!deCategory)
            deCategory = await Category.create(
                {
                    name: 'Default Category',
                    description: 'Default Category that includes all opinions if one category was deleted'
                }
            )
            await deCategory.save()
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const getCategories = async(req,res) =>{
    try {
        let categories = await Category.find()
        if(!categories) return res.status(404).send({success:false, message:'Categories not found'})
            return res.send({success:true, message:'Categories:', categories})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error',err})
    }
}

export const addCategory = async(req,res) =>{
    try {
        let data = req.body

        let category = new Category(data)

        await category.save()

        return res.send({success: true, message:`Category ${category.name} added`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error',err})
    }
}

export const updateCategory = async(req,res) =>{
    try {
        let id = req.body.id
        let data = req.body

        let categoryId = await Category.findOne({_id:id})
        if(!categoryId) return res.status(404).send({success: false, message:'Category not found'})

        let updatedCategory = await Category.findByIdAndUpdate(
            id, data, {new:true}
        )
        if(!updateCategory) return res.status(404).send({success: false, message:'Category not found'})
            return res.send({success: true, message:'Category updated', updatedCategory})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success: false, message:'General Error', err})
    }
}

export const deleteCategory = async(req,res) =>{
    try {
        let id = req.body.id

        let deCategory = await Category.findOne({name: 'Default Category'})
        
        if(deCategory._id.toString() === id) return res.status(404).send({success:false, message:'You must not delete Default category'})
        
            let deletedCategory = await Category.deleteOne({_id:id})

        if(deletedCategory.deletedCount <=0)return res.status(404).send({success:false, message:'Category not found'})
        
        if(!deCategory) return res.status(404).send({success:false, message:'Default category not found'})

            await Publication.updateMany(
                {category:id},
                {category: deCategory._id}
            )
            return res.send({success:true, message:'Category Deleted'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({success:false, message:'General Error', err})
    }
}