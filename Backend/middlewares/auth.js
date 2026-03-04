
const jwt = require('jsonwebtoken')
require('dotenv').config()




const auth = async(req,res,next)=>{
    try{

        const token = req.cookies.token || req.body.token ||  req.header("Authorization")?.replace('Bearer ',"")

        // validation
        if(!token)
        {
            return res.status(400).json({
                success:false,
                message:"token not found"
            })
        }

        //verify token 
        try{
           
             const decode = jwt.verify(token,process.env.JWT_SECRET)
             console.log(decode)
             req.user=decode


        }
        catch(err)
        {
            console.error(err)
            return res.status(401).json({
                success:false,
                message:"Token verification failed"
            })
        }
      
        next()




    }catch(err)
    {
       console.error(err)
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
    }
}


//isStudent
const isStudent = async(req,res,next)=>{
    try{
       
        if(req.user.role !== 'Student')
        {
            return res.status(401).json({
                success:false,
                message:"This is proteched route for students only"
            })
        }

        next()

    }catch(err)
    {
      console.error(err)
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }
}

//isAdmin
const isAdmin= async(req,res,next)=>{
    try{
        
       
        if(req.user.role !== 'Admin')
        {
            return res.status(401).json({
                success:false,
                message:"This is proteched route for Admin only"
            })
        }
        next()
    }catch(err)
    {

      console.error(err)
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }
}

//isInstructor
//isStudent
const isInstructor = async(req,res,next)=>{
    try{
       
        if(req.user.role !== 'Instructor')
        {
            return res.status(401).json({
                success:false,
                message:"This is proteched route for Instructor only"
            })
        }
        next()

    }catch(err)
    {
      console.error(err)
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      })
    }
}


module.exports ={
    auth,
    isAdmin,
    isStudent,
    isInstructor
}