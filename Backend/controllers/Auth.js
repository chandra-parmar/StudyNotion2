const User = require('../models/User')
const otpGenerator = require('otp-generator')
const OTP = require('../models/OTP')
const Profile = require('../models/Profile')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//send otp

exports.sendOtp = async(req,res)=>{
    try{

        //fetch email from req 
        const {email} = req.body 

        if(!email)
        {
            return res.status(400).json({
                success:false,
                message:"Enter email"
            })
        }
        //check email already exitst 
        const checkUserPresent = await User.findOne({email})
        console.log(checkUserPresent)
        if(checkUserPresent)
        {
            return res.status(401).json({
                success:false,
                message:"User already register"

            })
        }
        // generate otp
        let otp = otpGenerator.generate(6,{
            digits:true,
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("otp generated",otp)
       
        // save otp in db 
       const otpBody= await OTP.create({
            email,
            otp
        })
        console.log(otpBody)

        return res.status(200).json({
            success:true,
            message:"Otp send successfully",
            otp
        })




    }catch(err)
    {
        console.error(err)
        return res.status(500).json({
            success:false,
            message:"Interal server error"
        })
    }
}
//signup
exports.signUp = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword
            ,accountType,otp}
         = req.body

        //validation
        if(!firstName || !lastName || !email || password == null || confirmPassword == null || !accountType || !otp) 
        {
           return res.status(401).json({
                success:false,
                message:"enter all fields"
            })
        }
        // ensure passwords are strings
        if(typeof password !== 'string' || typeof confirmPassword !== 'string') {
            return res.status(400).json({
                success:false,
                message:"Password must be a string"
            })
        }

        //compare password
        if(password !== confirmPassword)
        {
            return res.status(401).json({
                success:false,
                message:"password and confirm password does not match"
            })
        }
        
        //check user already exist
        const existingUser = await User.findOne({email})
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User is already register"
            })
        }

        // find most recent otp stored 
        const recentOtpArray = await OTP.find({email}).sort({createdAt:-1}).limit(1)
        console.log("recent otp array",recentOtpArray)

        if(!recentOtpArray || recentOtpArray.length === 0)
        {
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            })
        }
        


        //hash password (ensure string)
        let hashedPassword = await bcrypt.hash(String(password), 10)
          
        const profileDetails = await Profile.create({
            gender:null,
            contactNumber:null
        }) 
        //register user
         const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
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
exports.login = async(req,res)=>{

    try{
        const {email,password} = req.body

        //validations
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"enter email and password"
            })
        }

        let user = await User.findOne({email})

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"User is not registered please signup first"
            })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch)
        {
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            }
            //generate token 
            const token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })

            //convert user model into object
            user = user.toObject()
            user.token= token,
            user.password =undefined

           // create cookie and send response
                const options={
                    httpOnly:true,
                    maxAge:3*24*60*60*1000
                }

           return res.cookie("token",token,options).status(200).json({
            success:true,
            message:"User logged in successfully",
            token,
            user
           })

        }else{
            //password not matched
            return res.status(400).json({
                success:false,
                message:"Password not matched"
            })
        }

    }catch(err)
    {
       console.error(err)
      return res.status(500).json({
        success:false,
        message:"Internal server error"
      }) 
    }
}


//change password
exports.changePassword=async(req,res)=>{
    try{
        const {oldPassword,newPassword,confirmNewPassword} = req.body

        //validation

       let updatedPassword = await User.findOneAndUpdate({email:User.email},{$set:{password:newPassword}})
    
    }catch(err)
    {

    }
}