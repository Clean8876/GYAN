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
        export const getCategoryDetails = async (req, res) => {
            try {
              const { categoryId } = req.body;
             
          
              // Get courses for the specified category
              const selectedCategory = await Category.findById(categoryId)
                .populate({
                  path: "course", // Changed from "courses" to "course"
                  match: { status: "Published" },
                })
      
          
              // Handle the case when the category is not found
              if (!selectedCategory) {
                console.log("Category not found.");
                return res.status(404).json({ success: false, message: "Category not found" });
              }
          
              // Handle the case when course is undefined or empty
              if (!selectedCategory.course || selectedCategory.course.length === 0) {
                console.log("No courses found for the selected category.");
                return res.status(404).json({
                  success: false,
                  message: "No courses found for the selected category.",
                });
              }
          /* 
              const categoriesExceptSelected = await Category.find({
                _id: { $ne: categoryId },
              });
          
              // Check if there are any other categories
              if (categoriesExceptSelected.length > 0) {
                let differentCategory = await Category.findOne(
                  categoriesExceptSelected[Math.floor(Math.random() * categoriesExceptSelected.length)]._id
                )
                  .populate({
                    path: "course", // Changed from "courses" to "course"
                    match: { status: "Published" },
                  })
                  .exec();
                // You can use differentCategory here if needed
              }
          
              // Fetch new courses
              const newCourses = selectedCategory.course
                .filter(course => course.isNew)
                .sort((a, b) => b.createdAt - a.createdAt); */
          
              res.status(200).json({
                success: true,
                data: {
                  selectedCategory,
                },
              });
            } catch (error) {
              console.error("Error in getCategoryDetails:", error);
              return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
              });
            }
          };