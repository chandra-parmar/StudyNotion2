
const Course = require('../models/Course')
const Section = require('../models/Section')

const createSection = async(req,res)=>{
    try{
        const {sectionName,courseId} = req.body
        
        if(!sectionName || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
        }

        const newSection = await Section.create({
            sectionName
        })

        //update course and push section id inside it  
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                                 {
                                                    $push:{
                                                    courseContent:newSection._id
                                                     }
                                                },{new:true}
                                                )
        
        return res.status(200).json({
            success:true,
            message:"section name created successfully",
            data:updatedCourseDetails
        })

    }catch(err)
    {
         console.error(err)
         return res.status(500).json({
        success:false,
        message:"cannot fetch course data"
      }) 
    }
}


//update section 
const updateSection = async(req,res)=>{
    try{
       
        const { sectionId } = req.params
        const { sectionName } = req.body

        if(!sectionName || !sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"missing fields"
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName} ,{new:true},{runValidators:true})

        return res.status(200).json({
            success:true,
            message:"section name updated successfully",
            data:updatedSection
        })

    }catch(err)
    {
          console.error(err)
         return res.status(500).json({
        success:false,
        message:"cannot fetch course data"
      })

    }
}


const deleteSection = async(req,res)=>{
    try{

        const {sectionId, courseId} = req.params

         if(!sectionId || !courseId)
        {
            return res.status(400).json({
                success:false,
                message:"missing fields"
            })
        }

        //pull section id from courseContent
        await Course.findByIdAndUpdate(courseId,{$pull:{courseContent: sectionId}})

        await Section.findByIdAndDelete(sectionId)

        return res.status(200).json({
            success:true,
            message:"section deleted successfully"
        })

    }catch(err)
    {
       console.error(err)
         return res.status(500).json({
        success:false,
        message:"unable to delete section"
      })  
    }
}


module.exports ={
    createSection
    ,updateSection,
    deleteSection
}