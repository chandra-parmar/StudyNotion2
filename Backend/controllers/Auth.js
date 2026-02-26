const User = require('../models/User')

//send otp


//signup
const signup = async()=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,role} = req.body

        //validation
        if(!firstName ||!lastName ||!email ||!password ||!confirmPassword ||!role) 
        {
           return res.status(401).json({
                success:false,
                message:"enter all fields",
                error:error.message
            })
        }
       
        //compare password
        if(bcrypt.compare(password,confirmPassword))
        {
            return res.status(401).json({
                success:false,
                message:"password and confirm password does not match"
            })
        }

        //hash password
        let hashedPassword = await bcrypt.hash(password,10)

        //register user
         const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role
         })

         return res.status(200).json({
            success:true,
            message:"User registered successfully",
            data:user
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

//login 


//change password