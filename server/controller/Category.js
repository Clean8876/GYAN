import Category from "../models/Category.js";


//create a new category
export const createCategory = async(req,res)=>{
    const{name,description} = req.body;
    const Category = new Category({name,description});
    try{
        await Category.save();
        res.status(201).json(Category);
        }catch(error){
            res.status(409).json({message:error.message});
            }
}
// delete the category
export const delCategory = async(req,res)=>{
    const id = req.params.id;
    try{
        if(!id){
            return res.status(404).json({message:"Category ID not found"});
        }
        await Category.findByIdAndDelete(id);
        res.status(200).json({message:"Category succesfully deleted"})

}
catch(err){
    res.status(404).json({message:"Category not found"});
}
}
//getting the category frm the database
export const getCategory = async(req,res)=>{
    try{
    const categories = await Category.find();
    res.status(200).json(categories);
    }
    catch(err){
        res.status(404).json({message:"Categories not found"});
        }
        }



