const Category = require('../models/Category')

const createCategory = async(req,res)=>{
    try{

        const {name,description} = req.body

        //validation
        if(!name ||!description)
        {
            return res.status(400).json({
                success:false,
                message:"enter all field"
            })
        }
       
        //create entry in db 
        const newCategory= await Category.create({
            name:name,
            description:description
        })
        console.log(newCategory)

        return res.status(200).json({
            success:true,
            message:"category created successfully"
        })


    }catch(err)
    {
     console.error(err)
       return res.status(500).json({
        success:false,
        message:"Internal server error"
       })
    }
}


const showAllCategory = async(req,res)=>{
    try{
      
        const allCategory = await Category.find({},{name:true,description:true})

        return res.status(200).json({
            success:true,
            allCategory
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


//get category page details 
// get category page details
const categoryPageDetails = async (req, res) => {

    try {

        const { categoryId } = req.body

        console.log("PRINTING CATEGORY ID:", categoryId)

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                populate: "ratingAndReviews",
            })
            .exec()

        console.log("SELECTED CATEGORY:", selectedCategory)
        console.log("CATEGORY COURSES:", selectedCategory?.courses)

        // Category does not exist
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            })
        }

        // Category exists but has no courses
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
            },
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}




module.exports ={
    createCategory,
    showAllCategory,
    categoryPageDetails
}