import Course from "../models/Course.js";
import Section from "../models/Section.js";
import SubSection from "../models/subSection.js";



//Create a Section for a Specidfic Course

export const createSection = async(req,res)=>{
    try{
        // getting the courseId and the Section name
        const {sectionName,courseId} = req.body;
      


        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"invalid Section"
            })
        }
        // Creaate a Section
        const sections =  new Section({sectionName})
        await sections.save();

        // Update the Course Object Id and the get the deatiles of the SubSections
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: sections._id
                }
            },
            { new: true }
        ).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        });
        if(!updatedCourse){
            return res.status(404).json({
                success:false,
                message:"Course not found"
        })

    }
    res.status(201).json({
        success:true,
        message:"Section Created Successfully",
    })
    
    
}
catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
        })
}
}
export const getSection = async(req,res)=>{
    try{
        const sectionId = req.body;
        const section = await Section.findById(sectionId).populate('subSection');
    
        if (!section) {
          return res.status(404).json({
            success: false,
            message: "Section not found"
          });
        }
    
        res.status(200).json({
          success: true,
          data: section
        });
                
        }
        catch(err){
            console.log(err);
            res.status(500).json({
                success:false,
                message:"Internal Server Error"})
        }
}

//updating the section name and geting the updated content
export const updateSection = async (req,res) => {
    try {

        //data input
        const {sectionName, sectionId, courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //return res
        return res.status(200).json({
            success:true,
            message:section,
            data:course,
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
};
//delte the Section
export const deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection', 
            },
        })
        .exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   