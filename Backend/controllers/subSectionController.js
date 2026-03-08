const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");
const SubSection = require('../models/SubSection')
require('dotenv').config()



//create sub Section
const createSubSection = async(req,res)=>{
    try{

        //fetch data from req body
        const {sectionId,title,description} = req.body

        //extract file/video
        const video = req.files.videoFile

        //validation
        if (!sectionId || !title  || !description ||!video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        console.log(video)
       
        //upload video to cloudinary
        const videoUploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        console.log(videoUploadDetails)

        // // guard against failed upload
        // if (!videoUploadDetails || !videoUploadDetails.secure_url) {
        //     console.error('Cloudinary upload failed or returned unexpected response', videoUploadDetails);
        //     return res.status(500).json({
        //         success: false,
        //         message: 'Video upload failed'
        //     });
        // }

        if (!videoUploadDetails) {
            return res.status(500).json({
                     success:false,
                   message:"Video upload failed"
            })
         }

        //create a sub Section
        const subSectionDetails = await SubSection.create({
            title,
            
            description,
            videoUrl: videoUploadDetails.secure_url
        })

        //update section with this sub section objectid
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:subSectionDetails._id}},{new:true}).populate("subSection")

        //return response
        return res.status(200).json({
            success:true,
            message:"section created successfully",
            data:updatedSection
        })





    }

    catch(err)
    {
       console.error(err)
       return res.status(500).json({
        success:false,
        message:"Internal server error"
        
       })
    }
}

const updateSubSection = async(req,res)=>{
    try{
        // Extract data from req body
        const { title, description } = req.body;
        const {sectionId,subSectionId} = req.params


        // Extract file/video if provided
        const video = req.files?.videoFile;

        // Validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required"
            });
        }

        // Prepare update object
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        
        if (description !== undefined) updateData.description = description;

        // If video is provided, upload to Cloudinary
        if (video) {
            const videoUploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            updateData.videoUrl = videoUploadDetails.secure_url; // Assuming secure_url is the URL
        }

        // Update the SubSection
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            updateData,
            { new: true }
        );

        // Check if SubSection exists
        if (!updatedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        // Return response
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            updatedSubSection
        });

    }catch(err)
    {
        console.error(err)
       return res.status(500).json({
        success:false,
        message:"Internal server error"
        
       })

    }
}

const deleteSubSection = async(req,res)=>{
    try{
        // Extract sectionId and subSectionId from url params
        const { sectionId, subSectionId } = req.params;

        // Validation
        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and SubSection ID are required"
            });
        }

        // Find the section that contains this subSection
        const section = await Section.findOne({ subSection: subSectionId });

        if (section) {
            // Remove the subSection from the section's subSection array
            await Section.findByIdAndUpdate(section._id, { $pull: { subSection: subSectionId } });
        }

        // Delete the SubSection
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        // Check if SubSection existed
        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            });
        }

        // Return response
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully"
        });

    }catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}



module.exports={
    createSubSection,
    updateSubSection,
    deleteSubSection
}

