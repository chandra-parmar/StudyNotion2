
const Course = require('../models/Course')
const uploadImageToCloudinary = require('../utils/imageUploader')
const Category = require('../models/Category')
const User = require('../models/User')


//creat course
const createCourse = async(req,res)=>{
    try{

        //fetch data and file
        const {courseName,courseDescription,whatYouWillLearn,price,category} = req.body

        //thumbnail
        const thumbnail = req.files.thumbnailImage

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail)
        {
            return  res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //check for instructor to push instructor id in course
        const userId = req.user?.id 

        const instructorDetails = await User.findById(userId)
        console.log(instructorDetails)

        if(!instructorDetails)
        {
            return res.status(401).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        //check for category 
        const categoryDetails = await Category.findById(category)

         if(!categoryDetails)
        {
            return res.status(401).json({
                success:false,
                message:"category details not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
        
        //entry for newcourse
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url

        })

        //update instructor user add 
        await User.findByIdAndUpdate(instructorDetails._id,
                                     {
                                        $push:{
                                            courses:newCourse._id
                                        }
                                     },{returnDocument: 'after'}
        )

       //update category schema
       await Category.findByIdAndUpdate(categoryDetails._id,
                                       {$push:{courses:newCourse._id}},
                                        {returnDocument: 'after'}
       )

       return res.status(200).json({
        success:true,
        message:"course created successfully",
        data:newCourse
       })

    }catch(err)
    {
      console.error(err)
      return res.status(500).json({
        success:false,
        message:"Failed to create course"
      })
    }
}

//get all courses

const showAllCourses = async(req,res)=>{
    try{
   
        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReviews:true,studentsEnrolled:true})
                                            .populate("instructor").exec()

        return res.status(200).json({
            success:true
            ,data:allCourses
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


const getCourseDetails = async(req,res)=>{
    try{
       const {courseId} = req.params

       const courseDetails = await Course.findById(courseId)
                                      .populate(
                                        {
                                            path:"instructor",
                                            populate:{
                                                path:"additionalDetails"
                                            }
                                        }
                                      ).populate("category")
                                      .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection"
                                        }
                                      }).exec()

                console.log(courseDetails)                      

            if(!courseDetails)
                {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                        
                    })
                } 
                
              //return res
              return res.status(200).json({
                success:true,
                message:"course details fetched successfully",
                data:courseDetails
              })  

                                      
      
    }catch(error)
    {
     console.log(error)
     return res.status(500).json({
        success:false,
        message:error.message
     })
    }
}

module.exports ={
    createCourse,
    showAllCourses,
    getCourseDetails

}