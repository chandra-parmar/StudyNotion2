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

const categoryPageDetails = async(req,res)=>{
    try{

        //get categoryID
        const {categoryId} = req.params

        //get courses for specified category 
        const selectedCategory = await Category.findById(categoryId)
                                            .populate("courses").exec()
          
         //validation 
          if(!selectedCategory)
            {
                return res.status(404).json({
                    success:false,
                    message:"Data not found"
                })
            } 
          //get courses for different categories
          const differentCategories = await Category.find({_id:{$ne:categoryId}}).populate('courses').exec()
            
          //return res 
          return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
          })

    }catch(err)
    {
      console.log(err)
      return res.status(500).json({
        success:false,
        message:"internal server error"
      })
    }
}

module.exports ={
    createCategory,
    showAllCategory,
    categoryPageDetails
}