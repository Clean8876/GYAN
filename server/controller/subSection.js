import SubSection from '../models/subSection.js';
import Section from '../models/Section.js';
import { uploadImageToCloudinary } from '../utils/fileUploader.js';
import { ConnectionCheckOutStartedEvent } from 'mongodb';


export const createSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const {  title, description } = req.body
    const sectionId = req.params.id
    const video = req.files.video

     //Check if all necessary fields are provided
    if (!title || !description || !video) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields are Required" })
    }
    console.log(video)

    // Upload the video file to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    )
    console.log(uploadDetails)
    // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      video: uploadDetails.secure_url,
    })

    // Update the corresponding section with the newly created sub-section
    const populateSection = await Section.findByIdAndUpdate(sectionId,
      { $push:{ subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection").exec()
    // Return the updated section in the response
    return res.status(200).json({ success: true, data: populateSection })
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
//update the subsection
export const updateSubSection = async (req, res) => {
  try {
    //get the id from the parameter
    const subSectionId = req.params.id
    const { sectionId, title, description } = req.body
    const subSection = await SubSection.findById(subSectionId)

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      })
    }
    //update the field 

    if (title !== undefined) {
      subSection.title = title
    }

    if (description !== undefined) {
      subSection.description = description
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      subSection.videoUrl = uploadDetails.secure_url
      subSection.timeDuration = `${uploadDetails.duration}`
    }

    await subSection.save()
//updated the Section
    const updatedSection = await Section.findById(sectionId).populate("subSection")

    return res.json({
      success: true,
      data:updatedSection,
      message: "Section updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    })
  }
}
//deleting the subsection
export const deleteSubSection = async (req, res) => {
  try {
    const subSectionId = req.params.id
    const {sectionId } = req.body
    //removing the subSection ref from the Section
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    //delete middleware
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }
    // populate the updated 
    const updatedSection = await Section.findById(sectionId).populate("subSection")

    return res.json({
      success: true,
      data:updatedSection,
      message: "SubSection deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}










































 /*  try {
    const { title, description,  sectionId } = req.body;
    const video = req.files.video;


    //upload cideo to cludinary
    const videoUrl = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
    const timeDurations = videoUrl.duration;

    // Create a new SubSection
    const newSubSection = new SubSection({
      title,
      timeDuration:`${timeDurations}seconds`,
      description,
      video:videoUrl.secure_url,
    });

    // Save the new SubSection
    const savedSubSection = await newSubSection.save();

    // Find the Section and push the new SubSection ID
    await Section.findByIdAndUpdate(sectionId, {
      $push: { subSection: savedSubSection._id },
    }).populate('SubSection').exec();

    res.status(201).json(savedSubSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */