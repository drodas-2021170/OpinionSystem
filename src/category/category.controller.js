import Category from "./category.model.js"

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