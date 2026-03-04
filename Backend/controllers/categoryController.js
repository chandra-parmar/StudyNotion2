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

module.exports ={
    createCategory,
    showAllCategory
}