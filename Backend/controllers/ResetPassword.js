const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')

//resetPasswordtoken
exports.resetPasswordToken = async(req,res)=>{
    try{

        //get email from req body
        const email = req.body.email
        
        //check user for this  email validation
        const user = await User.findOne({email:email})

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User not registered"
            })
        }
        // generate token
        const token = crypto.randomUUID()

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate( {email:email},
                                                           {token:token,resetPasswordExpires:Date.now()+5*60*1000},{new:true})


        const url = `http://localhost:3000/update-password/${token}`
         
        //send mail containing the url
        await mailSender(email,
                         'Password Reset link',
                         `password Reset link: ${url}`)
    
         
        //return response
        return res.json({
            success:true,
            message:"Email sent successfully, please check email and change password"
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


//resetPassword    
exports.resetPassword= async(req,res)=>{
    try{

        //data fetch
         const {password, confirmPassword,token} = req.body
          
        //validation
        if(password !== confirmPassword)
        {
            return res.json({
                success:false,
                message:"password not matching"
            })
        }
        //get userDetails from db using token
        const userDetails = await User.findOne({token:token})
        //if no entry invalid token 
        if(!userDetails)
        {
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        //token time expires
        if(userDetails.resetPasswordExpires < Date.now())
        {
            return res.json({
                success:false,
                message:"Token is expires please regenerate token"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10) 

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},{new:true}
        )

        //return res 
        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
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